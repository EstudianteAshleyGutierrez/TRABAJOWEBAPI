import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import '../css/Login.css';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function Login(props){

    const baseUrl="https://localhost:44322/api/usuarios"; 
    let navigate = useNavigate();
    const cookies = new Cookies(); 

    
    const [form, setForm]=useState({
        username: '',
        password: ''
    });

    const handleChange=e=>{
        const {name,value} = e.target; 
        setForm({
            ...form,
            [name]:value
        }); 
        
    }

    const iniciarSesion=async()=>{
        await axios.get(baseUrl+"/"+form.username+"/"+md5(form.password))
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0]; 
                cookies.set('id', respuesta.id, {path: '/'});
                cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: '/'});
                cookies.set('apellido_materno', respuesta.apellido_materno, {path: '/'});
                cookies.set('nombre', respuesta.nombre, {path: '/'});
                cookies.set('correo', respuesta.correo, {path: '/'});
                cookies.set('username', respuesta.username, {path: '/'});
                cookies.set('password', respuesta.password, {path: '/'});
                alert("Bienvenido: "+respuesta.nombre+" "+respuesta.apellido_paterno);
                navigate('/Menu');
            }else{
               alert('El usuario o la contraseña no son correctas'); 
            }
            
        })
        .catch(error=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        if(cookies.get('id')){
            navigate('/Menu');
        }

    },[]);

    return(
        <div className='containerPrincipal'>
            <div className='containerLogin'>
                <div className='form-group'>
                    <h1 className='titulosistema'>LOGIN</h1>
                    <h5 className='sub-titulo'>ACCEDE AL SISTEMA</h5>
                    <br/>
                    <label className='sub'>Usuario: </label>
                    <br/>
                    <input type="text"
                    className='form-control'
                    name='username'
                    onChange={handleChange}
                    />
                    <br/>
                    <label className='sub'>Contraseña: </label>
                    <br/>
                    <input type="password"
                    className='form-control'
                    name='password'
                    onChange={handleChange}
                    />
                    <br/>
                    <button className='btn botoncito form-control' onClick={()=>iniciarSesion()}>INICIAR SESION</button>
                </div>
            </div>

        </div>
    );
}


export default Login;