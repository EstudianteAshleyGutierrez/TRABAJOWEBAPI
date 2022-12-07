import axios from 'axios';
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './css/Categoria.css'
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import ConsultaCategoria from './ConsultaCategoria'
import RegistroCategoria from './RegistroCategoria'
import {CSVLink} from 'react-csv';

const ListRegisCat = () => {
    const cookies = new Cookies();
    let navigate = useNavigate();
    const cerrarSesion = () => {
      cookies.remove("id", { path: "/" });
      cookies.remove("apellido_paterno", { path: "/" });
      cookies.remove("apellido_materno", { path: "/" });
      cookies.remove("nombre", { path: "/" });
      cookies.remove("correo", { path: "/" });
      cookies.remove("username", { path: "/" });
      cookies.remove("password", { path: "/" });
      navigate("/");
    };
  
    useEffect(() => {
      if (!cookies.get("id")) {
        navigate("/");
      }
    }, []); // eslint-di




    const [listaCategorias, setListaCategorias] = useState([]);
    const [estadoPagina, setEstadoPagina] = useState(true)

    useEffect(() => {
        const listarCategorias = async() => {
            const result = await axios.get("http://localhost:4000/categoria");
            setListaCategorias(result.data);
        }

        listarCategorias();
    }, [estadoPagina])

  return (
    <>
        <h1 className='text-center titulosistema mb-3'><b>REGISTRO Y CONSULTA DE CATEGORIA</b></h1>
        <CSVLink data={listaCategorias} className="btn botoncito titulosistema mb-3 mt-3 ">Export User Data</CSVLink>{ '    |    '}
        <button className="btn btn-danger text-light titulosistema mb-3 mt-3" onClick={() => cerrarSesion()}>
        Cerrar Sesion
      </button>
        <br/>
        <br/>

        <div className='container'>
            <RegistroCategoria setEstadoPagina={setEstadoPagina} estadoPagina={estadoPagina}/>
            <ConsultaCategoria listaCategorias={listaCategorias} setEstadoPagina={setEstadoPagina} estadoPagina={estadoPagina}/>
        </div>

        
    </>
  )
}

export default ListRegisCat