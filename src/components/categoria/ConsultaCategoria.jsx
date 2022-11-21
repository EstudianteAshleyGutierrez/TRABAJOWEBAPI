import React from "react";
import { useState } from "react";
import EditarCategoria from "./EditarCategoria";

const ConsultaCategoria = ({ listaCategorias, setEstadoPagina, estadoPagina }) => {
  const [activarEdicion, setActivarEdicion] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState({})

  //const datosEditarCategoria = () => {}
  const sobreescribirDatos = (c) => {
    setCategoriaEditar(c);
    funcionActivarFormEdicion();
  }

  const funcionActivarFormEdicion = () => {
    setActivarEdicion(true);
  };

  const funcionCerrarFormEdicion = () => {
    setActivarEdicion(false);
  };

  return (
    <div className="col-lg-6 float-lg-end">
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>IdCategoria</th>
            <th>Nombre de la categoria</th>
            <th>Opción</th>
          </tr>
        </thead>
        <tbody>
          {listaCategorias.map((c) => (
            <tr key={c.IdCategoria}>
              <td>{c.IdCategoria}</td>
              <td>{c.CategoriaName}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => sobreescribirDatos(c)}
                >
                  EDITAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditarCategoria
        activarEdicion={activarEdicion}
        funcionCerrarFormEdicion={funcionCerrarFormEdicion}
        categoriaEditar={categoriaEditar}
        setEstadoPagina={setEstadoPagina}
        estadoPagina={estadoPagina}
      />
    </div>
  );
};

export default ConsultaCategoria;
