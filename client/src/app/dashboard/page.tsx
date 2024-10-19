import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <main className="mx-auto container p-5">
      <Button size="lg" asChild>
        <Link to="/dashboard/create">Create Interview</Link>
      </Button>
    </main>
  );
}
