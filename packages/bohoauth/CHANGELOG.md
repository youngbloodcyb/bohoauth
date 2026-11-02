# bohoauth

## 1.3.0

### Minor Changes

- 7af5838: Add path patterns to `protectedPaths`, so dynamic routes like `app/[id]/page.tsx` can be protected. Patterns use the same syntax as the Next.js middleware `matcher`: `/:id` (one segment), `/blog/:slug*` (zero or more), `/docs/:path+` (one or more) and `/shop/:category?` (optional). A RegExp also works. Invalid patterns throw when `bohoAuth()` is called.

  Add `middleware.publicPaths` to exempt paths from `protectedPaths`. For example, protect everything with `["/"]` and list exceptions like `["/about"]`.

  Add a `basePath` option (default `/api/boho`) for where the route handlers are mounted. The login page, `basePath` and `/_next/static` are now always allowed, so protecting `/` no longer blocks the login request or the login page's assets.

### Patch Changes

- a6a8ec1: Match plain `protectedPaths` at segment boundaries. `"/protected"` still protects `/protected` and everything under it, but no longer matches unrelated paths that share a prefix, like `/protected-foo`. A trailing slash in the URL is now ignored.

## 1.2.0

### Minor Changes

- 55bbd6e: Add catch-all route handlers. Mount `boho.handlers` at `app/api/boho/[...boho]/route.ts` and export `GET` and `POST` to get:

  - `POST /api/boho/login`: checks the password and sets the session cookie
  - `POST /api/boho/logout`: clears the session cookie
  - `GET /api/boho/session`: returns `{ authenticated, expiresAt }`

  Login and logout accept native HTML form submissions as well as JSON. Form submissions are redirected: after login to a same-origin `callbackUrl` or `redirectPath`, and after logout to `loginPath`.

  Existing `app/api/login/route.ts` setups keep working. A `POST` to a path that isn't a known action is still treated as login and logs a deprecation warning. This fallback will be removed in the next major version.

### Patch Changes

- 9ca024b: Fix package entry points. `main` now points to the CommonJS build and `module` to the ESM build, and `exports` provides separate `import` and `require` conditions with matching type declarations. Types now come from the built `.d.ts` files instead of the TypeScript source.
- 90f50a2: Make the `password` and `secret` options optional in `BohoAuthOptions`. They already fell back to the `BOHO_PASSWORD` and `BOHO_SECRET` environment variables, but the types required them.

## 1.1.2

### Patch Changes

- 0fd55de: update peer dependency for nextjs

## 1.1.1

### Patch Changes

- 40b6e7f: Add a README file

## 1.1.0

### Minor Changes

- 7f7b470: Move tsup to be a dev dependency

## 1.0.0

### Major Changes

- 12a1984: Initial release of bohoauth
