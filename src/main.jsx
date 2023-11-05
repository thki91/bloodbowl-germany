import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import Ranking from './pages/Ranking.jsx'
import Team from './pages/Team.jsx'
import History from './pages/History.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    path: "/team",
    element: <Team />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
