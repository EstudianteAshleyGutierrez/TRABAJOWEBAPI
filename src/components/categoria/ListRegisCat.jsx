import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ConsultaCategoria from './ConsultaCategoria'
import RegistroCategoria from './RegistroCategoria'

const ListRegisCat = () => {

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
        <h1 className='text-center'>Registro y Consulta de Categoria</h1>
        <br/>
        <div className='container'>
            <RegistroCategoria setEstadoPagina={setEstadoPagina} estadoPagina={estadoPagina}/>
            <ConsultaCategoria listaCategorias={listaCategorias} setEstadoPagina={setEstadoPagina} estadoPagina={estadoPagina}/>
        </div>
    </>
  )
}

export default ListRegisCat