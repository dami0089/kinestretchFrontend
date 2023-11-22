import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ClasesContext = createContext();

const ClasesProvider = ({ children }) => {
  const [modalNuevaClase, setModalNuevaClase] = useState(false);

  const [idSede, setIdSede] = useState("");
  const [diaDeLaSemana, setDiaDeLaSemana] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [idProfesor, setIdProfesor] = useState("");
  const [clasesSede, setClasesSede] = useState([]);
  const [clasesSedeManana, setClasesSedeManana] = useState([]);
  const [modalNuevaClaseSede, setModalNuevaClaseSede] = useState(false);
  const [recargoProximasClases, setRecargoProximasClases] = useState(false);
  const [clasesDia, setClasesDia] = useState([]);
  const [clasesCliente, setClasesCliente] = useState([]);
  const [actualizoClasesCliente, setActualizoClasesCliente] = useState(false);
  const [modalAsignarClaseACliente, setModalAsignarClaseACliente] =
    useState(false);

  const [clasesOrdenadas, setClasesOrdenadas] = useState([]);
  const [idClaseSeleccionada, setIdClaseSeleccionada] = useState("");
  const [idVerClase, setIdVerClase] = useState("");

  const [diaClase, setDiaClase] = useState("");
  const [horaClase, setHoraClase] = useState("");
  const [sedeClase, setSedeClase] = useState("");
  const [idClasePerfilCliente, setIdClasePerfilCliente] = useState(false);
  const [modalRegistrarPagoProfe, setModalRegistrarPagoProfe] = useState(false);
  const [idPagoProfe, setIdPagoProfe] = useState("");
  const [actualizo, setActualizo] = useState(false);
  const [modalClaseProfePerfilAdmin, setModalClaseProfePerfilAdmin] =
    useState(false);
  const [modalPagoProfesorPerfil, setModalPagoProfesorPerfil] = useState(false);

  const handleModalPagoProfesorPerfil = () => {
    setModalPagoProfesorPerfil(!modalPagoProfesorPerfil);
  };

  const handleModalClaseProfePerfilAdmin = () => {
    setModalClaseProfePerfilAdmin(!modalClaseProfePerfilAdmin);
  };

  const handleModalPagosProfes = () => {
    setModalRegistrarPagoProfe(!modalRegistrarPagoProfe);
  };

  const handleModalAsignarClaseACliente = () => {
    setModalAsignarClaseACliente(!modalAsignarClaseACliente);
  };

  const handleModalNuevaClase = () => {
    setModalNuevaClase(!modalNuevaClase);
  };

  const handleModalNuevaClaseSede = () => {
    setModalNuevaClaseSede(!modalNuevaClaseSede);
  };

  //Envia a la base de datos la informacion para un nuevo cliente
  const nuevaClase = async (
    sede,
    diaDeLaSemana,
    horarioInicio,
    profesor,
    creador
  ) => {
    const cliente = {
      sede,
      diaDeLaSemana,
      horarioInicio,
      profesor,
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

      await clienteAxios.post("/clases", cliente, config);

      toast.success("Clase creada correctamente", {
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

  const obtenerClasesSede = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/clases/obtener/${id}`, config);
      setClasesSede(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerClasesSedeManana = async (id) => {
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
        `/clases/obtener-manana/${id}`,
        config
      );
      setClasesSedeManana(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerClasesSedeDia = async (id, dia) => {
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
        `/clases/obtener-dia/${id}`,
        { dia },
        config
      );
      setClasesDia(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [clasesProfe, setClasesProfe] = useState([]);

  const obtenerClasesProfeDia = async (id, dia) => {
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
        `/clases/obtener-clases-profesores/${id}`,
        { dia },
        config
      );
      setClasesProfe(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerClasesProfeDiaAdmin = async (id, dia) => {
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
        `/clases/obtener-clases-profesores-admin/${id}`,
        { dia },
        config
      );
      setClasesProfe(data);
    } catch (error) {
      console.log(error);
    }
  };

  const asignarClienteAClase = async (id, idClase) => {
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
        `/clases/asignar-cliente-a-clase/${id}`,
        { idClase },
        config
      );
      toast.success("Cliente Asignado correctamente", {
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

  const obtenerClasesCliente = async (id) => {
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
        `/clases/obtener-clases-cliente/${id}`,
        config
      );
      setClasesCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerClasesClienteAdmin = async (id) => {
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
        `/clases/obtener-clases-cliente2/${id}`,
        config
      );
      setClasesCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerClasesOrdenadas = async (id, dia) => {
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
        `/clases/obtener-clases-ordenadas/${id}`,
        { dia },
        config
      );
      setClasesOrdenadas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [clientesClase, setClientesClase] = useState([]);

  const obtenerClientesClases = async (id) => {
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
        `/clases/obtener-clientes-clases/${id}`,
        {},
        config
      );
      setClientesClase(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [clase, setClase] = useState([]);

  const obtenerClase = async (id) => {
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
        `/clases/obtener-clase/${id}`,
        {},
        config
      );
      setClase(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelarClaseCliente = async (id, claseId) => {
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
        `/clases/cancelar-clase/${id}`,
        { claseId },
        config
      );

      toast.success("Clase Cancelada correctamente", {
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
      const errorMsg =
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "Error al cancelar la clase.";
      toast.error(errorMsg, {
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

  const [inasistenciaCliente, setInasistenciaCliente] = useState([]);

  const verificarInasistenciaClietne = async (id, cliente) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await clienteAxios.post(
        `/clases/verificar-inasistencia/${id}`,
        { cliente },
        config
      );
      console.log(data);

      setInasistenciaCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDeClaseACliente = async (id, idCliente) => {
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
        `/clases/eliminar-cliente-clase/${id}`,
        { idCliente },
        config
      );
      toast.success("Cliente eliminado de la clase correctamente", {
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
      console.log(error);
    }
  };

  const asistencia = async (id, idCliente) => {
    console.log(idCliente);
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
        `/clases/registrar-asistencia/${id}`,
        { idCliente },
        config
      );
      toast.success("Asistencia Registrada", {
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
      console.log(error);
    }
  };

  const [asist, setAsist] = useState([]);

  const comprobarAsistencia = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await clienteAxios.post(
        `/clases/comprobar-asistencia/${id}`,
        {},
        config
      );
      console.log(data);
      setAsist(data);
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarAsistencias = async (diaActual) => {
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
        `/clases/limpiar-asistencias`,
        { diaActual },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClasesContext.Provider
      value={{
        handleModalNuevaClase,
        modalNuevaClase,
        nuevaClase,
        idSede,
        setIdSede,
        diaDeLaSemana,
        setDiaDeLaSemana,
        horaInicio,
        setHoraInicio,
        idProfesor,
        setIdProfesor,
        obtenerClasesSede,
        clasesSede,
        obtenerClasesSedeManana,
        clasesSedeManana,
        handleModalNuevaClaseSede,
        modalNuevaClaseSede,
        recargoProximasClases,
        setRecargoProximasClases,
        obtenerClasesSedeDia,
        clasesDia,
        asignarClienteAClase,
        obtenerClasesCliente,
        clasesCliente,
        setClasesCliente,
        actualizoClasesCliente,
        setActualizoClasesCliente,
        handleModalAsignarClaseACliente,
        modalAsignarClaseACliente,
        obtenerClasesOrdenadas,
        clasesOrdenadas,
        idClaseSeleccionada,
        setIdClaseSeleccionada,
        clasesProfe,
        obtenerClasesProfeDia,
        idVerClase,
        setIdVerClase,
        clientesClase,
        obtenerClientesClases,
        diaClase,
        setDiaClase,
        horaClase,
        setHoraClase,
        sedeClase,
        setSedeClase,
        clase,
        obtenerClase,
        idClasePerfilCliente,
        setIdClasePerfilCliente,
        cancelarClaseCliente,
        inasistenciaCliente,
        verificarInasistenciaClietne,
        setInasistenciaCliente,
        eliminarDeClaseACliente,
        asistencia,
        asist,
        comprobarAsistencia,
        handleModalPagosProfes,
        modalRegistrarPagoProfe,
        idPagoProfe,
        setIdPagoProfe,
        actualizo,
        setActualizo,
        limpiarAsistencias,
        obtenerClasesClienteAdmin,
        obtenerClasesProfeDiaAdmin,
        modalClaseProfePerfilAdmin,
        handleModalClaseProfePerfilAdmin,
        modalPagoProfesorPerfil,
        handleModalPagoProfesorPerfil,
      }}
    >
      {children}
    </ClasesContext.Provider>
  );
};

export { ClasesProvider };

export default ClasesContext;
