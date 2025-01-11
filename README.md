# Boho Auth

Boho auth provides a simple way to password protect pages in your Next.js application.

It is not intended to use as an authentication layer for an application. Rather, it's meant to be used to password protect pages, assets, or routes.

It uses simple JWT to authenticate a visitor based on a password provided as an environment variable.

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
   - `middleware`: The middleware options to use for authentication.
   - `loginPath`: The path to redirect to when the user is not authenticated.
   - `protectedPaths`: The paths to protect, passed in as an array of strings.
   - `redirectPath`: The path to redirect to when the user is authenticated.

2. Create a route handler `app/api/login/route.ts` (or whatever API route you want to use to authenticate) and paste the following code:

   ```ts
   import { boho } from "@/lib/boho";

   export const { POST } = boho.handlers;
   ```

   This will create a POST route handler that will authenticate the user.

3. Add the middleware to your Next.js application in the `middleware.ts` file.

   ```ts
   import { boho } from "@/lib/boho";

   export default boho.middleware;
   ```

   Make sure to configure where the middleware should run. Reference the [Next.js docs](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher) for more information.

4. Finally, add a form to your login page that will submit to the `/api/login` route.
