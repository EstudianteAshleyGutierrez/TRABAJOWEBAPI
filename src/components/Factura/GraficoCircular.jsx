import React,{Fragment,useEffect, useState} from 'react';
import axios from 'axios';
import {Pie} from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import 'chart.piecelabel.js';
import './css/grafico.css'
const GraficoCircular = ({xfech}) => {

    const [minutos, setMinutos]=useState([0]);
    const [paises, setPaises]=useState([0]); 
    
    const data={
        labels: paises,
        datasets:[{
        label: 'Cantidad',
        backgroundColor:['#DD60AF','#BE77FF','#FFAF60','#EAC100','#CAFFFF','#FFB5B5','#A6A600','#46A3FF','#FF0080','#BB5E00','#FFFF00','#00FFFF','#FFA500','#ADD8E6'],
        borderColor: "black",
        borderwidth:1,
        hoverBackgroundColor: 'rgba(0,255,0,0.2)',
        hoverBorderColor: 'blue',
        data: minutos
       }],
       
      

    };
    
    const opciones={
            maintainAspectRatio: false, 
            responsive: true
            ,
     
    }
    
    const peticionApi=async()=>{
        await axios.get("https://localhost:44315/api/Pedidoes/ListarPedidoporFactura/"+xfech)
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
    <br/>
    <h2 className='subtitulo'><b>PEDIDO REALIZADOS</b></h2>
    
     <Pie data={data} options={opciones}/>
    </div>
  )
}

export default GraficoCircular