# bohoauth

Boho auth provides a simple way to password protect pages in your Next.js application.

It has only one dependency, [jose](https://github.com/panva/jose).

It provides a middleware function that you can use to protect your pages.

## Installation

```bash
npm install bohoauth
```

## Usage

1. Create a `boho.ts` file in the `lib` folder of your Next.js application. This acts as your configuration file. This will export a `boho` function that you can use to protect your pages.

   ```ts
   import { bohoAuth } from "bohoauth";

   export const boho = bohoAuth({
     password: process.env.BOHO_PASSWORD!,
     secret: process.env.BOHO_SECRET!,
     expiresIn: "1h",
     middleware: {
       loginPath: "/login",
       protectedPaths: ["/protected"],
       redirectPath: "/protected",
     },
   });
   ```

   Parameters:

   - `password`: The password to use for authentication. Recommended to use an environment variable. If no value is provided, boho auth will look for a `BOHO_PASSWORD` environment variable.
   - `secret`: The secret to use for authentication. Recommended to use an environment variable. If no value is provided, boho auth will look for a `BOHO_SECRET` environment variable.
   - `expiresIn`: The expiration time for the authentication token. The default is `1h`. View the [jose docs](https://github.com/panva/jose/blob/main/docs/README.md) for more information.
   - `basePath`: Where the route handlers are mounted. The default is `/api/boho`. These routes are never protected.
   - `middleware`: The middleware options to use for authentication.
     - `loginPath`: The path to redirect to when the user is not authenticated.
     - `protectedPaths`: The paths to protect. See [Path patterns](#path-patterns).
     - `publicPaths`: Exceptions to `protectedPaths` that stay public. See [Path patterns](#path-patterns).
     - `redirectPath`: The path to redirect to when the user is authenticated.

2. Create a catch-all route handler at `app/api/boho/[...boho]/route.ts`:

   ```ts
   import { boho } from "@/lib/boho";

   export const { GET, POST } = boho.handlers;
   ```

   This serves the following routes:

   | Method | Path                | Description                                                                 |
   | ------ | ------------------- | --------------------------------------------------------------------------- |
   | `POST` | `/api/boho/login`   | Checks `password` and sets the session cookie.                              |
   | `POST` | `/api/boho/logout`  | Clears the session cookie.                                                  |
   | `GET`  | `/api/boho/session` | Returns `{ authenticated: true, expiresAt }` or `{ authenticated: false }`. |

   `login` and `logout` accept either JSON or a native form submission. JSON requests get a JSON response. Form submissions get redirected: after login to `callbackUrl` (if provided and same-origin) or `redirectPath`, after a failed login to `loginPath?error=invalid_password`, and after logout to `loginPath`.

3. Add the middleware to your Next.js application in the `middleware.ts` file.

   ```ts
   import { boho } from "@/lib/boho";

   export default boho.middleware;
   ```

   Make sure to configure where the middleware should run. Reference the [Next.js docs](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher) for more information.

4. Finally, add a login form. A plain HTML form works without any JavaScript:

   ```tsx
   <form action="/api/boho/login" method="post">
     <input type="password" name="password" required />
     <button type="submit">Sign in</button>
   </form>
   ```

   Or submit with `fetch`:

   ```ts
   const res = await fetch("/api/boho/login", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ password }),
   });
   ```

   To sign out:

   ```tsx
   <form action="/api/boho/logout" method="post">
     <button type="submit">Sign out</button>
   </form>
   ```

### Upgrading from `app/api/login/route.ts`

Existing `app/api/login/route.ts` files that export `POST` keep working. A `POST` to any path that isn't a known action is treated as login and logs a deprecation warning. This fallback will be removed in the next major version, so move to the catch-all route when you can.

## Path patterns

`protectedPaths` and `publicPaths` accept plain paths, patterns with parameters, or regular expressions. Parameters use the same syntax as the Next.js middleware `matcher`.

| Pattern            | Matches                               | Doesn't match           |
| ------------------ | ------------------------------------- | ----------------------- |
| `/dashboard`       | `/dashboard`, `/dashboard/settings`   | `/dashboard-old`        |
| `/:id`             | `/abc`, `/123`                        | `/`, `/abc/def`         |
| `/:id/:rest*`      | `/abc`, `/abc/def`, `/abc/def/ghi`    | `/`                     |
| `/blog/:slug*`     | `/blog`, `/blog/a`, `/blog/a/b`       | `/blogs`                |
| `/docs/:path+`     | `/docs/a`, `/docs/a/b`                | `/docs`                 |
| `/shop/:category?` | `/shop`, `/shop/shoes`                | `/shop/shoes/red`       |
| `/^\/org\/\d+/`    | `/org/1`, `/org/42/settings`          | `/org/abc`              |

- **Plain paths** match the path and everything under it, at segment boundaries.
- **Patterns with parameters** match the whole path. Add `/:rest*` at the end to include subpaths.
- **A parameter must be a whole segment.** `/post/:id` works; `/post-:id` doesn't. Use a RegExp for anything more complex.
- **Matching is case-sensitive**, like Next.js routes. A trailing slash in the URL is ignored.
- **Invalid patterns throw when `bohoAuth()` is called**, so mistakes show up at startup.

### Protecting dynamic routes

To protect a top-level dynamic route like `app/[id]/page.tsx`:

```ts
middleware: {
  loginPath: "/login",
  protectedPaths: ["/:id"],
},
```

### Protecting everything except a few pages

Protect `/` and list the exceptions in `publicPaths`. A public match always wins over a protected one.

```ts
middleware: {
  loginPath: "/login",
  protectedPaths: ["/"],
  publicPaths: ["/about", "/pricing", "/blog/:slug*"],
},
```

You don't need to list the login page, boho's API routes (`basePath`), or Next.js static assets (`/_next/static`). They're always allowed, so protecting `/` doesn't block users from logging in.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
