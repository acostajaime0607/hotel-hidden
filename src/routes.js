import React from "react";
import { Navigate } from "react-router-dom";
import NotFoundView from "./components/errors/NotFoundView";
import Login from "./view/auth/Login";
import Home from "./view/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import GestionHabitacion from "./view/gestions/GestionHabitacion";
import GestionReservas from "./view/gestions/GestionReservas";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: "app/dashboard", element: <Home /> },
      { path: "app/gestion_reservas", element: <GestionReservas /> },
      { path: "app/gestion_habitacion", element: <GestionHabitacion /> },
      { path: "/", element: <Navigate to="app/dashboard" /> },
      { path: "*", element: <NotFoundView /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <Login /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;
