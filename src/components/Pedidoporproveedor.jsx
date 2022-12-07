import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
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
      <h5 className='text-dark titulosistema' >Cantidad Total: {nrofilas}</h5>
      <br/>
      <table className="table table-bordered table-hover">
    <thead className="table-dark">
      <tr className='text-light titulosistema'>
      <th className="text-center">CODIGO PEDIDO</th>
      <th className="text-center">NOMBRE PROVEEDOR</th>
      <th className="text-center">CANTIDAD</th>
      <th className="text-center">FECHA PEDIDO</th>
      <th className="text-center">FECHA ENTREGA</th>
      <th className="text-center">MONTO TOTAL</th>
      
      </tr>
    </thead>
    <tbody className='text-start'>
      {consulpedido.map(x =>(
        <tr key={x.codpedido}>
        <td className="text-center">{x.codpedido}</td>
        <td className="text-center">{x.nomproveedor}</td>
        <td className="text-center">{x.cantidadpedido}</td>
        <td className="text-center">{x.fechaPedido}</td>
        <td className="text-center">{x.fechaentrega}</td>
        <td className="text-center">{x.montototal}</td>
      </tr>
      ))}
        
    </tbody>
    <br/>
    <br/>

    <div className='card bg-dark'>
      <br/>
      <h5 className='text-light titulosistema text-right'>Cantidad Total de los Pedidos : {cantotal}</h5>
      <h5 className='text-light titulosistema text-right'>Suma Total de los Pedidos     : {sumacantidad}</h5>
      <br/>
    </div>
    <br/>

    </table>
   </Fragment>
  )
}

export default Pedidoporproveedor