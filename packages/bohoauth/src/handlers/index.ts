import { ResolvedConfig } from "../config.js";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { session } from "./session.js";
import { json } from "./utils.js";

type Method = "GET" | "POST";
type Action = (req: Request, config: ResolvedConfig) => Promise<Response>;

/**
 * Action table for the catch-all route, e.g. app/api/boho/[...boho]/route.ts.
 * The action is the last segment of the request path.
 */
const routes: Record<string, Partial<Record<Method, Action>>> = {
  login: { POST: login },
  logout: { POST: logout },
  session: { GET: session },
};

let warnedLegacy = false;

/**
 * Resolve the action from the URL rather than route `params`, since params is
 * sync in Next 14 and a Promise in Next 15+.
 */
const actionFor = (req: Request): string | undefined =>
  new URL(req.url).pathname.split("/").filter(Boolean).pop();

const dispatch =
  (method: Method, config: ResolvedConfig) =>
  async (req: Request): Promise<Response> => {
    try {
      const name = actionFor(req);
      const route = name ? routes[name] : undefined;

      if (route) {
        const action = route[method];
        if (action) return await action(req, config);
        return json(
          { error: "Method not allowed" },
          { status: 405, headers: { Allow: Object.keys(route).join(", ") } },
        );
      }

      // Backwards compatibility: before the catch-all route, handlers.POST was
      // mounted at an arbitrary path (e.g. /api/auth) and always meant login.
      if (method === "POST") {
        if (!warnedLegacy) {
          warnedLegacy = true;
          console.warn(
            `[bohoauth] POST ${new URL(req.url).pathname} was treated as login. ` +
              "Mount boho.handlers at app/api/boho/[...boho]/route.ts and POST to /api/boho/login. " +
              "This fallback will be removed in the next major version.",
          );
        }
        return await login(req, config);
      }

      return json({ error: "Not found" }, { status: 404 });
    } catch {
      return json({ error: "Internal server error" }, { status: 500 });
    }
  };

export const createHandlers = (config: ResolvedConfig) => ({
  GET: dispatch("GET", config),
  POST: dispatch("POST", config),
});
