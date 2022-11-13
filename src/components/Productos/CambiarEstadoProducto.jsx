import axios from 'axios'
import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const CambiarEstadoProducto = ({idProducto}) => {

    /*const cambiarEstadoProducto = () => {
        await axios.get()
    }*/

  return (
    <>
        <Modal>
            <ModalHeader>
                Cambio de estado de mi producto
            </ModalHeader>
            <ModalBody>
                ¿Desea cambiar el estado actual del producto?
            </ModalBody>
            <ModalFooter>
                <button></button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default CambiarEstadoProducto