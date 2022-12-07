import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './css/Pedido.css'
import EditarDetalle from "./EditarDetalle";
import RegistroDetalle from "./RegistroDetalle";

const ConsultaDetalle = ({cerrarSesion}) => {

    const [listaDetalles, setListaDetalles] = useState([])
    const [eventoRegistro, setEventoRegistro] = useState(false)
    const [eventoEditar, setEventoEditar] = useState(false)
    const [estadoPagina, setEstadoPagina] = useState(true)
    const [detalleEditar, setDetalleEditar] = useState({
      "Id": 0,
      "IdPedido": 0,
      "IdProducto": 0,
      "CantidadPedido": 0,
      "montoPedido": 0,
      "Fecha_Produccion": "",
      "Fecha_Vencimiento": "",
      "IdFactura": 0
    })

    const funcionAbrirRegistro = () => {
      setEventoRegistro(true)
    }
    const funcionCerrarRegistro = () => {
      setEventoRegistro(false)
    }

    const funcionAbrirEdicion = (d) => {
      setDetalleEditar(d)
      setEventoEditar(true)
    }
    const funcionCerrarEdicion = () => {
      setEventoEditar(false)
    }

    useEffect(() => {
        const listarDetalles = async () => {
            const lista = await axios.get("http://localhost:4000/detPedPro")
            setListaDetalles(lista.data)
        }

        listarDetalles();
    }, [estadoPagina])

    const cantidadDet = listaDetalles.length;

  return (
    <>
      <div>
        <h5 className="text-dark text-center titulosistema">
          CANTIDAD DE PRODUCTOS: {cantidadDet}
        </h5>
      </div>
      <br />
      <button
        className="btn botoncito titulosistema"
        onClick={funcionAbrirRegistro}
      >
        Nuevo Detalle
      </button>
      {"   "}
      <button className="btn btn-danger text-light titulosistema" onClick={() => cerrarSesion()}>
        Cerrar Sesion
      </button>
      {"   "}
      <br />
      <br />
      <table className="table table-bordered">
        <thead className="table-dark text-center">
          <tr className="text-light titulosistema">
            <th>CODIGO</th>
            <th>CODIGO PEDIDO</th>
            <th>CODIGO PRODUCTO</th>
            <th>CANTIDAD</th>
            <th>MONTO</th>
            <th>FECHA PRODUCCION</th>
            <th>FECHA VENCIMIENTO</th>
            <th>CODIGO FACTURA</th>
            <th>OPCIONES</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {listaDetalles.map(d => (
            <tr key={d.Id}>
                <td align="center">{d.Id}</td>
                <td align="center">{d.IdPedido}</td>
                <td align="center">{d.IdProducto}</td>
                <td align="center">{d.CantidadPedido}</td>
                <td align="center">{d.montoPedido}</td>
                <td align="center">{new Date(d.Fecha_Produccion).toLocaleDateString()}</td>
                <td align="center">{new Date(d.Fecha_Vencimiento).toLocaleDateString()}</td>
                <td align="center">{d.IdFactura || "Sin factura"}</td>
                <td align="center">
                    <button className="btn botoncito" onClick={() => funcionAbrirEdicion(d)}>
                        EDITAR
                    </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <RegistroDetalle funcionCerrarRegistro={funcionCerrarRegistro} eventoRegistro={eventoRegistro} estadoPagina={estadoPagina} setEstadoPagina={setEstadoPagina}/>
      <EditarDetalle eventoEditar={eventoEditar} funcionCerrarEdicion={funcionCerrarEdicion} detalleEditar={detalleEditar} setDetalleEditar={setDetalleEditar} estadoPagina={estadoPagina} setEstadoPagina={setEstadoPagina}/>
    </>
  );
};

export default ConsultaDetalle;
