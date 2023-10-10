import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Loader from "./components/Loader";
import "./index.css";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import Routes from "./routes";
import "./theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const cid2 =
  "34432485904-e2glgmvbpp95v1ugbg3bjp27spteiud2.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={cid2}>
      <Provider store={store}>
        <Suspense fallback={<Loader show />}>
          <Routes />
        </Suspense>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
