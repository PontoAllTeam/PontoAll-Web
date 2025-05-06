import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../SideBar";

export default function Layout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-text">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

