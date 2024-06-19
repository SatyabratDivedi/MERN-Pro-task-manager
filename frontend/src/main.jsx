import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import {Toaster} from "react-hot-toast";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import AnalyticsRoute from "./components/analytics-dashboard/AnalyticsRoute.jsx";
import SettingPage from "./components/settingRoute/SettingPage.jsx";
import MainDashboard from "./components/main-dashboard/MainDashboard.jsx";

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
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
