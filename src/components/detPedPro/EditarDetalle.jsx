import axios from "axios";
import React from "react";
//import { useEffect } from "react";
//import { useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const EditarDetalle = ({
  eventoEditar,
  funcionCerrarEdicion,
  detalleEditar,
  setDetalleEditar,
  setEstadoPagina,
  estadoPagina
}) => {

  const handleChange = (e) => {
    setDetalleEditar({
      ...detalleEditar,
      [e.target.name]: e.target.value
    })
  }

  const editarDetalle = async () => {
    const res = await axios.patch("http://localhost:4000/detPedPro/updateDetPedPro/"+detalleEditar.Id, detalleEditar)
    console.log(res);
    setEstadoPagina(!estadoPagina)
    funcionCerrarEdicion()
  }

 /*  useEffect(() => {
    console.log( (new Date(detalleEditar.Fecha_Produccion).getMonth()+1) >= 10 ? new Date(detalleEditar.Fecha_Produccion).getFullYear() + "-" + (new Date(detalleEditar.Fecha_Produccion).getMonth()+1) + "-" + (new Date(detalleEditar.Fecha_Produccion).getDate() >= 10 ? new Date(detalleEditar.Fecha_Produccion).getDate() : "0"+new Date(detalleEditar.Fecha_Produccion).getDate()):new Date(detalleEditar.Fecha_Produccion).getFullYear() + "-0" + (new Date(detalleEditar.Fecha_Produccion).getMonth()+1) + "-" + (new Date(detalleEditar.Fecha_Produccion).getDate() >= 10 ? new Date(detalleEditar.Fecha_Produccion).getDate() : "0"+new Date(detalleEditar.Fecha_Produccion).getDate()) );
  }, [detalleEditar]); */

  return (
    <>
      <Modal isOpen={eventoEditar}>
        <ModalHeader>Editar detalle con id {detalleEditar.Id}</ModalHeader>
        <ModalBody>
          <label className="form-label">Id del pedido: </label>
          <input
            defaultValue={detalleEditar.IdPedido}
            name="IdPedido"
            type={"number"}
            className="form-control"
            onChange={handleChange}
          ></input>
          <label className="form-label mt-2">Id del producto:</label>
          <input
          defaultValue={detalleEditar.IdProducto}
            name="IdProducto"
            type={"number"}
            className="form-control"
            onChange={handleChange}
          ></input>
          <label className="form-label mt-2">Cantidad:</label>
          <input
          defaultValue={detalleEditar.CantidadPedido}
            name="CantidadPedido"
            type={"number"}
            className="form-control"
            onChange={handleChange}
          ></input>
          <label className="form-label mt-2">Monto:</label>
          <input
          defaultValue={detalleEditar.montoPedido}
            name="montoPedido"
            type={"number"}
            className="form-control"
            onChange={handleChange}
          ></input>
          <label className="form-label mt-2">Fecha de producción: </label>
          <input
            defaultValue={(new Date(detalleEditar.Fecha_Produccion).getMonth()+1) >= 10 ? new Date(detalleEditar.Fecha_Produccion).getFullYear() + "-" + (new Date(detalleEditar.Fecha_Produccion).getMonth()+1) + "-" + (new Date(detalleEditar.Fecha_Produccion).getDate() >= 10 ? new Date(detalleEditar.Fecha_Produccion).getDate() : "0"+new Date(detalleEditar.Fecha_Produccion).getDate()):new Date(detalleEditar.Fecha_Produccion).getFullYear() + "-0" + (new Date(detalleEditar.Fecha_Produccion).getMonth()+1) + "-" + (new Date(detalleEditar.Fecha_Produccion).getDate() >= 10 ? new Date(detalleEditar.Fecha_Produccion).getDate() : "0"+new Date(detalleEditar.Fecha_Produccion).getDate())}
            name="Fecha_Produccion"
            type={"date"}
            className="form-control"
            onChange={handleChange}
          ></input>
          <label className="form-label mt-2">Fecha de vencimiento: </label>
          <input
          defaultValue={(new Date(detalleEditar.Fecha_Vencimiento).getMonth()+1) >= 10 ? new Date(detalleEditar.Fecha_Vencimiento).getFullYear() + "-" + (new Date(detalleEditar.Fecha_Vencimiento).getMonth()+1) + "-" + (new Date(detalleEditar.Fecha_Vencimiento).getDate() >= 10 ? new Date(detalleEditar.Fecha_Vencimiento).getDate() : "0"+new Date(detalleEditar.Fecha_Vencimiento).getDate()):new Date(detalleEditar.Fecha_Vencimiento).getFullYear() + "-0" + (new Date(detalleEditar.Fecha_Vencimiento).getMonth()+1) + "-" + (new Date(detalleEditar.Fecha_Vencimiento).getDate() >= 10 ? new Date(detalleEditar.Fecha_Vencimiento).getDate() : "0"+new Date(detalleEditar.Fecha_Vencimiento).getDate())}
            name="Fecha_Vencimiento"
            type={"date"}
            className="form-control"
            onChange={handleChange}
          ></input>
          <label className="form-label mt-2">Id Factura:</label>
          <input
          defaultValue={detalleEditar.IdFactura || ""}
            name="IdFactura"
            type={"number"}
            className="form-control"
            onChange={handleChange}
          ></input>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={editarDetalle}>Editar</button>
          {" | "}
          <button className="btn btn-danger" onClick={funcionCerrarEdicion}>
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditarDetalle;
