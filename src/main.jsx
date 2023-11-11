import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import Ranking from "./pages/Ranking.jsx";
import History from "./pages/History.jsx";
import Imprint from "./pages/Imprint.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ranking",
    element: <Ranking />,
  },
  {
    path: "/historie",
    element: <History />,
  },
  {
    path: "/impressum",
    element: <Imprint />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);