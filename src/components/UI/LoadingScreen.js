import React from "react";
import Spinner from "react-bootstrap/Spinner";

function LoadingScreen() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Cargando...</p>
    </div>
  );
}

export default LoadingScreen;
