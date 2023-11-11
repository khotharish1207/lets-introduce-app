import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";

const App = React.lazy(() => import("./App"));
// const Preview = React.lazy(() => import("./preview/Preview"));
const Login = React.lazy(() => import("./auth/Login"));
const PageNotFound = React.lazy(() => import("./components/PageNotFound"));
const Site = React.lazy(() => import("./components/Site"));
const Dashboard = React.lazy(() => import("./dashboard/Dashboard"));

const PrivateRoutes = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.app);

  if (user === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return user ? (
    <div>
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

const AppRoutes = () => {
  const { loading } = useSelector((state) => state.app);
  return (
    <BrowserRouter>
      <Loader show={loading} />
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<App />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/:site" element={<Site />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
