import React, { Fragment, useState, useEffect, useContext } from "react";
import clientesAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";
import DetallesPedido from "./DetallesPedido";
import { withRouter } from "react-router-dom";

const Pedidos = (props) => {
  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  const [pedidos, guardarPedidos] = useState([]);

  useEffect(() => {
    if (auth.token !== "") {
      const consultarAPI = async () => {
        try {
          // obtener los pedidos
          const resultado = await clientesAxios.get("/pedidos", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          guardarPedidos(resultado.data);
        } catch (error) {
          // error con Authorizacion
          if ((error.response.status = 500)) {
            props.history.push("/iniciar-sesion");
          }
        }
        consultarAPI();
      };
    } else {
      props.history.push("/iniciar-sesion");
    }
  }, []);

  // si el state esta como false
  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  return (
    <Fragment>
      <h2>Pedidos</h2>
      {pedidos.map((pedido) => (
        <DetallesPedido key={pedido._id} pedido={pedido} />
      ))}
      <ul className="listado-pedidos"></ul>
    </Fragment>
  );
};

export default withRouter(Pedidos);
