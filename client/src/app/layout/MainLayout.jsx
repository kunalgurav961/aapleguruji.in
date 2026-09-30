import { Outlet } from "react-router-dom";
import Navbar from "../../shared/ui/components/Navbar";

const MainLayout = () => {
  return (
    <div className="w-full p-0">
      <Navbar />

      <Outlet />
    </div>
  );
};

export default MainLayout;
