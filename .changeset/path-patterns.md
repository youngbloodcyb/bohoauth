---
"bohoauth": minor
---

Add path patterns to `protectedPaths`, so dynamic routes like `app/[id]/page.tsx` can be protected. Patterns use the same syntax as the Next.js middleware `matcher`: `/:id` (one segment), `/blog/:slug*` (zero or more), `/docs/:path+` (one or more) and `/shop/:category?` (optional). A RegExp also works. Invalid patterns throw when `bohoAuth()` is called.

Add `middleware.publicPaths` to exempt paths from `protectedPaths`. For example, protect everything with `["/"]` and list exceptions like `["/about"]`.

Add a `basePath` option (default `/api/boho`) for where the route handlers are mounted. The login page, `basePath` and `/_next/static` are now always allowed, so protecting `/` no longer blocks the login request or the login page's assets.
