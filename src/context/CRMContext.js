import React, { useState } from "react";

const CRMContext = React.createContext([{}, () => {}]);

const CMRProvider = (props) => {
  // definir el state inicial
  const [auth, guardarAuth] = useState({
    token: "",
    auth: false,
  });

  return (
    <CRMContext.Provider value={[auth, guardarAuth]}>
      {props.children}
    </CRMContext.Provider>
  );
};

export { CRMContext, CMRProvider };
