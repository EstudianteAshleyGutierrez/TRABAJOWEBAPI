import React,{Fragment,useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
//import {Modal,ModalBody,ModalFooter,ModalHeader, NavItem} from 'reactstrap';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Registrofactura = () => {
  const cookies = new Cookies(); 
  let navigate = useNavigate(); 
  const cerrarSesion=()=>{
    cookies.remove('id', {path: '/'});
    cookies.remove('apellido_paterno', {path: '/'});
    cookies.remove('apellido_materno', {path: '/'});
    cookies.remove('nombre', {path: '/'});
    cookies.remove('correo', {path: '/'});
    cookies.remove('username', {path: '/'});
    cookies.remove('password', {path: '/'});
    navigate('/');
  }

  useEffect(()=>{
    if (!cookies.get('id')){
      navigate('/');
    }
  },[]);

  const baseUrl = "https://localhost:44315/api/Pedidoes/ListarPedidoconproductoyproveedoresyfecha";
  const [data, setdata] = useState([]);

  const petiGET = async () => {
    await axios
      .get(baseUrl)
      .then((resp) => {
        setdata(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    petiGET();
  }, []);

  var nrofilas = data.length;

  return (
    <Fragment>
      <h1 className='text-center'>LISTADO DE LAS FACTURAS</h1>
      <button className='btn btn-danger' onClick={()=>cerrarSesion()}>CERRAR SESION</button>{"   "}
      <br/>
      <div>
        <h5 className="text-primary">Cantidad de Facturas Emitidas: {nrofilas}</h5>
      </div>
      <br />
      <table className="table table-bordered table- table-striped">
        <thead>
          <tr>
            <th>Cod Factura</th>
            <th>Fecha de Emision</th>
            <th>Nombre de Producto</th>
            <th>Cantidad de Pedido</th>
            <th>Precio Producto</th>
            <th>Subtotal</th>
            <th>Igv</th>
            <th>Monto Final</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {data.map((ordenes) => (
            <tr key={ordenes.codFactura}>
              <td>{ordenes.codFactura}</td>
              <td>{ordenes.fechaEmision}</td>
              <td>{ordenes.nomprod}</td>
              <td>{ordenes.cantpedido}</td>
              <td>{ordenes.precioprod}</td>
              <td>{ordenes.subtotal}</td>
              <td>{ordenes.igv}</td>
              <td>{ordenes.totalfactura}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Fragment>

  )
}

export default Registrofactura