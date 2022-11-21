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
      <Modal isOpen={activarEdicion}>
        <ModalHeader>Editar Categoria con id {categoriaEditar.IdCategoria || 0}</ModalHeader>
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
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-warning mt-3" onClick={() => actualizarCategoria()}>EDITAR</button>
          {" | "}
          <button className="btn btn-danger mt-3" onClick={funcionCerrarFormEdicion}>CERRAR</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditarCategoria;
