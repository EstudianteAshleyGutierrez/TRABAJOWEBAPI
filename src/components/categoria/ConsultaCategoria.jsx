import React from "react";
import { useState } from "react";
import EditarCategoria from "./EditarCategoria";
import './css/Categoria.css'


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
      <table className="table table-hover ">
        <thead className="table-dark" >
          <tr className="text-light titulosistema">
            <th className="text-center">CODIGO</th>
            <th>NOMBRE CATEGORIA</th>
            <th>OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          {listaCategorias.map((c) => (
            <tr key={c.IdCategoria}>
              <td className="text-center">{c.IdCategoria}</td>
              <td>{c.CategoriaName}</td>
              <td>
                <button
                  className="btn botoncito"
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
