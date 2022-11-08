import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Pedidoporproveedor = ({idprove}) => {
  const[consulpedido,setconsulpedido]=useState([]);
  useEffect(()=>{//aqui abajo del api , tengo que colocar el api con parametro del codigo de producto
    axios.get("https://localhost:44315/api/BDTambo/ListarPedidoporProveedor/"+idprove).then(resp=>{
      setconsulpedido(resp.data);
    }).catch(error=>{
      console.log(error);
    })
  },[idprove]) 

  var sumacantidad=0;
  var cantotal=0;

  consulpedido.map(c=>{
    cantotal+=c.cantidadpedido
  });

  consulpedido.map(item=>{
    sumacantidad+=item.montototal
  });

  var nrofilas=consulpedido.length;
 
  return (
   <Fragment>
      <h4 className='text-primary' >Cantidad Total: {nrofilas}</h4>
      <table className='table table-bordered table- table-striped'>
    <thead>
      <tr>
      <th>Cod Pedido</th>
      <th>Nombre Proveedor</th>
      <th>Cantidad de Pedido</th>
      <th>Fecha Pedido</th>
      <th>Fecha Entrega</th>
      <th>Monto Total</th>
      
      </tr>
    </thead>
    <tbody className='text-start'>
      {consulpedido.map(x =>(
        <tr key={x.codpedido}>
        <td>{x.codpedido}</td>
        <td>{x.nomproveedor}</td>
        <td>{x.cantidadpedido}</td>
        <td>{x.fechaPedido}</td>
        <td>{x.fechaentrega}</td>
        <td>{x.montototal}</td>
      </tr>
      ))}
        
    </tbody>
    <br/>
    <h4><b>Cantidad Total de los Pedidos: {cantotal}</b></h4>
    <h4><b>Suma Total de los Pedidos: {sumacantidad}</b></h4>
    </table>
   </Fragment>
  )
}

export default Pedidoporproveedor