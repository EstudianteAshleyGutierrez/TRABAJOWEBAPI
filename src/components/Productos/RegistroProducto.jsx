import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const RegistroProducto = ({activarRegistro, funcionCerrarRegistro}) => {
  return (
    <>
      <Modal isOpen={activarRegistro}>
        <ModalHeader>
          Registro de Producto
        </ModalHeader>
        <ModalBody>
          <label className='form-text'>Nombre del producto: </label>
          <input className='form-control mt-2' type="text" placeholder='Ingrese el nombre del producto'/>
          <label className='form-text mt-3'>Precio del producto: </label>
          <input className='form-control mt-2' type="text" placeholder='Ingrese el nombre del producto'/>
          <label className='form-text mt-3'>Stock de producto: </label>
          <input className='form-control mt-2' type="text" placeholder='Ingrese el stock de producto'/>
          <label className='form-text mt-3'>Fecha de entrada: </label>
          <input className='form-control date mt-2' type="date" placeholder='Ingrese el nombre del producto'/>
          <label className='form-text mt-3'>Categoria del producto: </label>
          <select className='form-select mt-2' placeholder='Seleccione una categoria'>
            <option></option>
          </select>
          <label className='form-text mt-3'>Imagen del producto: </label>
          <input className='form-control mt-2' type="file" placeholder='Ingrese el nombre del producto'/>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success'>Registrar</button>
          {" | "}
          <button className='btn btn-danger' onClick={funcionCerrarRegistro}>Cerrar</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default RegistroProducto