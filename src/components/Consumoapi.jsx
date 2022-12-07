import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Consumoapi = () => {
  const baseUrl="https://restcountries.com/v2/all";


    const [data,setdata]=useState([]);//inicia el arreglo vacio 
    const[tablaprovee, settablaProvee]= useState([]);
    const[busqueda,setBusqueda]=useState([""]);

    const petiGET=async()=>{
 
      await axios.get(baseUrl).then(resp=>{
          setdata(resp.data);
          settablaProvee(resp.data);
          
        }).catch(error=>{
          console.log(error);
        })
  }
  useEffect(()=>{
    petiGET();
},[])

const handlebusqueda=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}

const filtrar = (terminoBusqueda)=>{
  var resultadosbusqueda=tablaprovee.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
          return elemento; 
      }
  }); 
  setdata(resultadosbusqueda);
}



var nrofilas=data.length
  return (
    <div>
      <h4>Buscar Pais : </h4>
            <div className='containerInput'>
                
                <input className='form-control inputbuscar w-50 ' value={busqueda} id="busqueda"
                onChange={handlebusqueda}
                placeholder="Ingrese el nombre del pais .." />
              
                    
            </div>
            <br/>
       <div>
              <h5 className='text-primary'>Cantidad de Paises: {nrofilas}</h5>
            </div>
       <br/>
        <table className='table table-bordered table- table-striped'>
        <thead>
            <tr>
            <th>Nombre Pais</th>
            <th>Capital</th>
            <th>Continente</th>
            <th>SubRegion</th>
            <th>Populacion</th>
            <th>Lenguaje</th>
            <th>Acciones</th>
            </tr>
          </thead>
          <tbody className='text-start'>
            {data.map(paises=>(
            <tr key={paises.name}>
              <td>{paises.name}</td>
              <td>{paises.capital}</td>
              <td>{paises.region}</td>
              <td>{paises.subregion}</td>
              <td>{paises.population}</td>
              <td>
                <Link to={`/Dtidiomas/${paises.languages[0].name}`}>
                {paises.languages[0].name}
                </Link>
                </td>
              <td>
                  <button className='btn btn-warning'>EDITAR</button>{" | "}
                  <button className='btn btn-danger'>ELIMINAR</button>
              </td>
            </tr>
            ))}
              
          </tbody>
        </table>
    </div>
  )
}

export default Consumoapi