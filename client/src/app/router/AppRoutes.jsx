import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicProtected from "./protected/PublicProtected";
import RoleProtected from "./protected/RoleProtected";
import MainLayout from "../layout/MainLayout";
import {
  public_navigations,
  user_navigations,
  pandit_navigations,
  admin_navigations,
} from "../../constants/navigations";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicProtected />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            ...public_navigations,
            {
              element: <RoleProtected allowedRoles={["devotee"]} />,
              children: [...user_navigations],
            },
            {
              element: <RoleProtected allowedRoles={["pandit"]} />,
              children: [...pandit_navigations],
            },
            {
              element: <RoleProtected allowedRoles={["admin"]} />,
              children: [...admin_navigations],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
