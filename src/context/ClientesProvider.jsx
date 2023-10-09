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
      setTimeout(() => {
        setTipo("");
        setPlanes("");
        setNombre("");
        setCuit("");
        setFechaVencimiento("");
        setDomicilio("");
        setEmailFactura("");
        setCantidad("");
        navigate("/inicio/clientes");
      }, 3000);
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
      //guarda la cantidad de clientes
      const cuenta = data.length; // Contar los clientes
      setConteo(cuenta);
      //guarda los clientes de los ultimos 7 dias
      // Convertir las fechas de string a objetos Date
      const client = data.map((cliente) => ({
        ...cliente,
        fechaAlta: new Date(cliente.fechaAlta),
      }));
      // Filtrar los clientes que se dieron de alta en los últimos 7 días
      const fechaActual = new Date();
      const ultimosClientes = client.filter(
        (cliente) =>
          fechaActual.getTime() - cliente.fechaAlta.getTime() <=
          7 * 24 * 60 * 60 * 1000
      );
      // Actualizar el estado de los clientes y del conteo
      setClientesRecientes(ultimosClientes.length);
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
      console.log("obteniendo cliente");
      console.log(data);
      setEditarCliente(data.cliente);
      setTipo(data.cliente.tipo);
      setNombre(data.cliente.nombre);
      setCuit(data.cliente.cuit);
      setDomicilio(data.cliente.domicilio);
      setEmailFactura(data.cliente.mailFactura);
      setFechaVencimiento(data.cliente.fechaVencimiento);
      setIsActivo(data.cliente.isActivo);
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
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export { ClientesProvider };

export default ClientesContext;
