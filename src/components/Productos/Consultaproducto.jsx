import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import EditarProducto from "./EditarProducto";
//import CampoEstado from "./partials/CampoEstado";
import RegistroProducto from "./RegistroProducto";

const Consultaproducto = ({
  nombreProducto,
  cerrarSesion,
  setNombreProducto,
  estadoPagina,
  setEstadoPagina,
}) => {
  //Variables para el sistema
  const [listaProductos, setListaProductos] = useState([]);
  const [activarRegistro, setActivarRegistro] = useState(false);
  const [activarEdicion, setActivarEdicion] = useState(false);
  const [productoEditar, setProductoEditar] = useState({
    IdProducto: null,
    NombreProducto: null,
    descripcion: null,
    IdCategoria: null,
  });

  //Funciones para el CRUD

  const listarProductos = async () => {
    await axios
      .get("http://localhost:4000/producto")
      .then((response) => {
        setListaProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*const cambiarEstadoProducto = async(e, id) => {
      await axios.delete("http://localhost:4000/producto/changeProductStatus/"+id);
      console.log("PRODUCTO CON EL IDENTIFICADOR "+id+" CAMBIADO A "+(e.target.checked == true ? "DISPONIBLE": "NO DISPONIBLE"));
      if (document.getElementById("productoId"+id).className=="table-secondary"){
        document.getElementById("productoId"+id).className="";
        document.getElementById("productoBtnEditarId"+id).disabled=false;
      } else {
        document.getElementById("productoId"+id).className="table-secondary"
        document.getElementById("productoBtnEditarId"+id).disabled=true;
      }
  } */

  const activarRegistroProducto = () => {
    setActivarRegistro(!activarRegistro);
  };

  const cerrarRegistroProducto = () => {
    setActivarRegistro(!activarRegistro);
  };

  const activarEditarProducto = (product) => {
    setProductoEditar(product);
    setActivarEdicion(!activarEdicion);
  };

  const cerrarEditarProducto = () => {
    setActivarEdicion(!activarEdicion);
  };

  //Efectos para la fucnionalidad del sistema

  useEffect(() => {
    listarProductos();
  }, []);

  useEffect(() => {
    if (
      nombreProducto === undefined ||
      nombreProducto === null ||
      nombreProducto === ""
    ) {
      listarProductos();
    } else {
      const buscarProductoPorNombre = async () => {
        const lista = await axios.get(
          "http://localhost:4000/producto/productByName/" + nombreProducto
        );
        setListaProductos(lista.data);
      };
      buscarProductoPorNombre();
      //console.log(nombreProducto);
    }
  }, [nombreProducto, estadoPagina]);

  //Variables extras
  const cantidadProductos = listaProductos.length;

  return (
    <>
      <br/><br/><br/><br/><br/><br/>
    
      <button
        className="btn botoncito "
        onClick={() => activarRegistroProducto()}
      >
        NUEVO PRODUCTO
      </button>
      {"   "}
      <button className="btn btn-danger text-light titulosistema" onClick={() => cerrarSesion()}>
        CERRAR SESION
      </button>
      {"   "}
      <br />
      <div>
        <h5 className="text-dark mb-3 mt-3 titulosistema">
          Cantidad de Productos : {cantidadProductos}
        </h5>
      </div>
      <br />
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr className="text-light titulosistema">
            <th className="text-center">CODIGO</th>
            <th className="text-center">NOMBRE</th>
            <th className="text-center">DESCRIPCION</th>
            <th className="text-center">CODIGO CATEGORIA</th>
            <th className="text-center">IMAGEN</th>
            <th className="text-center">OPCIONES</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {listaProductos.map((product) => (
            <tr
              /*className={product.Estado == "NO DISPONIBLE" ? "table-secondary" : ""} id={"productoId"+product.IdProducto}*/ key={
                product.IdProducto
              }
            >
              <td align="center">{product.IdProducto}</td>
              <td>{product.NombreProducto}</td>
              <td align="center">{product.descripcion}</td>
              <td align="center">{product.IdCategoria}</td>
              <td align="center">
                {product.ImagenProducto === null ? (
                  <img
                    alt={"No hay imagen"}
                    width={"110px"}
                    height={"110px"}
                    src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                  />
                ) : (
                  <img
                    width={"110px"}
                    height={"110px"}
                    src={product.ImagenProducto}
                    alt={"No hay imagen"}
                  />
                )}
              </td>
              {/* <CampoEstado cambiarEstadoProducto={cambiarEstadoProducto} Estado={product.Estado} IdProducto={product.IdProducto} /> */}
              <td align="center">
                <button
                  className="btn botoncito"
                  /*id={"productoBtnEditarId"+product.IdProducto}*/
                  onClick={() => activarEditarProducto(product)}
                  /*disabled={product.Estado == "NO DISPONIBLE" ? true : false}*/
                >
                  EDITAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <RegistroProducto
        activarRegistro={activarRegistro}
        funcionCerrarRegistro={cerrarRegistroProducto}
        estadoPagina={estadoPagina}
        setEstadoPagina={setEstadoPagina}
      />

      <EditarProducto
        activarEdicion={activarEdicion}
        funcionCerrarEdicion={cerrarEditarProducto}
        producto={productoEditar}
        estadoPagina={estadoPagina}
        setEstadoPagina={setEstadoPagina}
        setProductoEditar={setProductoEditar}
      />
    </>
  );
};

export default Consultaproducto;
