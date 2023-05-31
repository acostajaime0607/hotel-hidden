import React from "react";

export default function FormCreateRoom({ register, errors, showModal }) {
  return (
    <div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Numero</label>
        <input
          type="text"
          className="form-control"
          placeholder="404"
          {...register("numero")}
        />

        <label className="form-label">
          {errors.numero ? (
            <span className="link-danger">{errors.numero.message}</span>
          ) : null}
        </label>
      </div>

      <div className="form-group">
        <label>Tipo</label>
        <input
          type="text"
          className="form-control"
          placeholder="Sencilla"
          {...register("tipo")}
        />

        <label className="form-label">
          {errors.tipo ? (
            <span className="link-danger">{errors.tipo.message}</span>
          ) : null}
        </label>
      </div>

      <div className="form-group">
        <label for="exampleFormControlInput1">Valor</label>
        <input
          type="text"
          className="form-control"
          placeholder="100.000"
          {...register("valor")}
        />

        <label className="form-label">
          {errors.valor ? (
            <span className="link-danger">{errors.valor.message}</span>
          ) : null}
        </label>
      </div>
    </div>
  );
}
