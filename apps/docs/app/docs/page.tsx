import Link from "next/link";

// Matches the facade of the building on the home page.
const CREAM = "bg-[#f2ecdc]";

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className={`${CREAM} font-mono text-[0.85em] px-1 py-0.5`}>
      {children}
    </code>
  );
}

function Code({ file, children }: { file?: string; children: string }) {
  return (
    <figure className={`${CREAM} border border-black my-4`}>
      {file && (
        <figcaption className="border-b border-black px-4 py-1.5 font-mono text-xs">
          {file}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>{children}</code>
      </pre>
    </figure>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 border-b border-black pb-2 text-sm uppercase tracking-widest">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[2rem_1fr] gap-2">
      <span className="font-mono text-sm leading-7 text-muted-foreground">
        {String(n).padStart(2, "0")}
      </span>
      <div className="min-w-0">{children}</div>
    </li>
  );
}

function Table({
  head,
  rows,
}: {
  head: [string, string];
  rows: [React.ReactNode, React.ReactNode][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-y border-black text-left text-sm">
        <thead>
          <tr className="border-b border-black">
            {head.map((h) => (
              <th
                key={h}
                className="py-2 pr-4 text-xs font-normal uppercase tracking-widest text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i} className="border-b border-black/10 last:border-0">
              <td className="whitespace-nowrap py-2.5 pr-6 align-top">{a}</td>
              <td className="py-2.5 align-top">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const links = [
  { href: "/", label: "home" },
  { href: "/demo", label: "demo" },
  { href: "https://github.com/youngbloodcyb/bohoauth", label: "github" },
];

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16 leading-relaxed">
      <nav className="flex gap-6 text-xs uppercase tracking-widest">
        {links.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="underline-offset-4 hover:underline"
          >
            {label}
          </Link>
        ))}
      </nav>

      <header className="mt-16">
        <h1 className="text-3xl">
          boho auth <span className="font-bold italic">보호</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Simple password protection for Next.js. One dependency,{" "}
          <Link
            href="https://github.com/panva/jose"
            className="text-foreground underline underline-offset-4"
          >
            jose
          </Link>
          .
        </p>
        {/* The double rule from the building's facade */}
        <div className="mt-8 h-[10px] border-y-2 border-black" />
      </header>

      <Section title="Installation">
        <Code>npm install bohoauth</Code>
      </Section>

      <Section title="Usage">
        <ol className="space-y-10">
          <Step n={1}>
            <p>Create a config file:</p>
            <Code file="lib/boho.ts">{`import { bohoAuth } from "bohoauth";

export const boho = bohoAuth({
  password: process.env.BOHO_PASSWORD,
  secret: process.env.BOHO_SECRET,
  middleware: {
    loginPath: "/login",
    protectedPaths: ["/dashboard"],
    redirectPath: "/dashboard",
  },
});`}</Code>
          </Step>

          <Step n={2}>
            <p>
              Add the route handlers. This serves <C>POST /api/boho/login</C>,{" "}
              <C>POST /api/boho/logout</C> and <C>GET /api/boho/session</C>.
            </p>
            <Code file="app/api/boho/[...boho]/route.ts">{`import { boho } from "@/lib/boho";

export const { GET, POST } = boho.handlers;`}</Code>
          </Step>

          <Step n={3}>
            <p>
              Add the middleware. On Next.js 14 and 15, name the file{" "}
              <C>middleware.ts</C> instead.
            </p>
            <Code file="proxy.ts">{`import { boho } from "@/lib/boho";

export default boho.middleware;`}</Code>
          </Step>

          <Step n={4}>
            <p>
              Add a login form. A plain HTML form works without any JavaScript.
            </p>
            <Code file="app/login/page.tsx">{`<form action="/api/boho/login" method="post">
  <input type="password" name="password" required />
  <button type="submit">Sign in</button>
</form>`}</Code>
            <p>
              To sign out, post a form to <C>/api/boho/logout</C>.
            </p>
          </Step>
        </ol>
      </Section>

      <Section title="Options">
        <Table
          head={["Option", "Description"]}
          rows={[
            [
              <C key="o">password</C>,
              <>
                The password users enter. Defaults to the <C>BOHO_PASSWORD</C>{" "}
                env variable.
              </>,
            ],
            [
              <C key="o">secret</C>,
              <>
                The secret used to sign tokens. Defaults to the{" "}
                <C>BOHO_SECRET</C> env variable.
              </>,
            ],
            [
              <C key="o">expiresIn</C>,
              <>
                How long a login lasts. Defaults to <C>1h</C>.
              </>,
            ],
            [
              <C key="o">basePath</C>,
              <>
                Where the route handlers are mounted. Defaults to{" "}
                <C>/api/boho</C>.
              </>,
            ],
            [
              <C key="o">middleware.loginPath</C>,
              <>
                Where logged-out users are sent. Defaults to <C>/login</C>.
              </>,
            ],
            [
              <C key="o">middleware.protectedPaths</C>,
              "Paths or patterns that require a login.",
            ],
            [
              <C key="o">middleware.publicPaths</C>,
              "Exceptions to protectedPaths that stay public.",
            ],
            [
              <C key="o">middleware.redirectPath</C>,
              <>
                Where users go after logging in. Defaults to <C>/</C>.
              </>,
            ],
          ]}
        />
      </Section>

      <Section title="Path patterns">
        <p className="mb-6">
          <C>protectedPaths</C> and <C>publicPaths</C> accept plain paths,
          patterns using the same syntax as the Next.js matcher, or regular
          expressions.
        </p>
        <Table
          head={["Pattern", "Matches"]}
          rows={[
            [<C key="p">/dashboard</C>, "/dashboard and everything under it"],
            [<C key="p">/:id</C>, "/abc, but not /abc/def"],
            [<C key="p">/:id/:rest*</C>, "/abc and everything under it"],
            [<C key="p">/blog/:slug*</C>, "/blog, /blog/a, /blog/a/b"],
            [<C key="p">/docs/:path+</C>, "/docs/a, /docs/a/b, but not /docs"],
            [<C key="p">/shop/:category?</C>, "/shop and /shop/shoes"],
          ]}
        />
        <p className="mt-8">
          To protect a dynamic route like <C>app/[id]/page.tsx</C>, or
          everything except a few pages:
        </p>
        <Code file="lib/boho.ts">{`// a top-level dynamic route
protectedPaths: ["/:id"],

// everything except a few pages
protectedPaths: ["/"],
publicPaths: ["/about", "/blog/:slug*"],`}</Code>
        <p className="text-sm text-muted-foreground">
          The login page, the route handlers and Next.js static assets are
          always allowed, so protecting <C>/</C> never blocks logging in.
        </p>
      </Section>

      <footer className="mt-24">
        <div className="h-[10px] border-y-2 border-black" />
        <p className="mt-6 text-sm text-muted-foreground">
          Contributions are welcome.{" "}
          <Link
            href="https://github.com/youngbloodcyb/bohoauth"
            className="text-foreground underline underline-offset-4"
          >
            Open an issue or pull request
          </Link>
          .
        </p>
      </footer>
    </main>
  );
}
