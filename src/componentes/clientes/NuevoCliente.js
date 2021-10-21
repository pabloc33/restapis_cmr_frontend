import React, { Fragment, useContext, useState } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import clientesAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

const NuevoCliente = ({ history }) => {
  const [auth, guardarAuth] = useContext(CRMContext);

  // cliente = state, guardarCliente = función para guardar el state
  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  // leer los datos del formulario
  const actualizarState = (e) => {
    // Almacenar lo que el usuario escribe en el state
    guardarCliente({
      // obtener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // Añade en la REST API un cliente nuevo
  const agregarCliente = (e) => {
    e.preventDefault();

    // enviar petición
    clientesAxios.post("/clientes", cliente).then((res) => {
      // validar si hay errores de mongo
      if (res.data.code === 11000) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "Ese cliente ya esta registrado",
        });
      } else {
        Swal.fire("Se agregó el Cliente", res.data.mensaje, "success");
      }
      // Redireccionar
      history.push("/");
    });
  };

  // Validar el formulario
  const validarCliente = () => {
    // Destructuring
    const { nombre, apellido, empresa, email, telefono } = cliente;

    // revisar que las propiedades del state tengan contenido
    let valido =
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !email.length ||
      !telefono.length;

    // return true o false
    return valido;
  };

  // VERIFICAR SI EL USUARIO ESTA AUTENTICADO O NO
  if (!auth.auth && localStorage.getItem("token") === auth.token) {
    history.push("/iniciar-sesion");
  }

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>

      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

// HOC (higher-order component), es una función que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);
