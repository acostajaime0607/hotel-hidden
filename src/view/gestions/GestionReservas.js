/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Page from "../../components/Page";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormCreateReserve from "../../components/form/FormCreateReserve";
import {
  createReserve,
  deleteReserve,
  getReserve,
  updateReserve,
} from "../../redux/actions/reserveAction";
import dayjs from "dayjs";
import es from "dayjs/locale/es.js";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  codigo_habitacion: yup
    .string()
    .required("El numero de habitacion es un valor requerido"),
  nombre: yup.string().required("El nombre es requerido"),
  telefono: yup.string().required("El telefono es requerido"),
  fecha_reservacion: yup.string().required("El fecha de reserva es requerido"),
  fecha_entrada: yup.string().required("El fecha de entrada es requerido"),
  fecha_salida: yup.string().required("El fecha de salida es requerido"),
});

const defaultsValues = {
  codigo_habitacion: "",
  nombre: "",
  telefono: "",
  fecha_reservacion: new Date(),
  fecha_entrada: new Date(),
  fecha_salida: new Date(),
};

export default function GestionReservas() {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.bookings);

  const [showModal, setShowModal] = useState({
    status: false,
    type: "register",
    data: null,
  });

  const handleClose = () => {
    setShowModal({
      status: false,
      type: "register",
      data: null,
    });
  };

  const handleOpen = (type, data) => {
    if (type === "update") {
      const formatter = {
        codigo_habitacion: data.codigo_habitacion,
        nombre: data.nombre_cliente,
        telefono: data.telefono_cliente,
        fecha_reservacion: dayjs(data.fecha_reservacion)
          .locale(es)
          .format("YYYY-MM-DD"),
        fecha_entrada: dayjs(data.fecha_entrada)
          .locale(es)
          .format("YYYY-MM-DD"),
        fecha_salida: dayjs(data.fecha_salida).locale(es).format("YYYY-MM-DD"),
      };

      reset({ ...formatter });
    } else {
      reset({ ...defaultsValues });
    }

    setShowModal({
      status: true,
      type: type,
      data: data,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultsValues },
  });

  const addNewRoom = (values) => {
    if (showModal.type === "register") {
      dispatch(createReserve(values));
    } else {
      dispatch(updateReserve(values, showModal.data.codigo));
    }

    handleClose();
  };

  useEffect(() => {
    dispatch(getReserve());
  }, []);

  return (
    <Page title="Gestion de reservas">
      <div className="m-4 p-2">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to={"/"}>
            <button className="btn btn-secondary">Volver atras</button>
          </Link>

          <h2>Gestion de reservas</h2>

          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleOpen("register", null)}
            >
              Nueva reserva
            </button>
          </div>
        </div>
        <table className="table mt-2">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Codigo habitacion</th>
              <th scope="col">Nombre</th>
              <th scope="col">Telefono</th>
              <th scope="col">Fecha reservacion</th>
              <th scope="col">Fecha entrada</th>
              <th scope="col">Fecha salida</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((x) => (
              <tr key={x.codigo}>
                <th scope="row">{x.codigo}</th>
                <td>{x.codigo_habitacion}</td>
                <td>{x.nombre_cliente}</td>
                <td>{x.telefono_cliente}</td>
                <td>
                  {dayjs(x.fecha_reservacion).locale(es).format("YYYY/MM/DD")}
                </td>
                <td>
                  {dayjs(x.fecha_entrada).locale(es).format("YYYY/MM/DD")}
                </td>
                <td>{dayjs(x.fecha_salida).locale(es).format("YYYY/MM/DD")}</td>
                <td style={{ width: "15%" }}>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleOpen("update", x)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => dispatch(deleteReserve(x.codigo))}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal.status} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {showModal.type === "register"
              ? " Registro de reserva"
              : "Editar reserva"}{" "}
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit(addNewRoom)}>
          <Modal.Body>
            <div className="modal-body">
              <FormCreateReserve
                register={register}
                errors={errors}
                reset={reset}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>

            <Button type="submit" variant="primary">
              {showModal.type === "register" ? "Registrar" : "Actualizar"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Page>
  );
}
