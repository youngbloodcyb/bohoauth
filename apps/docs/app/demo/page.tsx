export default function Page() {
  return (
    <main className="flex flex-col items-center h-screen w-full">
      <article className="w-96 md:w-1/2 px-4 py-20">
        <header>
          <h1>bohoauth</h1>
        </header>
        <section className="flex flex-col gap-4">
          <div>
            <p className="text-muted-foreground">이페이지는 데모이다.</p>
          </div>
          <div>
            <p>
              This is a non-protected page.{" "}
              <span className="text-muted-foreground">
                이페이지는 보호되지 않은 페이지다.
              </span>
            </p>
          </div>
          <div>
            <p>
              Sign in to view a protected page.{" "}
              <span className="text-muted-foreground">
                보호된 페이지를 보려면 로그인해야 한다.
              </span>
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">
              Visit{" "}
              <a href="/demo/protected" className="underline text-blue-500">
                /demo/protected
              </a>
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">
              Or a dynamic route protected with{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded">
                /demo/posts/:id
              </code>
              :{" "}
              <a href="/demo/posts/1" className="underline text-blue-500">
                /demo/posts/1
              </a>
              ,{" "}
              <a href="/demo/posts/hello" className="underline text-blue-500">
                /demo/posts/hello
              </a>
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
