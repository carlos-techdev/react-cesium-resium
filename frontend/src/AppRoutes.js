import { lazy } from "react";
import ErrorPage from "./pages/errorPage";
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Logout = lazy(() => import("./pages/auth/Logout"));

const Home = lazy(() => import("./pages/main/Home"));
const MyPage = lazy(() => import("./pages/main/MyPage"));
const Map = lazy(() => import("./pages/main/Map"));

const PrivateRoute = lazy(() => import("./components/privateRoute/index"));

const Footer = lazy(() => import("./components/pageLayout/Footer"));
const Topbar = lazy(() => import("./components/pageLayout/TopBar"));

const AppRoutes = [
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <div>
        <Topbar />
        <Home />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/my_page",
    element: (
      <PrivateRoute>
        <Topbar />
        <MyPage />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: "/map",
    element: (
      <PrivateRoute>
        <Topbar />
        <Map />
      </PrivateRoute>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <>
        <Login>
          <Footer />
        </Login>
      </>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <>
        <Register>
          <Footer />
        </Register>
      </>
    ),
  },
  {
    path: "/auth/forgot_password",
    element: (
      <>
        <ForgotPassword>
          <Footer />
        </ForgotPassword>
      </>
    ),
  },
  {
    path: "/auth/logout",
    element: <Logout />,
  },
];
export default AppRoutes;
