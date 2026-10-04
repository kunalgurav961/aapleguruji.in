import LoginPage from "../features/auth/ui/pages/LoginPage";
import RegisterPage from "../features/auth/ui/pages/RegisterPage";
import ProfilePage from "../features/auth/ui/pages/ProfilePage";
import AboutPage from "../features/public/ui/pages/AboutPage";
import BlogPage from "../features/public/ui/pages/BlogPage";
import BookPujaPage from "../features/public/ui/pages/BookPujaPage";
import Home from "../features/public/ui/pages/Home";
import PoojaPage from "../features/public/ui/pages/PoojaPage";
import BookingPage from "../features/booking/ui/pages/BookingPage";
import MyBookingsPage from "../features/booking/ui/pages/MyBookingsPage";
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
  {
    path: "/book-pooja",
    element: <BookPujaPage />,
  },
  { path: "/pooja", element: <PoojaPage /> },
  {
    path: "/blogs",
    element: <BlogPage />,
  },
  {
    path: "/bookings",
    element: <div><h1>Bookings</h1></div>,
  },
  {
    path: "/blog",
    element: <BlogPage />,
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
    element: <MyBookingsPage />,
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
    element: <ProfilePage />,
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
    element: <ProfilePage />,
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
    path: "/admin/pandits",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/reviews",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/blogs",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/profile",
    element: <ProfilePage />,
  },
];

export { public_navigations, user_navigations, pandit_navigations, admin_navigations };
