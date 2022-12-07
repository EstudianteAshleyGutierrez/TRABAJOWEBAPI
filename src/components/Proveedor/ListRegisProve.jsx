import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/Proveedor.css'
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {CSVLink} from 'react-csv';




const ListRegisProve = () => {
  const cookies = new Cookies();
  let navigate = useNavigate();
  const cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("apellido_paterno", { path: "/" });
    cookies.remove("apellido_materno", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("correo", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("password", { path: "/" });
    navigate("/");
  };


  useEffect(() => {
    if (!cookies.get("id")) {
      navigate("/");
    }
  }, []);
  

  const baseUrl = "https://localhost:44315/api/BDTambo";
  const [data, setdata] = useState([]);
  const [tablaprovee, settablaProvee] = useState([]);
  const [busqueda, setBusqueda] = useState([""]);

  const [modalInsertar, setmodalInsertar] = useState(false);
  const [modalEditar, setmodalEditar] = useState(false);
  const [modalEliminar, setmodalEliminar] = useState(false);

  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idProveedor: "",
    nombreProveedor: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
    console.log(gestorSeleccionado);
  };

  const handlebusqueda = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadosbusqueda = tablaprovee.filter((elemento) => {
      if (
        elemento.nombreProveedor
          .toString()
          .toUpperCase()
          .includes(terminoBusqueda.toUpperCase())
      ) {
        return elemento;
      }
    });
    setdata(resultadosbusqueda);
  };

  //Constantes para abrir y cerrar los modales
  const abrircerrarModalInsertar = () => {
    setmodalInsertar(!modalInsertar);
  };

  const abrircerrarModalEditar = () => {
    setmodalEditar(!modalEditar);
  };
  const abrircerrarModalEliminar = () => {
    setmodalEliminar(!modalEliminar);
  };

  const petiGET = async () => {
    await axios
      .get(baseUrl)
      .then((resp) => {
        setdata(resp.data);
        settablaProvee(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const petiPost = async () => {
    delete gestorSeleccionado.idProveedor;
    gestorSeleccionado.telefono = parseInt(gestorSeleccionado.telefono);
    await axios
      .post(baseUrl, gestorSeleccionado)
      .then((resp) => {
        setdata(data.concat(resp.data));
        abrircerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
    alert("El nuevo Proveedor ha sido registrado exitosamente");
  };

  const petiPUT = async () => {
    gestorSeleccionado.telefono = parseInt(gestorSeleccionado.telefono);
    await axios
      .put(baseUrl + "/" + gestorSeleccionado.idProveedor, gestorSeleccionado)
      .then((resp) => {
        var respuesta = resp.data;
        var dataAuxiliar = data;
        dataAuxiliar.map((ordenes) => {
          if (ordenes.idProveedor === gestorSeleccionado.idProveedor) {
            ordenes.nombreProveedor = respuesta.nombreProveedor;
            ordenes.direccion = respuesta.direccion;
            ordenes.telefono = respuesta.telefono;
            ordenes.email = respuesta.email;
            ordenes.estado = respuesta.estado;
          }
        });
        abrircerrarModalEditar();

        alert(
          "Los datos del proveedor: " +
            gestorSeleccionado.nombreProveedor +
            " fueron actualizados correctamente"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const petiDELETE = async () => {
    await axios
      .delete(baseUrl + "/" + gestorSeleccionado.idProveedor)
      .then((resp) => {
        setdata(data.filter((ordenes) => ordenes.idProveedor !== resp.data));
        abrircerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
    alert(
      "Los datos del proveedor: " +
        gestorSeleccionado.nombreProveedor +
        " fueron eliminados correctamente"
    );
  };

  const seleccionarGestor = (ordenes, caso) => {
    setGestorSeleccionado(ordenes);
    caso === "Editar" ? abrircerrarModalEditar() : abrircerrarModalEliminar();
  };

  useEffect(() => {
    petiGET();
  }, []);

  var nrofilas = data.length;

  return (
    <div>
      <h1 className='text-center titulosistema mb-3'><b>REGISTRO Y CONSULTA DE PROVEEDOR</b></h1>
      <br />
      <br />

      <div className="col-lg-5 float-lg-start card mb-3">
        <div className="card-header bg-dark ">
          <h5 className="text-center text-light titulosistema mt-2 mb-2">BUSCAR UN PROVEEDOR </h5>
        </div>
      <div className="card-body form-group">
      <div className="containerInput">
        <input
          className="form-control inputbuscar "
          value={busqueda}
          id="busqueda"
          onChange={handlebusqueda}
          placeholder="Ingrese el proveedor.."
        />
      </div>   
      </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button
        className="btn botoncito "
        onClick={() => abrircerrarModalInsertar()}
      >
        NUEVO PROVEEDOR
      </button>
      {"   "}
      <button className="btn btn-danger text-light titulosistema" onClick={() => cerrarSesion()}>
        CERRAR SESION
      </button>
      {"   "}
      <CSVLink data={data} className="btn btn-warning text-dark titulosistema">EXPORTAR ARCHIVO</CSVLink>

      <br/>
      <br/>
      <br/>
      <div>
        <h5 className="text-dark titulosistema">Cantidad de Proveedores: {nrofilas}</h5>
      </div>
      <br/>


      <table className="table table-bordered table- table-hover">
        <thead className="table-dark text-center text-light titulosistema">
          <tr>
            <th>CODIGO</th>
            <th>NOMBRE</th>
            <th>DIRECCION</th>
            <th>TELEFONO</th>
            <th>EMAIL</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {data.map((ordenes) => (
            <tr key={ordenes.idProveedor}>
              <td className="text-center">{ordenes.idProveedor}</td>
              <td>{ordenes.nombreProveedor}</td>
              <td>{ordenes.direccion}</td>
              <td className="text-center">{ordenes.telefono}</td>
              <td>{ordenes.email}</td>
              <td className="text-center">{ordenes.estado}</td>
              <td>
                <button
                  className="btn btn-warning text-dark titulosistema"
                  onClick={() => seleccionarGestor(ordenes, "Editar")}
                >
                  EDITAR
                </button>
                {" | "}
                <button
                  className="btn btn-danger text-light titulosistema"
                  onClick={() => seleccionarGestor(ordenes, "Eliminar")}
                >
                  ELIMINAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader className="bg-dark text-light titulosistema text-center">REGISTRAR PROVEEDOR</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombreProveedor"
              onChange={handlechange}
            />
            <br />
            <label>Direccion:</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              onChange={handlechange}
            />
            <br />
            <label>Telefono:</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              onChange={handlechange}
            />
            <br />
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handlechange}
            />
            <br />
            <label>Estado :</label>
            <input
              type="text"
              className="form-control"
              name="estado"
              onChange={handlechange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn botoncito " onClick={() => petiPost()}>
            Registrar
          </button>
          {" |"}
          <button
            className="btn btn-danger text-light titulosistema"
            onClick={() => abrircerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader className="bg-dark text-light titulosistema text-center">EDITAR PROVEEDOR</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>IdProveedor:</label>
            <input
              type="text"
              className="form-control"
              name="idProveedor"
              value={gestorSeleccionado && gestorSeleccionado.idProveedor}
              readOnly
            />
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombreProveedor"
              onChange={handlechange}
              value={gestorSeleccionado && gestorSeleccionado.nombreProveedor}
            />
            <br />
            <label>Direccion:</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              onChange={handlechange}
              value={gestorSeleccionado && gestorSeleccionado.direccion}
            />
            <br />
            <label>Telefono:</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              onChange={handlechange}
              value={gestorSeleccionado && gestorSeleccionado.telefono}
            />
            <br />
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handlechange}
              value={gestorSeleccionado && gestorSeleccionado.email}
            />
            <br />
            <label>Estado :</label>
            <input
              type="text"
              className="form-control"
              name="estado"
              onChange={handlechange}
              value={gestorSeleccionado && gestorSeleccionado.estado}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn botoncito" onClick={() => petiPUT()}>
            Actualizar Dato
          </button>
          {" |"}
          <button
            className="btn btn-danger text-light titulosistema"
            onClick={() => abrircerrarModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estas seguro que deseas eliminar al proveedor:{" "}
          {gestorSeleccionado && gestorSeleccionado.nombreProveedor} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => petiDELETE()}>
            Si
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrircerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ListRegisProve;
