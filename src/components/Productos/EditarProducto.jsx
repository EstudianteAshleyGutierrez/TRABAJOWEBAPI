import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const EditarProducto = ({ activarEdicion, funcionCerrarEdicion, producto, setProductoEditar, setEstadoPagina, estadoPagina }) => {

    const [listaCategoria, setListaCategoria] = useState([]);
    const [imagenProducto, setImagenProducto] = useState(null);

    const handleChange = (e) => {
        setProductoEditar({
          ...producto,
          [e.target.name]: e.target.value
        })
    }

    const handleChangeImg = (e) => {
      setImagenProducto(e.target.files[0])
    }

    const listarCategorias = async () => {
        const lista = await axios.get("http://localhost:4000/categoria");
        setListaCategoria(lista.data);
    }

    const editarProducto = async () => {

      const res = await axios.put("http://localhost:4000/producto/updateProduct/"+producto.IdProducto, producto);
      console.log(res);
      //console.log(imagenProducto);
      if (imagenProducto != null){
        const imgP = await axios.patch("http://localhost:4000/producto/updateProductImage/"+producto.IdProducto, {
          "ProductImage": imagenProducto
        },{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(imgP);
        setImagenProducto(null);
      }

      setEstadoPagina(!estadoPagina)
      funcionCerrarEdicion();
    }

    useEffect(() => {
        listarCategorias();
    }, [])

  return (
    <>
      <Modal isOpen={activarEdicion}>
        <ModalHeader className="bg-dark text-light titulosistema">EDITAR LA PRODUCTO CON EL CODIGO : {producto.IdProducto || ""}</ModalHeader>
        <ModalBody>
          <img className="figure-img mt-2 d-block mx-auto" src={producto.ImagenProducto || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} alt="" width={"150px"} height={"150px"}/><br/>
          <label className='form-text'>Nombre del producto: </label>
          <input value={producto.NombreProducto || ""} name='NombreProducto' className='form-control mt-2' type="text" placeholder='Ingrese el nombre del producto' onChange={handleChange}/>
          <label className='form-text mt-3'>Descripción del producto: </label>
          <input value={producto.descripcion || ""} name='descripcion' className='form-control mt-2' type="text" placeholder='Ingrese una descripción para el producto' onChange={handleChange}/>
          <label className='form-text mt-3'>Categoria del producto: </label>
          <select defaultValue={producto.IdCategoria} name='IdCategoria' className='form-select mt-2' placeholder='Seleccione una categoria' onChange={handleChange}>
            <option value={"DEFAULT"}>Seleccione una opción</option>
            {
              listaCategoria.map(ctg => (
                <option key={ctg.IdCategoria} value={ctg.IdCategoria}>{ctg.CategoriaName}</option>
              ))
            }
          </select>
          <label className='form-text mt-3'>Imagen del producto:<br/>
          </label>
          <input name="ProductImage" onChange={handleChangeImg} className='form-control mt-2' type="file"/>
        </ModalBody>
        <ModalFooter>
          <button className="btn botoncito" 
          onClick={editarProducto}
          >
            Editar
          </button>
          {" | "}
          <button className="btn btn-danger text-light titulosistema" onClick={funcionCerrarEdicion}>
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditarProducto;
