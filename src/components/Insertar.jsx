import React from 'react'
import {Modal,ModalBody,ModalFooter,ModalHeader, NavItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Insertar = ({modalInsertar,abrircerrarModalInsertar,
    handlechange,solicitudPOST}) => {
  return (
    <div>
        <Modal isOpen={modalInsertar}>
                <ModalHeader>Registrar Proveedor</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                      <label>Codigo:</label><br/>
                      <input type="text" className="form-control" 
                      name="idProveedor" onChange={handlechange} readOnly/><br/>
                      <label>Nombre:</label>
                      <input type="text" className="form-control" name="nombreProveedor" onChange={handlechange}/><br/>
                      <label>Direccion:</label>
                      <input type="text" className="form-control" name="direccion" onChange={handlechange}/><br/>
                      <br/>
                      <label>Telefono:</label>
                      <input type="text" className="form-control" name="telefono" onChange={handlechange}/>
                      <br/>
                      <label>Email:</label>
                      <input type="text" className="form-control" name="email" onChange={handlechange}/>
                      <br/>
                      <label>Estado :</label>
                      <input type="checkbox"  name="estado" onChange={handlechange}/>
                      <br/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-info" onClick={solicitudPOST}>Registrar</button>{" |"}
                    <button className="btn btn-danger" onClick={()=>abrircerrarModalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>
    </div>
  )
}

export default Insertar