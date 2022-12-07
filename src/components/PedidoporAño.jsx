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
        <h5 className='titulosistema text-dark'>Numero de Pedidos: {nrofilas}</h5>
        <br/>
        <table className='table table-bordered table-hover'>
        <thead className='table-dark'>
            <tr className='text-light titulosistema'>
            <th className="text-center">CODIGO PEDIDO</th>
            <th className="text-center">FECHA PEDIDO</th>
            <th className="text-center">FECHA ENTREGA</th>
            <th className="text-center">AÑO</th>
            <th className="text-center">CODIGO FACTURA</th>
            <th className="text-center">FECHA EMISION FACTURA</th>
            </tr>
          </thead>
          <tbody className='text-start'>
            {pedidosporanio.map(pedidos=>(
              <tr key={pedidos.xcodPedido}>
              <td className="text-center">{pedidos.xcodPedido}</td>
              <td className="text-center">{pedidos.fechapedido}</td>
              <td className="text-center">{pedidos.fechaentrega}</td>
              <td className="text-center">{pedidos.añopedido}</td>
              <td className="text-center">{pedidos.idfactura}</td>
              <td className="text-center">
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