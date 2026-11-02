import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-full">
      <article className="w-full max-w-3xl px-4 py-20">
        <header className="mb-8 space-y-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Go Back
          </Link>
          <h1 className="text-4xl mb-4">bohoauth</h1>
          <p className="text-lg text-muted-foreground">
            Simple password protection for your Next.js application.
          </p>
        </header>

        <section className="space-y-8">
          <Link
            href="https://github.com/youngbloodcyb/bohoauth"
            className="text-muted-foreground hover:text-foreground underline"
          >
            View on GitHub
          </Link>
          <div>
            <p>
              Boho auth provides a simple way to password protect pages in your
              Next.js application. It has only one dependency,{" "}
              <Link
                href="https://github.com/panva/jose"
                className="text-blue-500 hover:underline"
              >
                jose
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Installation</h2>
            <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-lg">
              <code>npm install bohoauth</code>
            </pre>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Usage</h2>
            <ol className="list-decimal list-inside space-y-6">
              <li>
                <p className="mb-2">
                  Create a{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    boho.ts
                  </code>{" "}
                  file in the{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">lib</code>{" "}
                  folder of your Next.js application:
                </p>
                <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-lg mt-2">
                  <code>{`import { bohoAuth } from "bohoauth";

export const boho = bohoAuth({
  password: process.env.BOHO_PASSWORD!,
  secret: process.env.BOHO_SECRET!,
  expiresIn: "1h",
  middleware: {
    loginPath: "/login",
    protectedPaths: ["/protected"],
    redirectPath: "/protected",
  },
});`}</code>
                </pre>
              </li>

              <li>
                <p className="mb-2">
                  Create a catch-all route handler{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    app/api/boho/[...boho]/route.ts
                  </code>
                  . It serves{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    POST /api/boho/login
                  </code>
                  ,{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    POST /api/boho/logout
                  </code>{" "}
                  and{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    GET /api/boho/session
                  </code>
                  :
                </p>
                <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-lg mt-2">
                  <code>{`import { boho } from "@/lib/boho";

export const { GET, POST } = boho.handlers;`}</code>
                </pre>
              </li>

              <li>
                <p className="mb-2">
                  Add the middleware to your Next.js application:
                </p>
                <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-lg mt-2">
                  <code>{`import { boho } from "@/lib/boho";

export default boho.middleware;`}</code>
                </pre>
              </li>

              <li>
                <p>
                  Finally, add a form to your login page that submits a{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    password
                  </code>{" "}
                  field to{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    /api/boho/login
                  </code>
                  . A plain HTML form works without any JavaScript. To sign out,
                  submit a form to{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    /api/boho/logout
                  </code>
                  .
                </p>
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Configuration Options</h2>
            <ul className="space-y-3">
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">password</code>
                : The password to use for authentication. Uses{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  BOHO_PASSWORD
                </code>{" "}
                env variable if not provided.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">secret</code>:
                The secret for JWT signing. Uses{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  BOHO_SECRET
                </code>{" "}
                env variable if not provided.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  expiresIn
                </code>
                : Token expiration time. Defaults to "1h".
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">basePath</code>
                : Where the route handlers are mounted. Defaults to "/api/boho".
                These routes are never protected.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  middleware.loginPath
                </code>
                : Path to redirect unauthenticated users.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  middleware.protectedPaths
                </code>
                : Array of paths or patterns to protect. See Path Patterns
                below.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  middleware.publicPaths
                </code>
                : Exceptions to protectedPaths that stay public.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  middleware.redirectPath
                </code>
                : Path to redirect after successful login.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Path Patterns</h2>
            <p className="mb-4">
              <code className="bg-muted px-1.5 py-0.5 rounded">
                protectedPaths
              </code>{" "}
              and
              <code className="bg-muted px-1.5 py-0.5 rounded">
                publicPaths
              </code>{" "}
              accept plain paths, patterns with parameters (the same syntax as
              the Next.js middleware matcher), or regular expressions.
            </p>
            <ul className="space-y-3 mb-4">
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  {"/dashboard"}
                </code>
                : matches /dashboard and everything under it.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">{"/:id"}</code>
                : matches /abc, but not /abc/def.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  {"/:id/:rest*"}
                </code>
                : matches /abc and everything under it.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  {"/blog/:slug*"}
                </code>
                : matches /blog, /blog/a, /blog/a/b.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  {"/docs/:path+"}
                </code>
                : matches /docs/a, /docs/a/b, but not /docs.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  {"/shop/:category?"}
                </code>
                : matches /shop and /shop/shoes.
              </li>
            </ul>
            <p className="mb-2">
              To protect a top-level dynamic route like
              <code className="bg-muted px-1.5 py-0.5 rounded">
                app/[id]/page.tsx
              </code>
              , or everything except a few public pages:
            </p>
            <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-lg mt-2">
              <code>{`// a top-level dynamic route
protectedPaths: ["/:id"],

// everything except a few pages
protectedPaths: ["/"],
publicPaths: ["/about", "/blog/:slug*"],`}</code>
            </pre>
            <p className="mt-4">
              The login page, the route handlers, and Next.js static assets are
              always allowed, so protecting
              <code className="bg-muted px-1.5 py-0.5 rounded">/</code>{" "}
              doesn&apos;t block users from logging in.
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Contributing</h2>
            <p>
              Contributions are welcome! Please{" "}
              <Link
                href="https://github.com/youngbloodcyb/bohoauth"
                className="text-blue-500 hover:underline"
              >
                open an issue or submit a pull request
              </Link>
              .
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
