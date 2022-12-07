import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GraficoCircular from '../Factura/GraficoCircular';
const DtPedidoFactura = () => {

  let navigate = useNavigate(); 
  const Retroceder=()=>{
    navigate('/PedidoporAño');
  }
    const {xfecha}=useParams();
    const[pedidos,setpedidos]=useState([]);
    useEffect(()=>{//aqui abajo del api , tengo que colocar el api con parametro del codigo de producto
        axios.get("https://localhost:44315/api/Pedidoes/ListarPedidoporFactura/"+xfecha).then(resp=>{
          setpedidos(resp.data);
        }).catch(error=>{
          console.log(error);
        })
      },[xfecha]) 

      var nrofilas=pedidos.length;


  return (
   <Fragment>
       <h2>LISTADO DE FACTURAS DE LOS PEDIDOS REALIZADOS</h2>
        <div>Fecha de Emision de factura: {xfecha}</div>
         <h4>Cantidad de Pedidos: {nrofilas}</h4>
         <br/>
        
        <button className='btn btn-danger' onClick={()=>Retroceder()}>REGRESAR</button>
         <br />
         <br />
         <table className='table table-bordered table- table-striped'>

        <thead>
          <tr>
          <th>Nombre Producto</th>
          <th>Imagen</th>
          <th>Cantidad Producto</th>
          <th>Precio Producto</th>
          <th>Nombre Proveedor</th>
          <th>Monto Total</th>
          </tr>
        </thead>
        <tbody className='text-start'>
          {pedidos.map(x=>(
            <tr key={x.nomprod}>
            <td>{x.nomprod}</td>
            <td>
              <img src={x.img} alt={x.img} width={"110px"} height={"110px"}/>
            </td>
            <td>{x.cantpedido}</td>
            <td>{x.precioprod}</td>
            <td>{x.nomprove}</td>
            <td>{x.totalfactura}</td>
        
          </tr>
          ))}
            
        </tbody>
       
        </table>
        <GraficoCircular
         xfech={xfecha}
        />
   </Fragment>
  )
}

export default DtPedidoFactura