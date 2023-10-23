import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ClientesContext = createContext();

const ClientesProvider = ({ children }) => {
  const [seleccion, setSeleccion] = useState(1);
  const [modalNuevoCliente, setModalNuevoCliente] = useState(false);
  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");
  const [dniCliente, setDniCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [celularCliente, setCelularCliente] = useState("");
  const [fechaNacimientoCliente, setFechaNacimientoCliente] = useState("");
  const [diagnosticoCliente, setDiagnosticoCliente] = useState("");
  const [aptoFisicoCliente, setAptoFisicoCliente] = useState("");
  const [nombreContactoEmergencia, setNombreContactoEmergencia] = useState("");
  const [celularContactoEmergencia, setCelularContactoEmergencia] =
    useState("");
  const [cliente, setCliente] = useState([]);
  const [idClienteEditar, setIdClienteEditar] = useState("");
  const [obtenerClasesCliente, setObtenerClasesCliente] = useState([]);

  //Envia a la base de datos la informacion para un nuevo cliente
  const nuevoCliente = async (
    nombre,
    apellido,
    dni,
    email,
    celular,
    fechaNacimiento,
    diagnostico,
    aptoFisico,
    nombreContactoEmergencia,
    celularContactoEmergencia,
    creador
  ) => {
    const cliente = {
      nombre,
      apellido,
      dni,
      email,
      celular,
      fechaNacimiento,
      diagnostico,
      aptoFisico,
      nombreContactoEmergencia,
      celularContactoEmergencia,
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

      await clienteAxios.post("/clientes", cliente, config);

      toast.success("Cliente creado correctamente", {
        position: "top-right",
        autoClose: 1500,
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

  const { auth } = useAuth();

  // Este effect esta para buscar ej la base el listado de clientes al abrir la seccion clientes

  const [clientes, setClientes] = useState([]);

  const obtenerClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/clientes", config);
      //guarda los datos de los clientes
      setClientes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  //abre o cierra el modal nuevo cliente
  const handleModalNuevoCliente = () => {
    setModalNuevoCliente(!modalNuevoCliente);
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
        autoClose: 1000,
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerCliente = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/clientes/obtener/${id}`, config);
      setCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerClasesClienteProfile = async (id) => {
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
        `/clientes/clases-cliente/${id}`,
        config
      );
      setObtenerClasesCliente(data);
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
        autoClose: 1000,
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
        autoClose: 1500,
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
    <ClientesContext.Provider
      value={{
        handleModalNuevoCliente,
        nuevoCliente,
        seleccion,
        setSeleccion,
        setModalNuevoCliente,
        modalNuevoCliente,
        nombreCliente,
        setNombreCliente,
        apellidoCliente,
        setApellidoCliente,
        dniCliente,
        setDniCliente,
        emailCliente,
        setEmailCliente,
        celularCliente,
        setCelularCliente,
        fechaNacimientoCliente,
        setFechaNacimientoCliente,
        diagnosticoCliente,
        setDiagnosticoCliente,
        aptoFisicoCliente,
        setAptoFisicoCliente,
        nombreContactoEmergencia,
        setNombreContactoEmergencia,
        celularContactoEmergencia,
        setCelularContactoEmergencia,
        obtenerClientes,
        clientes,
        setClientes,
        obtenerCliente,
        cliente,
        idClienteEditar,
        setIdClienteEditar,
        setCliente,
        obtenerClasesClienteProfile,
        obtenerClasesCliente,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export { ClientesProvider };

export default ClientesContext;
