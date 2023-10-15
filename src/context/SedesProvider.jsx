import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SedesContext = createContext();

const SedesProvider = ({ children }) => {
  const [modalNuevaSede, setModalNuevaSede] = useState(false);

  const [nombreSede, setNombreSede] = useState("");
  const [direccionSede, setDireccionSede] = useState("");
  const [localidadSede, setLocalidadSede] = useState("");
  const [provinciaSede, setProvinciaSede] = useState("");
  const [sedes, setSedes] = useState([]);

  //abre o cierra el modal nuevo sede
  const handleModalNuevaSede = () => {
    setModalNuevaSede(!modalNuevaSede);
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
      }}
    >
      {children}
    </SedesContext.Provider>
  );
};

export { SedesProvider };

export default SedesContext;
