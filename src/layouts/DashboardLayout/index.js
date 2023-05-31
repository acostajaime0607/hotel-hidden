import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const dispatch = useDispatch();

  const handleLogoutUser = () => dispatch(logoutUser());

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">HIDDEN HOTEL</Navbar.Brand>

          <button
            className="btn"
            style={{ color: "red" }}
            onClick={handleLogoutUser}
          >
            Cerrar sesión
          </button>
        </Container>
      </Navbar>

      <Outlet />

      <div className="footer fixed-bottom bg-light">
        <footer className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary mt-10">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2023. All rights reserved.
          </div>

          <div>
            <a href="/" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="/" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
