import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const RegistroProducto = ({
  activarRegistro,
  funcionCerrarRegistro,
  setEstadoPagina,
  estadoPagina,
}) => {
  const [listaCategoria, setListaCategoria] = useState([]);
  const [file, setFile] = useState(null);
  const [registroProducto, setRegistroProducto] = useState({
    NombreProducto: null,
    Descripcion: null,
    IdCategoria: null,
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setRegistroProducto({
      ...registroProducto,
      [name]: value.toUpperCase(),
    });
  };

  const handleChangeImage = (e) => {
    setFile(e.target.files[0]);
  };

  const listarCategorias = async () => {
    const lista = await axios.get("http://localhost:4000/categoria");
    setListaCategoria(lista.data);
  };

  const registrarProducto = async () => {
    registroProducto.IdCategoria = parseInt(registroProducto.IdCategoria);
    setRegistroProducto(registroProducto);

    /*const formateado = new FormData();
    formateado.append("image", file)*/

    const res = await axios.post(
      "http://localhost:4000/producto/addProduct",
      {
        ProductImage: file,
        ...registroProducto,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res);
    setEstadoPagina(!estadoPagina);
    funcionCerrarRegistro();
  };

  useEffect(() => {
    listarCategorias();
  }, []);

  useEffect(() => {
    //console.log(registroProducto);
    //console.log(file);
  }, [registroProducto, file]);

  return (
    <>
      <Modal isOpen={activarRegistro}>
        <ModalHeader className="bg-dark text-light titulosistema text-center">REGISTRAR PRODUCTO</ModalHeader>
        <ModalBody>
          <label className="form-text">Nombre del producto: </label>
          <input
            name="NombreProducto"
            className="form-control mt-2"
            type="text"
            placeholder="Ingrese el nombre del producto"
            onChange={handlechange}
          />
          <label className="form-text mt-3">Descripción del producto: </label>
          <input
            name="descripcion"
            className="form-control mt-2"
            type="text"
            placeholder="Ingrese una descripción para el producto"
            onChange={handlechange}
          />
          <label className="form-text mt-3">Categoria del producto: </label>
          <select
            name="IdCategoria"
            className="form-select mt-2"
            placeholder="Seleccione una categoria"
            onChange={handlechange}
          >
            <option>Seleccione una opción</option>
            {listaCategoria.map((ctg) => (
              <option key={ctg.IdCategoria} value={ctg.IdCategoria || ""}>
                {ctg.CategoriaName || ""}
              </option>
            ))}
          </select>
          <label className="form-text mt-3">Imagen del producto: </label>
          <input
            onChange={handleChangeImage}
            name="ProductImage"
            className="form-control mt-2"
            type="file"
          />
        </ModalBody>
        <ModalFooter>
          <button className="btn botoncito" onClick={registrarProducto}>
            Registrar
          </button>
          {" | "}
          <button className="btn btn-danger text-light titulosistema" onClick={funcionCerrarRegistro}>
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RegistroProducto;
