import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const EditarCategoria = ({activarEdicion, funcionCerrarFormEdicion, categoriaEditar, setEstadoPagina, estadoPagina}) => {

  const [categoria, setCategoria] = useState({
    "CategoriaName": categoriaEditar.CategoriaName
  })

  const handleChange = (e) => {
    setCategoria({
      ...categoria,
      "CategoriaName": e.target.value
    });
    console.log(categoria);
  }

  const actualizarCategoria = async () => {
    const res = await axios.patch("http://localhost:4000/categoria/updateCategoria/"+categoriaEditar.IdCategoria, {
      "CategoriaName": categoria.CategoriaName
    })
    console.log(res);
    setEstadoPagina(!estadoPagina)
    funcionCerrarFormEdicion()
  }

  return (
    <>
      <Modal isOpen={activarEdicion} >
        <ModalHeader className="bg-dark text-light titulosistema">EDITAR LA CATEGORIA CON EL CODIGO : {categoriaEditar.IdCategoria || 0}</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre de la categoria:</label>
            <input
              defaultValue={categoriaEditar.CategoriaName || ""}
              className="form-control mt-3"
              type="text"
              name="CategoriaName"
              onChange={handleChange}
            />

          <button className="btn botoncito mt-3 titulosistema" onClick={() => actualizarCategoria()}>EDITAR</button>
          {" | "}
          <button className="btn btn-danger mt-3 text-light titulosistema" onClick={funcionCerrarFormEdicion}>CERRAR</button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditarCategoria;
