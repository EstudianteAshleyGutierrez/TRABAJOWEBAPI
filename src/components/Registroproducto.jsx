import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader, NavItem} from 'reactstrap';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Registroproducto = () => {
  // CERRAR SESION NO TOCAR
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

  //AQUI COMENZAR A PROGAMAR O INSTANCIAR 







  
  return (
    <Fragment>
        <h2 className='text-center'>REGISTRO DE PRODUCTO</h2>
        <br/>
        <button className='btn btn-danger' onClick={()=>cerrarSesion()}>CERRAR SESION</button>{"   "}
    </Fragment>
  )
}

export default Registroproducto