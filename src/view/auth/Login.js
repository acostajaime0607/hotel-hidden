/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/style-prop-object */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { startLoginUser } from "../../redux/actions/authActions";
import Alert from "react-bootstrap/Alert";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("El correo es requerido")
    .email("Ingresa un email valido"),
  password: yup.string().required("La contraseña es requerida"),
});

export default function Login() {
  const dispatch = useDispatch();

  const { errorAuth, fetchingData } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { cedula: "" },
  });

  const handleSubmitLogin = (data) =>
    dispatch(startLoginUser(data.email, data.password));

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://img.freepik.com/vector-gratis/identidad-corporativa-editable-negocio-vector-logotipo-hotel-texto-oculto-hotel_53876-111556.jpg"
              className="img-fluid"
              alt="Sample image"
            />
          </div>

          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit(handleSubmitLogin)}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Inicia sesión con</p>
                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-twitter"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">O</p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  {...register("email")}
                  className="form-control form-control-lg"
                  placeholder="Ingrese su correo"
                />
                <label className="form-label">
                  {errors.email ? (
                    <span className="link-danger">{errors.email.message}</span>
                  ) : (
                    "Correo"
                  )}
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  name="password"
                  className="form-control form-control-lg border"
                  placeholder="Ingresa tu contraseña"
                />
                <label className="form-label">
                  {errors.password ? (
                    <span className="link-danger">
                      {errors.password.message}
                    </span>
                  ) : (
                    "Contraseña"
                  )}
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label">Recuerdame</label>
                </div>
                <a href="#!" className="text-body">
                  ¿Has olvidado tu contraseña?
                </a>
              </div>

              {errorAuth && (
                <Alert className="mt-4" variant={"danger"}>
                  {errorAuth}
                </Alert>
              )}

              <div className="text-center text-lg-start mt-4 pt-2">
                {!fetchingData ? (
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                ) : (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                )}

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  ¿No tienes una cuenta?{" "}
                  <a href="#!" className="link-danger">
                    Registro
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
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
      </div>
    </section>
  );
}
