//import { Modal } from "bootstrap";
import axios from "axios";
import React from "react";
//import { useEffect } from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const RegistroDetalle = ({funcionCerrarRegistro, eventoRegistro, setEstadoPagina, estadoPagina}) => {

  const [detalleRegistrar, setDetalleRegistrar] = useState({
    "IdPedido": 0,
    "IdProducto": 0,
    "CantidadPedido": 0,
    "montoPedido": 0,
    "Fecha_Produccion": "",
    "Fecha_Vencimiento": ""
  })

  const handleChange = (e) => {
    setDetalleRegistrar({
      ...detalleRegistrar,
      [e.target.name]: e.target.value
    })
  }

  const registrarDetalle = async() => {
    const res = await axios.post("http://localhost:4000/detPedPro/addDetPedPro", detalleRegistrar)
    console.log(res);
    setEstadoPagina(!estadoPagina)
    funcionCerrarRegistro()
  }

  return (
    <>
      <Modal isOpen={eventoRegistro}>
        <ModalHeader>Registro de detalle</ModalHeader>
        <ModalBody>
          <label className="form-label">Id del pedido: </label>
          <input name="IdPedido" type={"number"} className="form-control" onChange={handleChange}></input>
          <label className="form-label mt-2">Id del producto:</label>
          <input name="IdProducto" type={"number"} className="form-control" onChange={handleChange}></input>
          <label className="form-label mt-2">Cantidad:</label>
          <input name="CantidadPedido" type={"number"} className="form-control" onChange={handleChange}></input>
          <label className="form-label mt-2">Monto:</label>
          <input name="montoPedido" type={"number"} className="form-control" onChange={handleChange}></input>
          <label className="form-label mt-2">Fecha de producción: </label>
          <input name="Fecha_Produccion" type={"date"} className="form-control" onChange={handleChange}></input>
          <label className="form-label mt-2">Fecha de vencimiento: </label>
          <input name="Fecha_Vencimiento" type={"date"} className="form-control" onChange={handleChange}></input>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={registrarDetalle}>
            Registrar
          </button>
          {" | "}
          <button className="btn btn-danger" onClick={funcionCerrarRegistro}>
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RegistroDetalle;
