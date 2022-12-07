import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment}  from 'react';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Login from './components/Login'; 
import Menu from './components/Menu'; 
import Cargaselectproveedor from './components/Proveedor/Cargaselectproveedor'; 
import Cargarporaño from './components/Cargarporaño';
import DtPedidoFactura from './components/Pedido/DtPedidoFactura';
import ListRegisProve from './components/Proveedor/ListRegisProve';
import Registropedido from './components/Pedido/Registropedido';
import Registrofactura from './components/Factura/Registrofactura';
import Registroproducto from './components/Productos/ListRegisProd';
//import Consultaproducto from './components/Productos/Consultaproducto';
 import ListRegisCat from './components/categoria/ListRegisCat';
import ListRegisDet from './components/detPedPro/ListRegisDet';
import Presentacion from './components/Factura/Presentacion';
import Grafico from './components/Factura/Grafico';
import Consumoapi from './components/Consumoapi';
import Consultaporidioma from  './components/Consultaporidioma';
function App() {
  return (
    <Fragment>
     <Router>
     <div className='container mt-5'>
        <div className='btn-group p-5'>
          <Link to="/Cargaselectproveedor" className='btn botoncito'>Consulta Pedido por Proveedor</Link>
          <Link to="/PedidoporAño" className='btn botoncito1'>Pedido por el Año Pedido</Link>
          <Link to="/RegistrarProveedor" className='btn botoncito'>Consulta Y Registro Proveedor</Link>
          <Link to="/RegistrarFactura" className='btn botoncito1'>Lista de Facturas</Link>
          <Link to="/RegistrarPedido" className='btn botoncito'>Registro de Pedido</Link>
          <Link to="/RegistrarProducto" className='btn botoncito1'>Consulta y Registro de Producto</Link>
          <Link to="/RegistrarCategoria" className='btn botoncito'>Consulta y Registro de Categoria</Link>
          <Link to="/RegistrarDetalle" className='btn botoncito1'>Consulta y Registro de Detalle</Link>
          <Link to="/Grafico" className='btn btn-warning text-dark titulosistema'>Grafico Estadistico de Facturas</Link>
          <Link to="/Presentacion" className='btn btn-danger text-light titulosistema'>TERMINOS Y CONDICIONES</Link>
          <Link to="/ConsultaPaises" className='btn botoncito1'>Consulta de Paises con api Publica</Link>
         
          {/* <Link to="/Consultaproducto" className='btn btn-info'>Consulta de Producto</Link> */}
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
          <Route path='/RegistrarCategoria' element={<ListRegisCat/>}></Route>
          <Route path='/RegistrarDetalle' element={<ListRegisDet/>}></Route>
          <Route path='/Presentacion' element={<Presentacion/>}></Route>
          <Route path='/Grafico' element={<Grafico/>}></Route>
          <Route path='/ConsultaPaises' element={<Consumoapi/>}></Route>
          <Route path='/Dtidiomas/:xidioma' element={<Consultaporidioma/>}/>
          {/* <Route path='/Consultaproducto' element={<Consultaproducto/>}></Route> */}
        </Routes>

     </div>
     </Router>
   </Fragment>
  );
}

export default App;
