import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../shared/ui/components/Navbar";

const MainLayout = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className={`w-full p-0${isAdminRoute ? " admin-route-layout" : ""}`}>
      {!isAdminRoute && <Navbar />}

      <Outlet />
    </div>
  );
};

export default MainLayout;
