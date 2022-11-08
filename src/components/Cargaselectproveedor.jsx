import React,{Fragment,useEffect,useState} from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Pedidoporproveedor from './Pedidoporproveedor'
const Cargaselectproveedor = () => {

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
  
  const[proveedores,setproveedores]=useState([]);
  useEffect(()=>{
    axios.get("https://localhost:44315/api/BDTambo").then(resp=>{
      setproveedores(resp.data);
      console.log(resp);
    
    }).catch(error=>{
      console.log(error);
    },[])


  })

  const[proveedor,setproveedor]=useState(0);
  function recuperarproveedor(e){
    setproveedor(e.target.value); 
  }

  return (
   
<div className='text-center'>
    <div className='form-group'>
      <h1>LISTADO DE PEDIDO POR PROVEEDOR</h1>
      <h4><b>Seleccione un Proveedor: </b></h4>
      <select name='cboproveedor' className='form-control' value={proveedor}
      onChange={(e)=>recuperarproveedor(e)}>
        <option value='Seleccionar'>Seleccione proveedor</option>
        {
         proveedores.map(item =>(
         <option key={proveedor.idProveedor} value={item.idProveedor}>
                 {item.nombreProveedor}
          </option>
          ))
        }

      </select>
    </div>
      <br/>
      <br/>
        
        <button className='btn btn-danger' onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
        <br />
      <hr/>
      <Fragment>
        <Pedidoporproveedor idprove={proveedor}/>
      </Fragment>
 
     
   </div>

  )
}

export default Cargaselectproveedor