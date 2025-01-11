import { Building } from "./building";
import { List } from "./list";

export default function Page() {
  return (
    <div className="h-screen w-full flex items-center justify-between">
      <div className="ml-20">
        <h1>
          boho auth <span className="italic font-bold">보호</span>
        </h1>
        <p className="italic text-muted-foreground">non-user authentication</p>
        <List />
      </div>
      <Building />
    </div>
  );
}
