import axios from "axios";
import React from "react";
//import { useEffect } from "react";
import { useState } from "react";

const RegistroCategoria = ({setEstadoPagina, estadoPagina}) => {

    const [nombreCategoriaR, setNombreCategoriaR] = useState("")

    const handleChangeNombre = (e) => {
        setNombreCategoriaR(e.target.value)
    }

    const registrarCategoria = async () => {
        const result = await axios.post("http://localhost:4000/categoria/addCategoria", {
            "CategoriaName": nombreCategoriaR
        })

        console.log(result);
        setEstadoPagina(!estadoPagina)
    }

    /* const listarCategorias = async() => {
        const result = await axios.get("http://localhost:4000/categoria");
        setListaCategorias(result.data);
    } */

  return (
    <div className="col-lg-5 float-lg-start card mb-3">
        <div className="card-header">
            <h5>Registro de categoria</h5>
        </div>
      <div className="card-body form-group">
        <label>Nombre de la categoria:</label>
        <input onChange={handleChangeNombre} className="form-control mt-3" type="text" name="nombre" />
      </div>

      <div className="card-footer mt-1 mb-1">
        <button className="btn btn-primary" onClick={registrarCategoria}>REGISTRAR</button>
      </div>
    </div>
  );
};

export default RegistroCategoria;
