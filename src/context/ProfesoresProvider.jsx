import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProfesoresContext = createContext();

const ProfesoresProvider = ({ children }) => {
  const [modalNuevoProfe, setModalNuevoProfe] = useState(false);
  const [nombreProfe, setNombreProfe] = useState("");
  const [apellidoProfe, setApellidoProfe] = useState("");
  const [dniProfe, setDniProfe] = useState("");
  const [emailProfe, setEmailProfe] = useState("");
  const [celuProfe, setCeluProfe] = useState("");
  const [fechaNacimientoProfe, setFechaNacimientoProfe] = useState("");
  const [domicilioProfe, setDomicilioProfe] = useState("");
  const [profesores, setProfesores] = useState([]);
  const [modalClasesProfe, setModalClasesProfe] = useState(false);

  const handleModalClasesProfe = () => {
    setModalClasesProfe(!modalClasesProfe);
  };

  //Envia a la base de datos la informacion para un nuevo cliente
  const nuevoProfe = async (
    nombre,
    apellido,
    dni,
    email,
    celular,
    fechaNacimiento,
    domicilio,
    creador
  ) => {
    const cliente = {
      nombre,
      apellido,
      dni,
      email,
      celular,
      fechaNacimiento,
      domicilio,
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

      await clienteAxios.post("/profesores", cliente, config);

      toast.success("Profesor creado correctamente", {
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

  const obtenerProfesores = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/profesores", config);
      //guarda los datos de los clientes
      setProfesores(data);
    } catch (error) {
      console.log(error);
    }
  };

  //abre o cierra el modal nuevo cliente
  const handleModalNuevoProfe = () => {
    setModalNuevoProfe(!modalNuevoProfe);
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
    <ProfesoresContext.Provider
      value={{
        handleModalNuevoProfe,
        modalNuevoProfe,
        nuevoProfe,
        nombreProfe,
        setNombreProfe,
        apellidoProfe,
        setApellidoProfe,
        dniProfe,
        setDniProfe,
        emailProfe,
        setEmailProfe,
        celuProfe,
        setCeluProfe,
        fechaNacimientoProfe,
        setFechaNacimientoProfe,
        domicilioProfe,
        setDomicilioProfe,
        obtenerProfesores,
        profesores,
        handleModalClasesProfe,
        modalClasesProfe,
      }}
    >
      {children}
    </ProfesoresContext.Provider>
  );
};

export { ProfesoresProvider };

export default ProfesoresContext;
