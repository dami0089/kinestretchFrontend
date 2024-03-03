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
  const [modalRegistrarRetiro, setModalRegistrarRetiro] = useState(false);
  const [idProfesor, setIdProfesor] = useState("");
  const [modalEditarProfe, setModalEditarProfe] = useState(false);
  const [idProfeEditar, setIdProfeEditar] = useState("");
  const [modalEditarDatosProfe, setModalEditardatosProfe] = useState(false);

  const handleModalEditarDatosProfe = () => {
    setModalEditardatosProfe((prev) => !prev);
  };

  const handleRetiro = () => {
    setModalRegistrarRetiro((prev) => !prev);
  };

  const handleEditarProfe = () => {
    setModalEditarProfe((prev) => !prev);
  };

  const handleModalClasesProfe = () => {
    setModalClasesProfe((prev) => !prev);
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

  const [profesor, setProfesor] = useState([]);

  const obtenerProfesor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/profesores/obtener/${id}`, config);

      setProfesor(data);
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

  const [registrosContbalesProfe, setRegistrosContablesProfe] = useState([]);

  const obtenerRegistrosContablesProfesor = async (id) => {
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
        `/clientes/registros-contables-profesor/${id}`,
        config
      );
      console.log(data);
      setRegistrosContablesProfe(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerRegistrosContablesProfesorAdmin = async (id) => {
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
        `/clientes/registros-contables-profesor-admin/${id}`,
        config
      );

      setRegistrosContablesProfe(data);
    } catch (error) {
      console.log(error);
    }
  };

  const registrarRetiro = async (importe, usuario) => {
    const info = {
      importe: importe,
      usuario: usuario,
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

      await clienteAxios.post(`/clientes/registrar-retiro`, info, config);

      toast.success("Retiro Registrado correctamente", {
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

  const hacerCierre = async (importe, id) => {
    const info = {
      importe: importe,
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

      await clienteAxios.post(`/clientes/hacer-cierre/${id}`, info, config);

      toast.success("Cierre Hecho Correctamente", {
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

  const desactivarProfe = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`/profesores/desactivar/${id}`, {}, config);

      toast.success("Profesor desactivado correctamente", {
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

  const [profesoresInactivos, setProfesoresInactivos] = useState([]);

  const obtenerProfesoresInactivos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/profesores/inactivos", config);
      //guarda los datos de los clientes
      setProfesoresInactivos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarProfe = async (
    id,
    nombre,
    apellido,
    dni,
    email,
    celu,
    fechanac,
    domicilio
  ) => {
    const profe = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      email: email,
      celular: celu,
      fechaNacimiento: fechanac,
      domicilio: domicilio,
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
      await clienteAxios.put(`/profesores/${id}`, profe, config);

      //Mostrar la alerta
      toast.success("Profesor Editado correctamente", {
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
        registrosContbalesProfe,
        obtenerRegistrosContablesProfesor,
        registrarRetiro,
        handleRetiro,
        modalRegistrarRetiro,
        hacerCierre,
        idProfesor,
        setIdProfesor,
        profesor,
        obtenerProfesor,
        obtenerRegistrosContablesProfesorAdmin,
        desactivarProfe,
        profesoresInactivos,
        obtenerProfesoresInactivos,
        modalEditarProfe,
        handleEditarProfe,
        editarProfe,
        idProfeEditar,
        setIdProfeEditar,
        modalEditarDatosProfe,
        handleModalEditarDatosProfe,
      }}
    >
      {children}
    </ProfesoresContext.Provider>
  );
};

export { ProfesoresProvider };

export default ProfesoresContext;
