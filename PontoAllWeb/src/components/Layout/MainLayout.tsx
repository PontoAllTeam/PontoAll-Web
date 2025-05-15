import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar";

export default function Layout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-text">
      <Sidebar />

      <Outlet />
    </div>
  );
}
