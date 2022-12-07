import React,{Fragment,useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const Consultaporidioma = () => {
    const {xidioma}=useParams();
    const[idiomas,setidiomas]=useState([]);
    useEffect(()=>{//aqui abajo del api , tengo que colocar el api con parametro del codigo de producto
        axios.get("http://localhost:8080/paisesPorlenguaje/"+xidioma).then(resp=>{
          setidiomas(resp.data);
        }).catch(error=>{
          console.log(error);
        })
      },[xidioma]) 
      var nrofilas=idiomas.length;
  return (
      
    <Fragment>
        <h2>LISTADO DE PAISES POR IDIOMA</h2>
        <h3 className='text-success'>IDIOMA SELECCIONADO = {xidioma}</h3>
        <h4 className='text-primary'>Cantidad de la Consulta: {nrofilas}</h4>
         <br/>
         <table className='table table-bordered table- table-striped'>

        <thead>
          <tr>
          <th>Nombre</th>
          <th>Capital</th>
          <th>Area</th>
          <th>Mapa</th>
          </tr>
        </thead>
        <tbody className='text-start'>
          {idiomas.map(x=>(
            <tr key={x.name.common}>
            <td>{x.name.common}</td>
            <td>{x.capital}</td>
            <td>{x.area}</td>
            <td>{x.maps.googleMaps}</td>
         
        
          </tr>
          ))}
            
        </tbody>
       
        </table>
    </Fragment>
  )
}

export default Consultaporidioma