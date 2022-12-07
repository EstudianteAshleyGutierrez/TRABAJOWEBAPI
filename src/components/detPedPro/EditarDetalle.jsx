import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const [cantidadpedido, setcantidadpedido] = useState(0)
  const [listaProductos, setListaProductos] = useState([]);

 
  const retornarcantidad = async () => {
    await axios
    .get("http://localhost:4000/detPedPro")
    .then((response) => {
      setcantidadpedido(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const cargarProductos = async () => {
    const lista = await axios.get("http://localhost:4000/producto");
    setListaProductos(lista.data);
  }

  useEffect(() => {
    retornarcantidad();
    cargarProductos();
  }, []);

 /*  useEffect(() => {
    console.log( (new Date(detalleEditar.Fecha_Produccion).getMonth()+1) >= 10 ? new Date(detalleEditar.Fecha_Produccion).getFullYear() + "-" + (new Date(detalleEditar.Fecha_Produccion).getMonth()+1) + "-" + (new Date(detalleEditar.Fecha_Produccion).getDate() >= 10 ? new Date(detalleEditar.Fecha_Produccion).getDate() : "0"+new Date(detalleEditar.Fecha_Produccion).getDate()):new Date(detalleEditar.Fecha_Produccion).getFullYear() + "-0" + (new Date(detalleEditar.Fecha_Produccion).getMonth()+1) + "-" + (new Date(detalleEditar.Fecha_Produccion).getDate() >= 10 ? new Date(detalleEditar.Fecha_Produccion).getDate() : "0"+new Date(detalleEditar.Fecha_Produccion).getDate()) );
  }, [detalleEditar]); */

  var nrofilas = cantidadpedido.length;

  return (
    <>
      <Modal isOpen={eventoEditar}>
        <ModalHeader className="bg-dark text-light titulosistema text-center">EDITAR DETALLE CON EL CODIGO : {detalleEditar.Id}</ModalHeader>
        <ModalBody>
          <label className="form-label">Id del pedido: </label>
          <input
            min="1" 
            max={nrofilas} 
            defaultValue={detalleEditar.IdPedido}
            name="IdPedido"
            type={"number"}
            className="form-control"
            onChange={handleChange}
          ></input>
          <label className="form-label mt-2">Id del producto:</label>
          <select onChange={handleChange} defaultValue={detalleEditar.IdProducto} name="IdProducto" className="form-select">
            <option value={"DEFAULT"}>Seleccione una opcion</option>
            {
              listaProductos.map((p) => (<option key={p.IdProducto} value={p.IdProducto}>{p.NombreProducto}</option>))
            }
          </select>
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
          <button className="btn botoncito" onClick={editarDetalle}>Editar</button>
          {" | "}
          <button className="btn btn-danger text-light titulosistema" onClick={funcionCerrarEdicion}>
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditarDetalle;
