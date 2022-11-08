import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const PedidoporAño = ({xanios}) => {

    const[pedidosporanio,setpedidosporanio]=useState([]);
    useEffect(()=>{
        axios.get('https://localhost:44315/api/BDTambo/ ListarPedidoporAño/'+
                  xanios).then(resp=>{
          setpedidosporanio(resp.data);
          
        }).catch(error=>{
          console.log(error);
        })
    },[xanios])

      var nrofilas=pedidosporanio.length
  return (
    <Fragment>
        <div>
        <h2>Listado de Pedidos por Año</h2>
        <h4>Numero de Pedidos: {nrofilas}</h4>
        <table className='table table-bordered table- table-striped'>
        <thead>
            <tr>
            <th>Id Pedido</th>
            <th>Fecha Pedido</th>
            <th>Fecha Entrega</th>
            <th>Año</th>
            <th>Id Factura</th>
            <th>Fecha Emision factura</th>
            </tr>
          </thead>
          <tbody className='text-start'>
            {pedidosporanio.map(pedidos=>(
              <tr key={pedidos.xcodPedido}>
              <td>{pedidos.xcodPedido}</td>
              <td>{pedidos.fechapedido}</td>
              <td>{pedidos.fechaentrega}</td>
              <td>{pedidos.añopedido}</td>
              <td>{pedidos.idfactura}</td>
              <td>
                <Link to={`/DtPedidoFactura/${pedidos.fechaEmision}`} >
                {pedidos.fechaEmision}
                </Link>
              </td>
            </tr>
            ))}
              
          </tbody>

        </table>
        </div>
    </Fragment>
  )
}

export default PedidoporAño