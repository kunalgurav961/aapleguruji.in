import { Outlet, useLocation } from "react-router-dom";

const LandingLayout = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className={`w-full p-0${isAdminRoute ? " admin-route-layout" : ""}`}>
      <Outlet />
    </div>
  );
};

export default LandingLayout;
