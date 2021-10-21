import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import clientesAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";
import Spinner from "../layout/Spinner";
import Producto from "./Producto";

const Productos = (props) => {
  // productos = state, guardarProductos = función para guardar el state
  const [productos, guardarProductos] = useState([]);

  const [auth, guardarAuth] = useContext(CRMContext);

  // useEffect para consultar API cuando cargue
  useEffect(() => {
    if (auth.token !== "") {
      // Query a la API
      const consultarAPI = async () => {
        try {
          const productoConsulta = await clientesAxios.get("/productos", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          guardarProductos(productoConsulta.data);
        } catch (error) {
          // error con Authorizacion
          if ((error.response.status = 500)) {
            props.history.push("/iniciar-sesion");
          }
        }
      };

      // llamado a la API
      consultarAPI();
    } else {
      props.history.push("/iniciar-sesion");
    }
  }, [productos]);

  // si el state esta como false
  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  // Spinner de carga
  if (!productos.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Productos</h2>

      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </Fragment>
  );
};

export default withRouter(Productos);
