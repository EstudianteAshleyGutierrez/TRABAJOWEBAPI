import React,{Fragment,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Menu.css';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
//import Cargaselectproveedor from './Proveedor/Cargaselectproveedor'; 

function Menu(){

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

  return(
    <Fragment>
        <div className='containerMenu'>
        <br/>
        <button className='btn botoncito' onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
        <br />
        <br />
        <div className='card bg-dark'>
        <br />
        <br />
          <h1 className='sub'><b>BIENVENIDO !!</b></h1>
          <h3 className='sub'><b>AHORA TIENES ACCESO AL SISTEMA DE COMPRAS DE TAMBO</b></h3>
          <br/>
          <h2 className='sub'>Usuario: {cookies.get('nombre')}, {cookies.get('apellido_paterno')}</h2>
          <br />
          <br />
        </div>
      </div>
    </Fragment>
     
   
  )









}

export default Menu;
