import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const dashboardPathByRole = {
  devotee: "/home",
  pandit: "/pandit",
  admin: "/admin",
};

const RoleProtected = ({ allowedRoles }) => {
  const { isAuthenticated, isHydrating, user } = useSelector((store) => store.auth);

  if (isHydrating) return <p className="p-6 text-center">Loading your account...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to={dashboardPathByRole[user?.role] || "/"} replace />;
  }

  return <Outlet />;
};

export default RoleProtected;
