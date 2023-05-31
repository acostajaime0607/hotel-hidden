/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Page from "../components/Page";

export default function Home() {
  const {
    user: { usuario },
  } = useSelector((state) => state.auth);

  return (
    <Page title="Inicio">
      <div className="container-fluid">
        <div
          className="row align-items-center justify-content-center"
          style={{ height: "60vh" }}
        >
          <h1>
            Bienvenido :{" "}
            <span className="text-primary">
              {usuario.nombres} {usuario.apellido}
            </span>
          </h1>

          <Container>
            <Row>
              <Col>
                <div
                  className="card card-image"
                  style={{
                    backgroundImage:
                      "url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.webp)",
                  }}
                >
                  <div
                    className="text-white text-center d-flex align-items-center py-5 px-4"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <div>
                      <h5 className="text-primary">
                        <i className="fas fa-chart-pie"></i> Reservas
                      </h5>
                      <h3 className="card-title pt-2">
                        <strong>Gestion de reservas</strong>
                      </h3>
                      <p>
                        Optimice la gestión de reservas con nuestra solución
                        especializada. Con nuestra herramienta de gestión de
                        reservas, puede gestionar y controlar las reservas de
                        manera eficiente.
                      </p>

                      <Link to={"/app/gestion_reservas"}>
                        <a className="btn btn-primary text-white">
                          <i className="fas fa-clone left"></i> Gestionar
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="card card-image"
                  style={{
                    backgroundImage:
                      "url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.webp)",
                  }}
                >
                  <div
                    className="text-white text-center d-flex align-items-center py-5 px-4"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <div>
                      <h5 className="text-success">
                        <i className="fas fa-chart-pie"></i> Habitaciones
                      </h5>
                      <h3 className="card-title pt-2">
                        <strong>Gestionar Habitaciones</strong>
                      </h3>
                      <p>
                        Administre sus habitaciones fácilmente con nuestra
                        herramienta de gestión de habitaciones. Simplifique el
                        proceso de seguimiento, reservas y disponibilidad de
                        habitaciones con nuestra solución intuitiva y eficiente.
                      </p>
                      <Link to={"/app/gestion_habitacion"}>
                        <a className="btn btn-success text-white">
                          <i className="fas fa-clone left"></i> Gestionar
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Page>
  );
}
