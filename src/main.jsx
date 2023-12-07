import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import Statistic from "./pages/Statistic.jsx";
import Imprint from "./pages/Imprint.jsx";
import Blog from "./pages/Blog.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/historie",
    element: <Statistic />,
  },
  {
    path: "/impressum",
    element: <Imprint />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
