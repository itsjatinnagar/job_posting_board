import { Home } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-24 border-r">
      <div className="p-10 flex flex-col items-center">
        <a href="#" className="">
          <Home className="stroke-secondary-foreground transition-colors hover:stroke-black" />
        </a>
      </div>
    </aside>
  );
}
