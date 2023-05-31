/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom,
  deleteRoom,
  getRoom,
  updateRoom,
} from "../../redux/actions/habitacionActions";
import FormCreateRoom from "../../components/form/FormCreateRoom";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  numero: yup.string().required("El numero es un valor requerido"),
  valor: yup.string().required("El valor es requerido"),
  tipo: yup.string().required("El tipo es requerido"),
});

const defaultsValues = {
  valor: "",
  numero: "",
  tipo: "",
};

export default function GestionHabitacion() {
  const dispatch = useDispatch();

  const { room } = useSelector((state) => state.room);

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
      reset({ ...data });
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
      dispatch(createRoom(values));
    } else {
      dispatch(updateRoom(values, showModal.data.codigo));
    }

    handleClose();
  };

  useEffect(() => {
    dispatch(getRoom());
  }, []);

  return (
    <Page title="Gestion de habitaciones">
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

          <h2>Gestion de habitaciones</h2>

          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleOpen("register", null)}
            >
              Nueva habitacion
            </button>
          </div>
        </div>
        <table className="table mt-2">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Numero</th>
              <th scope="col">Tipo</th>
              <th scope="col">Valor</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {room.map((x) => (
              <tr key={x.codigo}>
                <th scope="row">{x.codigo}</th>
                <td>{x.numero}</td>
                <td>{x.tipo}</td>
                <td>{x.valor}</td>
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
                      onClick={() => dispatch(deleteRoom(x.codigo))}
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

      <Modal show={showModal.status} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showModal.type === "register"
              ? " Registro de habitacion"
              : "Editar hibitacion"}{" "}
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit(addNewRoom)}>
          <Modal.Body>
            <div className="modal-body">
              <FormCreateRoom
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                showModal={showModal}
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
