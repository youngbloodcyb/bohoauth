import Link from "next/link";

export function List() {
  return (
    <ul className="uppercase text-sm block lg:hidden mt-4 underline space-y-2">
      <li>
        <Link href="/demo">demo</Link>
      </li>
      <li>
        <Link href="https://cameron.so">author</Link>
      </li>
      <li>
        <Link href="https://github.com/youngbloodcyb/bohoauth">github</Link>
      </li>
    </ul>
  );
}
