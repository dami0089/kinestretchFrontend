import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState("");
  const [modalQr, setModalQr] = useState(false);
  const [autenticado, setAutenticado] = useState("");
  const [cargandoModal, setCargandoModal] = useState(false);

  const handleModalQr = () => {
    setModalQr(!modalQr);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        navigate("/inicio");
        if (data._id && location.pathname === "/") {
          navigate("/inicio");
        }
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
  };

  const handleCargando = () => {
    setCargandoModal((prevState) => !prevState);
  };

  const consultarAutenticacion = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(
        `/usuarios/consultar-autenticacion`,
        config
      );
      console.log(data.autenticacion);
      if (data.autenticacion == 1) {
        setAutenticado("1");
      }
      if (data.autenticacion == 2) {
        setAutenticado("2");
      }
      if (data.autenticacion == 0) {
        setAutenticado("0");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth,
        modalQr,
        setAutenticado,
        handleModalQr,
        consultarAutenticacion,
        autenticado,
        usuarioAutenticado,
        setUsuarioAutenticado,
        cargandoModal,
        handleCargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
