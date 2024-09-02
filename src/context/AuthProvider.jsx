import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import Swal from "sweetalert2";
import { set } from "date-fns";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState("");
  const [modalQr, setModalQr] = useState(false);
  const [autenticado, setAutenticado] = useState("");
  const [cargandoModal, setCargandoModal] = useState(false);
  const [content, setContent] = useState("");
  const [estado, setEstado] = useState("");
  const [modalAceptarTerminos, setModalAceptarTerminos] = useState(false);
  const [modalAgregarUsuarioApp, setAgregarUsuarioApp] = useState(false);
  const [actualizarList, setActualizarList] = useState(false);
  const [idSedeSeleccionada, setIdSedeSeleccionada] = useState("");

  const handleAgregarUsuarioApp = () => {
    setAgregarUsuarioApp(!modalAgregarUsuarioApp);
  };

  const handleModalAceptarTerminos = () => {
    setModalAceptarTerminos(!modalAceptarTerminos);
  };

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

        const isDisponibilidadSedePath = location.pathname.startsWith(
          "/disponibilidad-sede/"
        );

        if (!isDisponibilidadSedePath) {
          navigate("/inicio");
        }

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
    localStorage.removeItem("token");
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

  const [dataDash, setDataDash] = useState([]);

  const datosParaDash = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/usuarios/obtener-dash`, config);

      setDataDash(data);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevosTerminos = async (texto, estado) => {
    const info = {
      texto,
      estado,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/usuarios/nuevos-terminos`,
        info,
        config
      );
      Swal.fire({
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.msg,
      });
    }
  };

  const obtenerTerminos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/usuarios/obtener-terminos`, config);
      setContent(data[0].texto);
      setEstado(data[0].estado);
    } catch (error) {
      console.log(error);
    }
  };

  const consultarTerminos = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/usuarios/consultar-terminos/${id}`,
        {},
        config
      );
      console.log(data);

      if (data && !data.aceptado) {
        handleModalAceptarTerminos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const aceptarTerminos = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/usuarios/aceptar-terminos/${id}`,
        {},
        config
      );
      Swal.fire({
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.msg,
      });
    }
  };

  const nuevoUsuarioBackOffice = async (
    nombre,
    apellido,
    dni,
    password,
    email,
    celu,
    rol,
    sedes
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/usuarios/registrar-usuario-backoffice`,
        { nombre, apellido, dni, password, email, celu, rol, sedes },
        config
      );
      Swal.fire({
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.msg,
      });
    }
  };

  const [usuariosApp, setUsuariosApp] = useState([]);

  const obtenerUsuariosApp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        "/usuarios/obtener-usuarios-por-rol",
        config
      );
      //guarda los datos de los clientes
      setUsuariosApp(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [obtenerSedesUser, setObtenerSedesUser] = useState([]);

  const obtenerSedesUserPantalla = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/usuarios/obtener-sedes-de-usuario/${id}`,
        config
      );

      setObtenerSedesUser(data);
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
        dataDash,
        datosParaDash,
        nuevosTerminos,
        content,
        setContent,
        estado,
        setEstado,
        obtenerTerminos,
        consultarTerminos,
        handleModalAceptarTerminos,
        modalAceptarTerminos,
        aceptarTerminos,
        handleAgregarUsuarioApp,
        modalAgregarUsuarioApp,
        nuevoUsuarioBackOffice,
        usuariosApp,
        obtenerUsuariosApp,
        actualizarList,
        setActualizarList,
        obtenerSedesUser,
        obtenerSedesUserPantalla,
        idSedeSeleccionada,
        setIdSedeSeleccionada,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
