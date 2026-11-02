/**
 * A path pattern used by protectedPaths and publicPaths.
 *
 * - "/dashboard"        plain path: matches /dashboard and everything under it
 * - "/:id"              one dynamic segment: matches /abc, not /abc/def
 * - "/blog/:slug*"      zero or more segments: /blog, /blog/a, /blog/a/b
 * - "/docs/:path+"      one or more segments: /docs/a, /docs/a/b, not /docs
 * - "/shop/:category?"  optional segment: /shop, /shop/shoes
 * - /^\/org\/\d+/       a RegExp, tested against the pathname
 *
 * Patterns with parameters match the whole path. Add a trailing ":rest*"
 * to also match subpaths, e.g. "/:id/:rest*".
 */
export type PathPattern = string | RegExp;

export type PathMatcher = (pathname: string) => boolean;

const PARAM = /^:([A-Za-z_][A-Za-z0-9_]*)([*+?]?)$/;

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Strip a trailing slash so "/a/" and "/a" are treated the same. */
export const normalizePath = (pathname: string): string =>
  pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

const compileString = (pattern: string): RegExp => {
  if (!pattern.startsWith("/")) {
    throw new Error(
      `[bohoauth] Invalid path pattern "${pattern}": patterns must start with "/".`,
    );
  }

  const segments = normalizePath(pattern).split("/").filter(Boolean);
  const hasParams = segments.some((s) => s.startsWith(":"));

  let source = "";
  for (const segment of segments) {
    if (!segment.startsWith(":")) {
      if (segment.includes("*")) {
        throw new Error(
          `[bohoauth] Invalid path pattern "${pattern}": use a named wildcard like "/blog/:path*" instead of "*".`,
        );
      }
      if (segment.includes(":")) {
        throw new Error(
          `[bohoauth] Invalid path pattern "${pattern}": a parameter must be a whole segment (e.g. "/post/:id", not "/post-:id").`,
        );
      }
      source += "/" + escapeRegExp(segment);
      continue;
    }

    const match = PARAM.exec(segment);
    if (!match) {
      throw new Error(
        `[bohoauth] Invalid path pattern "${pattern}": "${segment}" is not a valid parameter. Use ":name", ":name*", ":name+" or ":name?".`,
      );
    }

    switch (match[2]) {
      case "*":
        source += "(?:/[^/]+)*";
        break;
      case "+":
        source += "(?:/[^/]+)+";
        break;
      case "?":
        source += "(?:/[^/]+)?";
        break;
      default:
        source += "/[^/]+";
    }
  }

  // Plain paths keep the original prefix behavior, but only at a segment
  // boundary: "/dashboard" matches "/dashboard/x" but not "/dashboard-old".
  // Patterns with parameters must match the whole path.
  // A plain "/" therefore matches everything.
  const tail = hasParams ? "$" : "(?:/.*)?$";

  return new RegExp(`^${source}${tail}`);
};

const compile = (pattern: PathPattern): PathMatcher => {
  if (pattern instanceof RegExp) {
    // Drop the g and y flags: they make .test() stateful via lastIndex,
    // so the same path could alternate between matching and not.
    const regex = new RegExp(
      pattern.source,
      pattern.flags.replace(/[gy]/g, ""),
    );
    return (pathname) => regex.test(pathname);
  }
  if (typeof pattern === "string") {
    const regex = compileString(pattern);
    // Compiled patterns never include a trailing slash, so the root path is
    // tested as "" (this lets "/:id?" and a plain "/" match "/").
    return (pathname) => {
      const path = normalizePath(pathname);
      return regex.test(path === "/" ? "" : path);
    };
  }
  throw new Error(
    `[bohoauth] Invalid path pattern ${String(pattern)}: expected a string or RegExp.`,
  );
};

/**
 * Compiles a list of patterns once, returning a function that reports
 * whether a pathname matches any of them.
 */
export const createPathMatcher = (patterns: PathPattern[]): PathMatcher => {
  const matchers = patterns.map(compile);
  return (pathname) => matchers.some((matches) => matches(pathname));
};
