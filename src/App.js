import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment}  from 'react';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Inicio from './components/Inicio'; 
import Login from './components/Login'; 
import Menu from './components/Menu'; 
import Cargaselectproveedor from './components/Cargaselectproveedor'; 
import Cargarporaño from './components/Cargarporaño';
import DtPedidoFactura from './components/DtPedidoFactura';
import ListRegisProve from './components/ListRegisProve';
import Registropedido from './components/Registropedido';
import Registrofactura from './components/Registrofactura';
import Registroproducto from './components/Registroproducto';
import Consultaproducto from './components/Consultaproducto';


function App() {
  return (
    <Fragment>
     <Router>
     <div className='container mt-5'>
        <div className='btn-group p-5'>
          <Link to="/Cargaselectproveedor" className='btn btn-info'>Consulta Pedido por Proveedor</Link>
          <Link to="/PedidoporAño" className='btn btn-info'>Pedido por el Año Pedido</Link>
          <Link to="/RegistrarProveedor" className='btn btn-info'>Consulta Y Registro Proveedor</Link>
          <Link to="/RegistrarFactura" className='btn btn-info'>Registro de Factura</Link>
          <Link to="/RegistrarPedido" className='btn btn-info'>Registro de Pedido</Link>
          <Link to="/RegistrarProducto" className='btn btn-info'>Registro de Producto</Link>
          <Link to="/Consultaproducto" className='btn btn-info'>Consulta de Producto</Link>
        </div>
        <hr/>
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route path='/Menu' element={<Menu/>}></Route>
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
   </Fragment>
  );
}

export default App;