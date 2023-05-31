/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoom } from "../../redux/actions/habitacionActions";

export default function FormCreateReserve({ register, errors, reset }) {
  const { room } = useSelector((state) => state.room);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoom());
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col">
          <label>Habitacion</label>
          <select className="form-control" {...register("codigo_habitacion")}>
            <option>Selecionar una opcion</option>
            {room.map((x) => (
              <option key={x.codigo} value={x.codigo}>
                {x.numero}
              </option>
            ))}
          </select>

          <label className="form-label">
            {errors.codigo_habitacion ? (
              <span className="link-danger">
                {errors.codigo_habitacion.message}
              </span>
            ) : null}
          </label>
        </div>

        <div className="col">
          <label>nombre</label>
          <input type="text" className="form-control" {...register("nombre")} />

          <label className="form-label">
            {errors.nombre ? (
              <span className="link-danger">{errors.nombre.message}</span>
            ) : null}
          </label>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Telefono</label>
          <input
            type="text"
            className="form-control"
            {...register("telefono")}
          />

          <label className="form-label">
            {errors.telefono ? (
              <span className="link-danger">{errors.telefono.message}</span>
            ) : null}
          </label>
        </div>

        <div className="col">
          <label>Fecha de reserva</label>
          <input
            type="date"
            className="form-control"
            {...register("fecha_reservacion")}
            name="fecha_reservacion"
          />
          <label className="form-label">
            {errors.fecha_reservacion ? (
              <span className="link-danger">
                {errors.fecha_reservacion.message}
              </span>
            ) : null}
          </label>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Fecha entrada</label>
          <input
            type="date"
            className="form-control"
            {...register("fecha_entrada")}
          />

          <label className="form-label">
            {errors.fecha_entrada ? (
              <span className="link-danger">
                {errors.fecha_entrada.message}
              </span>
            ) : null}
          </label>
        </div>

        <div className="col">
          <label>Fecha de salida</label>
          <input
            type="date"
            {...register("fecha_salida")}
            className="form-control"
          />

          <label className="form-label">
            {errors.fecha_salida ? (
              <span className="link-danger">{errors.fecha_salida.message}</span>
            ) : null}
          </label>
        </div>
      </div>
    </div>
  );
}
