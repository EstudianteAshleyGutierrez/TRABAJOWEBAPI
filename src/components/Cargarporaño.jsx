import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import PedidoporAño from './PedidoporAño';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Cargarporaño = () => {
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
    const[anios,setanios]=useState([]);
    useEffect(()=>{
        axios.get("https://localhost:44315/api/BDTambo/AñoPedidos").then(resp=>{
          setanios(resp.data);
        }).catch(error=>{
            console.log(error);
        },[])
    })
    
    const[anio,setanio]=useState("");
      function recuperaranio(e){
        setanio(e.target.value);  
    }

  return (
    <Fragment>
    <div className='text-center'>
        <div className='form-group'>
        <h1>Consulta de Pedidos por Año</h1>
            <div>
            <h4><b>Seleccione Año de Pedido</b></h4>
            <select name='cboanio' className='form-control' value={anio}
              onChange={(e)=>recuperaranio(e)}>
              <option value='seleccionar'>Seleccionar Año</option>
              {
                anios.map(item=>(
                  <option key={item.año} value={item.año}>
                        {item.año}
                  </option>
                ))
              }

            </select>
            </div>
            <br/>
              <button className='btn btn-danger' onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
            <br />
          <hr/>
          <div>
              <PedidoporAño
                xanios={anio}
              />
          </div>     
        </div>

    </div>
</Fragment>
  )
}

export default Cargarporaño