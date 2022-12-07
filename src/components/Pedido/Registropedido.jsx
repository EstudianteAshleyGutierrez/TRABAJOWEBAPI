import React,{Fragment,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Registropedido = () => {
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

  const baseUrl="https://localhost:44315/api/Pedidoes";
  const [data,setdata]=useState([]);

  const[modalInsertar,setmodalInsertar]=useState(false);
  const[modalEditar,setmodalEditar]=useState(false);
  const[modalEliminar,setmodalEliminar]=useState(false);

  const [gestorSeleccionado,setGestorSeleccionado]=useState({
    idPedido:'',
    fechaPedido:'',
    fechaEntrega:'',
    idProveedor:'',
   
})

const handlechange = (e) =>{
  const{name,value}=e.target;
  setGestorSeleccionado({
    ...gestorSeleccionado,
    [name]:value
  });
  console.log(gestorSeleccionado);
}

   //Constantes para abrir y cerrar los modales
   const abrircerrarModalInsertar=() =>{
    setmodalInsertar(!modalInsertar);
  }

  const abrircerrarModalEditar=()=>{
    setmodalEditar(!modalEditar);
  }
  const abrircerrarModalEliminar=()=>{
    setmodalEliminar(!modalEliminar);
  }

  const seleccionarGestor=(ordenes,caso)=>{
    setGestorSeleccionado(ordenes);
    (caso==="Editar")?
    abrircerrarModalEditar(): abrircerrarModalEliminar();
  }

  const petiGET=async()=>{
    await axios.get(baseUrl).then(resp=>{
        setdata(resp.data);
       
      }).catch(error=>{
        console.log(error);
      })
}


const petiPost=async()=>{
  delete gestorSeleccionado.idPedido;
  await axios.post(baseUrl,gestorSeleccionado).then(resp=>{
      setdata(data.concat(resp.data));
      abrircerrarModalInsertar();
      
    }).catch(error=>{
      console.log(error);
    })
    alert('El nuevo Pedido ha sido registrado exitosamente')

}

const petiPUT=async()=>{
  await axios.put(baseUrl+"/"+gestorSeleccionado.idPedido,gestorSeleccionado).then(resp=>{
      var respuesta = resp.data; 
      var dataAuxiliar=data;
      dataAuxiliar.map(ordenes=>{
          if(ordenes.idPedido===gestorSeleccionado.idPedido){
            ordenes.fechaPedido=respuesta.fechaPedido; 
            ordenes.fechaEntrega=respuesta.fechaEntrega; 
            ordenes.idProveedor=respuesta.idProveedor; 
            
          }
      });
      abrircerrarModalEditar();
      
      alert('Los datos del pedido Nº: '+ gestorSeleccionado.idPedido+' fueron actualizados correctamente')
      
    }).catch(error=>{
      console.log(error);
    })
}



//Cargar el combobox de proveedor
const[proveedores,setproveedores]=useState([]);
  const EspecialidadesGET=async() =>{
    await axios.get("https://localhost:44315/api/BDTambo")
    .then(resp=>{
      setproveedores(resp.data);
    }).catch(error=>{console.log(error)})
  }



useEffect(()=>{
    petiGET();
    EspecialidadesGET();
},[])


var nrofilas=data.length
  return (
    <Fragment>
      
        <h1 className='text-center titulosistema'><b>REGISTRO DE PEDIDOS</b></h1>
        <br/>
       <br/>
        <button className="btn botoncito " onClick={()=>abrircerrarModalInsertar()}>NUEVO PEDIDO</button>{"   "}
        <button className='btn btn-danger text-light titulosistema' onClick={()=>cerrarSesion()}>CERRAR SESION</button>{"   "}
      <br/>
      <br/>
      <div>
              <h5 className='text-dark titulosistema'>Cantidad de Pedidos: {nrofilas}</h5>
      </div>
       <br/>
       <table className='table table-bordered table- table-hover'>
        <thead className='text-center text-light titulosistema table-dark'>
            <tr>
            <th>Id Pedido</th>
            <th>Fecha Pedido</th>
            <th>Fecha Entrega</th>
            <th>Id Proveedor</th>
            <th>Acciones</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {data.map(ordenes=>(
            <tr key={ordenes.idPedido}>
              <td c>{ordenes.idPedido}</td>
              <td>{ordenes.fechaPedido}</td>
              <td>{ordenes.fechaEntrega}</td>
              <td>{ordenes.idProveedor}</td>
           
              <td>
                  <button className='btn botoncito' onClick={()=>seleccionarGestor(ordenes,"Editar")} >EDITAR</button>{"  "}
              </td>
            </tr>
            ))}
              
          </tbody>
        </table>
            

        <Modal isOpen={modalInsertar}>
                <ModalHeader>Registrar Pedido</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                      <label>Fecha Pedido:</label>
                      <input type="date" className="form-control" name="fechaPedido" onChange={handlechange}/><br/>
                      <br/>
                      <label>Fecha de Entrega:</label>
                      <input type="date" className="form-control" name="fechaEntrega" onChange={handlechange}/>
                      <br/>
                      <label>Proveedor:</label>
                      <select name="idProveedor" className="form-control" onChange={handlechange}>
                          {proveedores.map(prove =>(
                              <option key={prove.idProveedor} value={prove.idProveedor}>
                                  {prove.nombreProveedor}
                              </option>
                          ))}
                      </select>
                      <br/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-info" onClick={()=>petiPost()}>Registrar Pedido</button>{" |"}
                    <button className="btn btn-danger" onClick={()=>abrircerrarModalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Pedido</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                    <label>IdPedido:</label>
                      <input type="text" className="form-control" name="idPedido" value={gestorSeleccionado && gestorSeleccionado.idPedido} readOnly/>
                      <label>Fecha de Pedido:</label>
                      <input type="text" className="form-control" name="fechaPedido" onChange={handlechange}  value={gestorSeleccionado && gestorSeleccionado.fechaPedido} /><br/>
                      <label>Fecha de Entrega:</label>
                      <input type="text" className="form-control" name="fechaEntrega" onChange={handlechange}  value={gestorSeleccionado && gestorSeleccionado.fechaEntrega}/><br/>
                      <br/>
                      <label>Proveedor:</label>
                      <select name="idProveedor" className="form-control"
                           defaultValue={gestorSeleccionado.idProveedor} onChange={handlechange}>
                             {proveedores.map(proves =>(
                            <option key={proves.idProveedor} value={proves.idProveedor}>
                                   {proves.nombreProveedor}
                             </option>
                             ))}
                        </select>
                      <br/>
                     
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-info" onClick={()=>petiPUT()}>Actualizar Dato del Pedido</button>{" |"}
                    <button className="btn btn-danger" onClick={()=>abrircerrarModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>




    </Fragment>
  )
}

export default Registropedido