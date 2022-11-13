import React from 'react'

const CampoEstado = ({cambiarEstadoProducto, Estado, IdProducto}) => {
  return (
    <td>
        <input type="checkbox" className='form-check-input mx-3' style={{verticalAlign: "middle"}} 
        defaultChecked={Estado == "NO DISPONIBLE" ? false : true} onChange={e => {cambiarEstadoProducto(e,IdProducto)}}/>
    </td>
  )
}

export default CampoEstado