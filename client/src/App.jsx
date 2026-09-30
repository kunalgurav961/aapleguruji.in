import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from './app/router/AppRoutes'
import { hydrateUser } from "./features/auth/state/authActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateUser());
  }, [dispatch]);

  return <AppRoutes />
}

export default App
