import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { set } from "date-fns";

const SedesContext = createContext();

const SedesProvider = ({ children }) => {
  const [modalNuevaSede, setModalNuevaSede] = useState(false);

  const [nombreSede, setNombreSede] = useState("");
  const [direccionSede, setDireccionSede] = useState("");
  const [localidadSede, setLocalidadSede] = useState("");
  const [provinciaSede, setProvinciaSede] = useState("");
  const [sedes, setSedes] = useState([]);
  const [idVerSede, setIdVerSede] = useState("");
  const [sede, setSede] = useState("");
  const [modalVerClase, setModalVerClase] = useState(false);
  const [modalNuevaSecretaria, setModalNuevaSecretaria] = useState(false);
  const [nombreSecreatria, setNombreSecretaria] = useState("");
  const [apellidoSecretaria, setApellidoSecretaria] = useState("");
  const [dniSecretaria, setDniSecretaria] = useState("");
  const [emailSecretaria, setEmailSecretaria] = useState("");
  const [idSedeSecretaria, setIdSedeSecretaria] = useState("");
  const [idSede, setIdSede] = useState("");

  const [modalEnviarMensajeSede, setModalEnviarMensajeSede] = useState(false);

  const handleModalEnviarMensajeSede = () => {
    setModalEnviarMensajeSede(!modalEnviarMensajeSede);
  };
  const handleModalNuevaSecretaria = () => {
    setModalNuevaSecretaria(!modalNuevaSecretaria);
  };

  //abre o cierra el modal nuevo sede
  const handleModalNuevaSede = () => {
    setModalNuevaSede(!modalNuevaSede);
  };

  const handleModalVerClase = () => {
    setModalVerClase(!modalVerClase);
  };

  //Envia a la base de datos la informacion para un nuevo cliente
  const nuevaSede = async (
    nombre,
    direccion,
    localidad,
    provincia,
    creador
  ) => {
    const cliente = {
      nombre,
      direccion,
      localidad,
      provincia,
      creador,
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

      await clienteAxios.post("/sedes", cliente, config);

      toast.success("Sede creada correctamente", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerSedes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/sedes", config);
      //guarda los datos de los clientes
      setSedes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarC = async (cliente) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/clientes/${cliente.id}`,
        cliente,
        config
      );

      //Mostrar la alerta
      toast.success("Cliente actualizado correctamente", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //redireccionar
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerSede = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/sedes/obtener/${id}`, config);
      setSede(data);
    } catch (error) {
      console.log(error);
    }
  };

  const desactivarCliente = async (cliente) => {
    console.log(cliente);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/clientes/desactivar-activar/${cliente.id}`,
        cliente,
        config
      );

      setIsActivo(data.isActivo);

      toast.success("Estado del cliente actualizado correctamente", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevaSecretaria = async (nombre, apellido, dni, email, sede) => {
    const secretaria = {
      nombre,
      apellido,
      dni,
      email,
      sede,
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

      await clienteAxios.post("/sedes/nueva-secretaria", secretaria, config);

      toast.success("Secretaria creada correctamente", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [secretarias, setSecretarias] = useState([]);

  const obtenerSecretarias = async () => {
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
        "/sedes/obtener-secretarias",

        config
      );

      setSecretarias(data);
    } catch (error) {
      console.log(error);
    }
  };

  const enviarMensajeSede = async (id, mensaje, asunto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(
        `/sedes/enviar-mensaje/${id}`,
        { mensaje, asunto },
        config
      );

      toast.success(
        "Mensaje enviado correctamente, se procedera a enviar a toda la sede",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <SedesContext.Provider
      value={{
        handleModalNuevaSede,
        modalNuevaSede,
        nuevaSede,
        nombreSede,
        setNombreSede,
        direccionSede,
        setDireccionSede,
        localidadSede,
        setLocalidadSede,
        provinciaSede,
        setProvinciaSede,
        obtenerSedes,
        sedes,
        idVerSede,
        setIdVerSede,
        obtenerSede,
        sede,
        modalVerClase,
        handleModalVerClase,
        handleModalNuevaSecretaria,
        modalNuevaSecretaria,
        nombreSecreatria,
        setNombreSecretaria,
        apellidoSecretaria,
        setApellidoSecretaria,
        dniSecretaria,
        setDniSecretaria,
        emailSecretaria,
        setEmailSecretaria,
        idSedeSecretaria,
        setIdSedeSecretaria,
        nuevaSecretaria,
        secretarias,
        obtenerSecretarias,
        handleModalEnviarMensajeSede,
        modalEnviarMensajeSede,
        idSede,
        setIdSede,
        enviarMensajeSede,
      }}
    >
      {children}
    </SedesContext.Provider>
  );
};

export { SedesProvider };

export default SedesContext;
