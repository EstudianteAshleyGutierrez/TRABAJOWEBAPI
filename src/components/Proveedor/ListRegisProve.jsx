import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

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
      <h4>Buscar a Proveedor: </h4>
      <div className="containerInput">
        <input
          className="form-control inputbuscar w-50 "
          value={busqueda}
          id="busqueda"
          onChange={handlebusqueda}
          placeholder="Ingrese el proveedor.."
        />
      </div>
      <br />

      <div>
        <h5 className="text-primary">Cantidad de Proveedores: {nrofilas}</h5>
      </div>
      <br />
      <button
        className="btn btn-success "
        onClick={() => abrircerrarModalInsertar()}
      >
        NUEVO PROVEEDOR
      </button>
      {"   "}
      <button className="btn btn-danger" onClick={() => cerrarSesion()}>
        CERRAR SESION
      </button>
      {"   "}
      <br />
      <br />
      <table className="table table-bordered table- table-striped">
        <thead>
          <tr>
            <th>Id Proveedor</th>
            <th>Nombre Proveedor</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {data.map((ordenes) => (
            <tr key={ordenes.idProveedor}>
              <td>{ordenes.idProveedor}</td>
              <td>{ordenes.nombreProveedor}</td>
              <td>{ordenes.direccion}</td>
              <td>{ordenes.telefono}</td>
              <td>{ordenes.email}</td>
              <td>{ordenes.estado}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => seleccionarGestor(ordenes, "Editar")}
                >
                  EDITAR
                </button>
                {" | "}
                <button
                  className="btn btn-primary"
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
        <ModalHeader>Registrar Proveedor</ModalHeader>
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
          <button className="btn btn-info" onClick={() => petiPost()}>
            Registrar
          </button>
          {" |"}
          <button
            className="btn btn-danger"
            onClick={() => abrircerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Proveedor</ModalHeader>
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
          <button className="btn btn-info" onClick={() => petiPUT()}>
            Actualizar Dato
          </button>
          {" |"}
          <button
            className="btn btn-danger"
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
