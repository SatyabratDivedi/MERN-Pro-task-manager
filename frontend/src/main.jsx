import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import {Toaster} from "react-hot-toast";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/login_and_RegisterPage/Login.jsx";
import Register from "./components/login_and_RegisterPage/Register.jsx";
import AnalyticsRoute from "./components/analytics-dashboard/AnalyticsRoute.jsx";
import SettingPage from "./components/settingRoute/SettingPage.jsx";
import MainDashboard from "./components/main-dashboard/MainDashboard.jsx";
import {store} from "./reduxStore/store.js";
import {Provider} from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainDashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "analytics",
        element: <AnalyticsRoute />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);
