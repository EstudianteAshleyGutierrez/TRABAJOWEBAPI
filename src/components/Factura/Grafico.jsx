import React,{Fragment,useEffect, useState} from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";



function Grafico () {


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
  }, []);
  
const [minutos, setMinutos]=useState([0]);
const [paises, setPaises]=useState([0]); 


const data={
    labels: paises,
    datasets:[{
    label: 'Cantidad',
    backgroundColor:['#FF00FF','	#FFA500','#8CEA00','#A52A2A','	#FF0000','#00FFFF'],
    borderColor: "black",
    borderwidth:1,
    hoverBackgroundColor: 'rgba(0,255,0,0.2)',
    hoverBorderColor: 'blue',
    data: minutos
   }]
};

const opciones={
        maintainAspectRatio: false, 
        responsive: true
}

const peticionApi=async()=>{
    await axios.get('https://localhost:44315/api/Pedidoes/ListarPedidoconproductoyproveedoresyfecha')
   .then(response=>{
    var respuesta = response.data;
    var auxminutos=[], auxPaises=[];

    respuesta.map(elemento=>{
        auxminutos.push(elemento.cantpedido);
        auxPaises.push(elemento.nomprod); 
    });

    setMinutos(auxminutos); 
    setPaises(auxPaises);


   })
   }
   
   useEffect(()=>{
     peticionApi(); 
   },[])
   
  return (
    <div  style={{width: '100%', height: '500px'}}>
   <button className="btn btn-danger" onClick={() => cerrarSesion()}>
        CERRAR SESION
      </button>
 <br/>


 <br/>
   <h2>Cantidad de Productos que se recepcionaron en Factura</h2>
   <br/>
  
    <Bar data={data} options={opciones}/>
   </div>
  )
}

export default Grafico