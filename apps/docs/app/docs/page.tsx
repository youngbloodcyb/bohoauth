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
                  Create a route handler{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    app/api/login/route.ts
                  </code>
                  :
                </p>
                <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-lg mt-2">
                  <code>{`import { boho } from "@/lib/boho";

export const { POST } = boho.handlers;`}</code>
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
                  Finally, add a form to your login page that will submit to the{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    /api/login
                  </code>{" "}
                  route.
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
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  middleware.loginPath
                </code>
                : Path to redirect unauthenticated users.
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  middleware.protectedPaths
                </code>
                : Array of paths to protect.
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
