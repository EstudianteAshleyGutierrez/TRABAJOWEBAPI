import React from 'react'
import { useNavigate } from 'react-router-dom';
import ConsultaDetalle from './ConsultaDetalle'
import Cookies from "universal-cookie";
import { useEffect } from 'react';

const ListRegisDet = () => {

  const cookies = new Cookies();
  let navigate = useNavigate();
  const cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("apellido_paterno", { path: "/" });
    cookies.remove("apellido_materno", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("correo", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("password", { path: "/" });
    navigate("/");
  };

  useEffect(() => {
    if (!cookies.get("id")) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
        <h4>Detalle Pedido Producto:</h4>
        <ConsultaDetalle cerrarSesion={cerrarSesion}/>
    </>
  )
}

export default ListRegisDet