import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const HomeProtected = () => {
  const { isAuthenticated, isHydrating } = useSelector((store) => store.auth);

  if (isHydrating) {
    return <p className="p-6 text-center">Loading your account...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default HomeProtected;
