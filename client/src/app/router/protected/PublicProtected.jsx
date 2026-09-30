import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicProtected = () => {
  const { isAuthenticated, isHydrating } = useSelector((store) => store.auth);
  const location = useLocation();

  if (!isHydrating && isAuthenticated && ["/login", "/register"].includes(location.pathname)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />
}

export default PublicProtected
