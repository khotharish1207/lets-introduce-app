import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

const App = React.lazy(() => import("./App"));
const Preview = React.lazy(() => import("./preview/Preview"));
const Login = React.lazy(() => import("./auth/Login"));
const PageNotFound = React.lazy(() => import("./components/PageNotFound"));
const Site = React.lazy(() => import("./components/Site"));

const PrivateRoutes = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.app);

  if (user === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return user ? (
    <Outlet />
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
        {/* <Route path="/app" element={<App />} /> */}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Preview />} />
          <Route path="/app" element={<App />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/:site" element={<Site />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
