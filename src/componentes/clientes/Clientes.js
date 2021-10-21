import React, { useEffect, useState, Fragment, useContext } from "react";
// importar clientes axios
import clientesAxios from "../../config/axios";
import Cliente from "./Cliente";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
// import el Context
import { CRMContext } from "../../context/CRMContext";

const Clientes = (props) => {
  // Trabajar con el state
  // clientes = state,  guardarClientes = funcion para guardar el state
  const [clientes, guardarClientes] = useState([]);

  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      // Query a las API
      const consultarAPI = async () => {
        try {
          const clientesConsulta = await clientesAxios.get("/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });

          // colocar el resultado en el state
          guardarClientes(clientesConsulta.data);
        } catch (error) {
          // error con Authorizacion
          if ((error.response.status = 500)) {
            props.history.push("/iniciar-sesion");
          }
        }
      };
      consultarAPI();
    } else {
      props.history.push("/iniciar-sesion");
    }
  }, [clientes]);

  // si el state esta como false
  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  if (!clientes.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </Fragment>
  );
};

export default withRouter(Clientes);
