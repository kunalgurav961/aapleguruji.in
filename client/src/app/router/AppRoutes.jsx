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
import LandingLayout from "../layout/LandingLayout";
import LandingPage from "../../features/public/ui/pages/Landing/LandingPage";

const AppRoutes = () => {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <PublicProtected />,
    //   children: [
    // original routes
    // {
    //   path: "",
    //   element: <MainLayout />,
    //   children: [
    //     ...public_navigations,
    //     {
    //       element: <RoleProtected allowedRoles={["devotee"]} />,
    //       children: [...user_navigations],
    //     },
    //     {
    //       element: <RoleProtected allowedRoles={["pandit"]} />,
    //       children: [...pandit_navigations],
    //     },
    //     {
    //       element: <RoleProtected allowedRoles={["admin"]} />,
    //       children: [...admin_navigations],
    //     },
    //   ],
    // },
    //   ],
    // },

    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
