import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col">
      <Header className="border-b" />
      <div className="flex-1 flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
