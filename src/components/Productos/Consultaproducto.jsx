import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import CampoEstado from './partials/CampoEstado';
import RegistroProducto from './RegistroProducto';

const Consultaproducto = ({nombreProducto, cerrarSesion}) => {
  
  //Variables para el sistema
  const [listaProductos, setListaProductos] = useState([]);
  const [activarRegistro, setActivarRegistro] = useState(false);

  //Funciones para el CRUD

  const listarProductos = async () => {
     await axios
      .get("http://localhost:4000/producto")
      .then((response) => {
        setListaProductos(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const buscarProductoPorNombre = async () => {
    const lista = await axios.get("http://localhost:4000/producto/productByName/"+nombreProducto);
    setListaProductos(lista.data);
  }

  const cambiarEstadoProducto = async(e, id) => {
      await axios.delete("http://localhost:4000/producto/changeProductStatus/"+id);
      console.log("PRODUCTO CON EL IDENTIFICADOR "+id+" CAMBIADO A "+(e.target.checked == true ? "DISPONIBLE": "NO DISPONIBLE"));
      if (document.getElementById("productoId"+id).className=="table-secondary"){
        document.getElementById("productoId"+id).className="";
        document.getElementById("productoBtnEditarId"+id).disabled=false;
      } else {
        document.getElementById("productoId"+id).className="table-secondary"
        document.getElementById("productoBtnEditarId"+id).disabled=true;
      }
  } 

  const activarRegistroProducto = () => {
    setActivarRegistro(!activarRegistro)
  }

  const cerrarRegistroProducto = () => {
    setActivarRegistro(!activarRegistro)
  }

  //Efectos para la fucnionalidad del sistema

  useEffect(() => {
    listarProductos()
  },[])

  useEffect(() => {
    if (nombreProducto == undefined || nombreProducto == ""){
      listarProductos();
    } else {
      buscarProductoPorNombre();
      console.log(nombreProducto);
    }
  }, [nombreProducto])

  //Variables extras
  const cantidadProductos = listaProductos.length;

  return (
    <>
      <div>
        <h5 className="text-primary">Cantidad de Productos: {cantidadProductos}</h5>
      </div>
      <br />
      <button
        className="btn btn-success "
        onClick={() => activarRegistroProducto()}
      >
        NUEVO PRODUCTO
      </button>
      {"   "}
      <button className="btn btn-danger" onClick={() => cerrarSesion()}>
        CERRAR SESION
      </button>
      {"   "}
      <br />
      <br />
      <table className="table table-bordered">
        <thead className='table-primary'>
          <tr>
            <th>Id Producto</th>
            <th>Nombre Producto</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Fecha de entrada</th>
            <th>Id categoria</th>
            <th>Estado</th>
            <th>Opcion</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {listaProductos.map((product) => (
            <tr className={product.Estado == "NO DISPONIBLE" ? "table-secondary" : ""} id={"productoId"+product.IdProducto} key={product.IdProducto}>
              <td>{product.IdProducto}</td>
              <td>{product.NombreProducto}</td>
              <td>{product.ImagenProducto == null ? "NO HAY IMAGEN": product.ImagenProducto}</td>
              <td>{product.Precio}</td>
              <td>{product.Stock}</td>
              <td>{new Date(product.Fecha_Entrada).toLocaleDateString()}</td>
              <td>{product.IdCategoria}</td>
              <CampoEstado cambiarEstadoProducto={cambiarEstadoProducto} Estado={product.Estado} IdProducto={product.IdProducto} />
              <td>
                <button
                  className="btn btn-warning"
                  id={"productoBtnEditarId"+product.IdProducto}
                  //onClick={() => seleccionarGestor(ordenes, "Editar")}
                disabled={product.Estado == "NO DISPONIBLE" ? true : false} >
                  EDITAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <RegistroProducto activarRegistro={activarRegistro} funcionCerrarRegistro={cerrarRegistroProducto}/>
    </>
  )
}

export default Consultaproducto