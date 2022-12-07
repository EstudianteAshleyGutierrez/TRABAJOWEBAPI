import React,{Fragment,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Menu.css';
import Cookies from 'universal-cookie';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cargaselectproveedor from '../components/Cargaselectproveedor'; 
import Cargarporaño from '../components/Cargarporaño';
import DtPedidoFactura from '../components/DtPedidoFactura';
import ListRegisProve from '../components/ListRegisProve';
import Registropedido from '../components/Registropedido';
import Registrofactura from '../components/Registrofactura';
import Registroproducto from '../components/Registroproducto';
import Consultaproducto from '../components/Consultaproducto';
function Menu (){

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

  return (
    <Fragment>
       <Router>
     <div className='container mt-5'>
        <div className='btn-group p-5'>
          <Link to="/Cargaselectproveedor" className='btn botoncito'>Consulta Pedido por Proveedor</Link>
          <Link to="/PedidoporAño" className='btn botoncito'>Pedido por el Año Pedido</Link>
          <Link to="/RegistrarProveedor" className='btn botoncito'>Consulta Y Registro Proveedor</Link>
          <Link to="/RegistrarFactura" className='btn botoncito'>Registro de Factura</Link>
          <Link to="/RegistrarPedido" className='btn botoncito'>Registro de Pedido</Link>
          <Link to="/RegistrarProducto" className='btn botoncito'>Registro de Producto</Link>
          <Link to="/Consultaproducto" className='btn botoncito'>Consulta de Producto</Link>
        </div>
        <hr/>
        <Routes>
          <Route path='/Cargaselectproveedor' element={<Cargaselectproveedor/>}></Route>
          <Route path='/PedidoporAño' element={<Cargarporaño/>}></Route>
          <Route path='/DtPedidoFactura/:xfecha' element={<DtPedidoFactura/>}/>
          <Route path='/RegistrarProveedor' element={<ListRegisProve/>}></Route>
          <Route path='/RegistrarFactura' element={<Registrofactura/>}></Route>
          <Route path='/RegistrarPedido' element={<Registropedido/>}></Route>
          <Route path='/RegistrarProducto' element={<Registroproducto/>}></Route>
          <Route path='/Consultaproducto' element={<Consultaproducto/>}></Route>
        </Routes>

     </div>
     </Router>
    <div className='containerMenu'>
    <br/>
    <button className='btn btn-danger' onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
    <br />
    <h1>Bienvenidos al sistema</h1>
    <h2>Usuario: {cookies.get('nombre')}, {cookies.get('apellido_paterno')}</h2>
  </div>
    </Fragment>

  )
}

export default Menu