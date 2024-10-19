import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./app/page";
import UserProvider from "./contexts/user-context";
import DashboardLayout from "./app/dashboard/layout";
import DashboardPage from "./app/dashboard/page";
import CreateJobPage from "./app/dashboard/create/page";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/create"
            element={
              <DashboardLayout>
                <CreateJobPage />
              </DashboardLayout>
            }
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
