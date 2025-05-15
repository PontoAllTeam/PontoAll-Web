import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function SidebarLayout() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <Header />
      <main className="h-full w-full *:w-full *:h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
