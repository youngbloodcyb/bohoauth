export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
              This is protected post{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded">{id}</code>.{" "}
              <span className="text-muted-foreground">
                이페이지는 보호된 동적 페이지다.
              </span>
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">
              Protected with the pattern{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded">
                /demo/posts/:id
              </code>
              , so every post ID is covered by a single entry in{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded">
                protectedPaths
              </code>
              .
            </p>
          </div>
          <div>
            <form
              action="/api/boho/logout"
              method="post"
              className="text-muted-foreground"
            >
              <button type="submit" className="underline text-blue-500">
                sign out
              </button>
            </form>
          </div>
        </section>
      </article>
    </main>
  );
}
