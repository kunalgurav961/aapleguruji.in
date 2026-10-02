import LoginPage from "../features/auth/ui/pages/LoginPage";
import RegisterPage from "../features/auth/ui/pages/RegisterPage";
import AboutPage from "../features/public/ui/pages/AboutPage";
import Home from "../features/public/ui/pages/Home";
import PoojaPage from "../features/public/ui/pages/PoojaPage";
import BookingPage from "../features/booking/ui/pages/BookingPage";
import AdminDashboard from "../features/admin/ui/pages/AdminDashboard";

const public_navigations = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  { path: "/pooja", element: <PoojaPage /> },
  {
    path: "/blogs",
    element: <div><h1>Blogs</h1></div>,
  },
  {
    path: "/bookings",
    element: <div><h1>Bookings</h1></div>,
  },
  {
    path: "/blog",
    element: <div><h1>Blog page</h1></div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];
const user_navigations = [
  {
    path: "/home",
    element: <div><h1>Welcome to Aaple Guruji</h1></div>,
  },
  {
    path: "/home/book-pooja",
    element: <BookingPage />,
  },
  {
    path: "/home/my-bookings",
    element: <div><h1>My Bookings</h1></div>,
  },
  {
    path: "/home/past-bookings",
    element: <div><h1>Past Bookings</h1></div>,
  },
  {
    path: "/home/book-pooja",
    element: <div><h1>Book a Pooja</h1></div>,
  },
  {
    path: "/home/profile",
    element: <div><h1>My Profile</h1></div>,
  },
];
const pandit_navigations = [
  {
    path: "/pandit",
    element: <div><h1>Pandit Dashboard</h1></div>,
  },
  {
    path: "/pandit/bookings",
    element: <div><h1>Assigned Bookings</h1></div>,
  },
  {
    path: "/pandit/availability",
    element: <div><h1>Availability</h1></div>,
  },
  {
    path: "/pandit/profile",
    element: <div><h1>Pandit Profile</h1></div>,
  },
];
const admin_navigations = [
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/services",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/bookings",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/users",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/profile",
    element: <div><h1>Admin Profile</h1></div>,
  },
];

export { public_navigations, user_navigations, pandit_navigations, admin_navigations };
