---
"bohoauth": minor
---

Add catch-all route handlers. Mount `boho.handlers` at `app/api/boho/[...boho]/route.ts` and export `GET` and `POST` to get:

- `POST /api/boho/login`: checks the password and sets the session cookie
- `POST /api/boho/logout`: clears the session cookie
- `GET /api/boho/session`: returns `{ authenticated, expiresAt }`

Login and logout accept native HTML form submissions as well as JSON. Form submissions are redirected: after login to a same-origin `callbackUrl` or `redirectPath`, and after logout to `loginPath`.

Existing `app/api/login/route.ts` setups keep working. A `POST` to a path that isn't a known action is still treated as login and logs a deprecation warning. This fallback will be removed in the next major version.
