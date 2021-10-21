import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import clientesAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

function Login(props) {
  // auth y token
  const [auth, guardarAuth] = useContext(CRMContext);

  // State con los datos del formulario
  const [credenciales, guardarCredenciales] = useState({});

  // iniciar sesión en el servidor
  const iniciarSesion = async (e) => {
    e.preventDefault();

    // autenticar al usuario
    try {
      const respuesta = await clientesAxios.post(
        "/iniciar-sesion",
        credenciales
      );
      // extraer token y colocarlo en localstorage
      const { token } = respuesta.data;
      localStorage.setItem("token", token);

      // colocar en el state
      guardarAuth({
        token,
        auth: true,
      });

      // alerta
      Swal.fire("Login Correcto", "Has iniciado Sesión", "success");

      // redireccionar
      props.history.push("/");
    } catch (error) {
      console.log(error);

      if (error.response) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: error.response.data.mensaje,
        });
      } else {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "Hubo un error",
        });
      }
    }
  };

  // almacenar lo que el usuario escribe en el State
  const leerDatos = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email para Iniciar Sesión"
              required
              onChange={leerDatos}
            />
          </div>

          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password para Iniciar Sesión"
              required
              onChange={leerDatos}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
