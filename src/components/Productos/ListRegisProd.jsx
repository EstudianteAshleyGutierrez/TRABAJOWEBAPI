import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Consultaproducto from "./Consultaproducto";

const Registroproducto = () => {
  // CERRAR SESION NO TOCAR
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

  //Declaración de variables

  const [nombreProducto, setNombreProducto] = useState(null);
  const [estadoPagina, setEstadoPagina] = useState(true);

  const handleChange = (e) => {
    setNombreProducto(e.target.value);
  }

  return (
    <>
      <h4>Buscar un Producto: </h4>
      <div className="containerInput">
        <input
          className="form-control inputbuscar w-50 "
          value={nombreProducto || ""}
          id="busqueda"
          onChange={handleChange}
          placeholder="Ingrese el producto.."
        />
      </div>
      <br />

      <Consultaproducto nombreProducto={nombreProducto} cerrarSesion={cerrarSesion} setNombreProducto={setNombreProducto} estadoPagina={estadoPagina} setEstadoPagina={setEstadoPagina}/>      
    </>
  );
};

export default Registroproducto;
