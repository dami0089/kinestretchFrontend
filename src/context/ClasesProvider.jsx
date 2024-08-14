import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { da } from "date-fns/locale";

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
  const [cupo, setCupo] = useState(0);
  const [modalClaseRecupero, setModalClaseRecupero] = useState(false);
  const [idClaseVer, setIdClaseVer] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState(""); // Por defecto, mostrará las clases del Lunes.
  const [modalEditarClase, setModalEditarClase] = useState(false);
  const [idClaseEditar, setIdClaseEditar] = useState("");

  const [recargoListado, setRecargoListado] = useState(false);

  const [modalEnviarMensajeClase, setModalEnviarMensajeClase] = useState(false);
  const [modalCancelarClase, setModalCancelarClase] = useState(false);

  const [modalRegistrarFeriado, setModalRegistrarFeriado] = useState(false);
  const [fechaFeriado, setFechaFeriado] = useState("");
  const [motivoFeriado, setMotivoFeriado] = useState("");
  const [modalCancelarClaseACliente, setModalCancelarClaseACliente] =
    useState(false);

  const handleModalCancelarClaseACliente = () => {
    setModalCancelarClaseACliente((prev) => !prev);
  };

  const handleModalRegistrarFeriado = () => {
    setModalRegistrarFeriado((prev) => !prev);
  };

  const handleModalCancelarClase = () => {
    setModalCancelarClase((prev) => !prev);
  };

  const handleModalEnviarMensajeClase = () => {
    setModalEnviarMensajeClase(!modalEnviarMensajeClase);
  };

  const handleModalEditarClase = () => {
    setModalEditarClase(!modalEditarClase);
  };

  const handleModalPagoProfesorPerfil = () => {
    setModalPagoProfesorPerfil((prev) => !prev);
  };

  const handleModalClaseRecupero = () => {
    setModalClaseRecupero((prev) => !prev);
  };

  const handleModalClaseProfePerfilAdmin = () => {
    setModalClaseProfePerfilAdmin((prev) => !prev);
  };

  const handleModalPagosProfes = () => {
    setModalRegistrarPagoProfe((prev) => !prev);
  };

  const handleModalAsignarClaseACliente = () => {
    setModalAsignarClaseACliente((prev) => !prev);
  };

  const handleModalNuevaClase = () => {
    setModalNuevaClase((prev) => !prev);
  };

  const handleModalNuevaClaseSede = () => {
    setModalNuevaClaseSede((prev) => !prev);
  };

  //Envia a la base de datos la informacion para un nuevo cliente
  const nuevaClase = async (
    sede,
    diaDeLaSemana,
    horarioInicio,
    profesor,
    creador,
    cupo
  ) => {
    const cliente = {
      sede,
      diaDeLaSemana,
      horarioInicio,
      profesor,
      creador,
      cupo,
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

  const [clasesClienteFecha, setClaseClienteFecha] = useState([]);

  const obtenerClasesConFecha = async (id) => {
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
        `/clases/obtener-clases-mes/${id}`,
        config
      );
      setClaseClienteFecha(data);
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
      const { data } = await clienteAxios.post(`/clases/obtener-dia/${id}`, {
        dia,
      });
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

  const asignarClienteAClase = async (id, idClase, primerClase) => {
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
        `/clases/asignar-cliente-a-clase/${id}`,
        { idClase, primerClase },
        config
      );
      toast.success("Asignado correctamente", {
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
      toast.error(error.response.data.msg, {
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

  const recupero = async (id, idClase) => {
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
        `/clases/asignar-recupero/${id}`,
        { idClase },
        config
      );
      toast.success("Asignado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 3000,
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

  const [clasesOrdenadasInicio, setClasesOrdenadasInicio] = useState([]);

  const obtenerClasesOrdenadasInicio = async () => {
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
        `/clases/obtener-clases-ordenadas-inicio`,
        {},
        config
      );
      setClasesOrdenadasInicio(data);
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
        autoClose: 2000,
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
        autoClose: 2000,
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
        autoClose: 2000,
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

      setAsist(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [inasist, setInasist] = useState([]);

  const comprobarInasistencia = async (id) => {
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
        `/clases/consultar-inasistencias/${id}`,

        config
      );

      setInasist(data);
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

  const [fechaCancelar, setFechaCancelar] = useState("");
  const [idClaseCancelar, setIdClaseCancelar] = useState("");

  const registrarInasistenciaCliente = async (id, claseId, fecha) => {
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
        `/clases/cancelar-clase-cliente-nuevo/${id}`,
        { claseId, fecha },
        config
      );

      if (data.msg1) {
        toast.warning(data.msg1, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success(data.msg2, {
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
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error, {
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

  const [inasistencias, setInasistencias] = useState([]);

  const obtenerInasistencias = async (id) => {
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
        `/clases/obtener-inasistencias/${id}`,
        {},
        config
      );
      setInasistencias(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [asistenciasCliente, setAsistenciasCliente] = useState([]);

  const obtenerAsistenciasCliente = async (id) => {
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
        `/clases/obtener-asistencias/${id}`,
        {},
        config
      );

      setAsistenciasCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const registrarInasistenciaPaginaProfe = async (id, idClase) => {
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
        `/clases/registrar-inasistencia/${id}`,
        { idClase },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const consultarPrimerClase = async (id) => {
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
        `/clases/consultar-primer-clase/${id}`,
        config
      );
      // Actualizar para utilizar solo esPrimerClase
      return data.esPrimerClase;
    } catch (error) {
      console.log(error);
      return false; // Asumir que no es la primera clase en caso de error
    }
  };

  const eliminarClase = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/clases/eliminar-clase/${id}`, config);

      toast.success("Clase eliminada correctamente", {
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
      console.log(error);
    }
  };

  const [clases, setClases] = useState([]);

  const obtenerClases = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/clases/obtener-clases", config);

      setClases(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [clientesClaseVer, setClientesClaseVer] = useState([]);

  const obtenerClientesClaseVer = async (id) => {
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
        `/clases/obtener-clientes-clase/${id}`,
        {},
        config
      );
      setClientesClaseVer(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [inasistentesClase, setInasistentesClase] = useState([]);

  const obtenerInasistentesClase = async (id) => {
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
        `/clases/obtener-inasistentes-clase/${id}`,
        {},
        config
      );

      setInasistentesClase(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [asistenciasClase, setAsistenciasClase] = useState([]);

  const obtenerTodasLasAsistenciasClase = async (id) => {
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
        `/clases/obtener-todas-asistencias-clase/${id}`,
        {},
        config
      );
      setAsistenciasClase(data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarClienteDeClase = async (id, clienteId) => {
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
        `/clases/eliminar-cliente-listado/${id}`,
        { clienteId },
        config
      );

      toast.success("Cliente eliminado de la clase correctamente", {
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
      console.log(error);
    }
  };

  const [asistencias, setAsistencias] = useState([]);

  const obtenerAsistenciasClase = async (id) => {
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
        `/clases/consultar-asistencias/${id}`,
        config
      );
      setAsistencias(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarClase = async (
    id,
    sede,
    diaDeLaSemana,
    horarioInicio,
    profesor,
    creador,
    cupo
  ) => {
    const clase = {
      sede,
      diaDeLaSemana,
      horarioInicio,
      profesor,
      creador,
      cupo,
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

      await clienteAxios.post(`/clases/editar-clase/${id}`, clase, config);

      toast.success("Clase editada correctamente", {
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

  const enviarMensajeClase = async (id, mensaje, asunto) => {
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
        `/clases/enviar-mensaje/${id}`,
        { mensaje, asunto },
        config
      );

      toast.success("Mensaje enviado correctamente", {
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

  const enviarEncuesta = async (
    pregunta1,
    pregunta2,
    pregunta3,
    pregunta4,
    id
  ) => {
    try {
      await clienteAxios.post(`/clases/encuesta-recibida/${id}`, {
        pregunta1,
        pregunta2,
        pregunta3,
        pregunta4,
      });
      toast.success("Encuesta Registrada", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () =>
          (window.location.href = "https://www.kinestretch.com.ar"), // Aquí se maneja la redirección
      });
    } catch (error) {
      console.log(error);
    }
  };

  const inasistenciaRecupero = async (id, idClase) => {
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
        `/clases/eliminar-cliente-recupero/${id}`,
        { idClase },
        config
      );

      toast.success("Recupero Cancelado correctamente", {
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
      toast.error(error.response.data.error, {
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

  const [asistenciasInasistenciasCliente, setAsistenciasInasistenciasCliente] =
    useState([]);

  const obtenerAsistenciasInasistenciasClienteAdmin = async (id) => {
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
        `/clases/obtener-registros-asistencia/${id}`,
        config
      );
      setAsistenciasInasistenciasCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const registrarFeriado = async (fecha, motivo) => {
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
        `/clases/registrar-feriado`,
        { fecha, motivo },
        config
      );

      toast.success("Feriado Registrado correctamente", {
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
      toast.error(error.response.data.error, {
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

  const [feriados, setFeriados] = useState([]);

  const obtenerFeriados = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/clases/obtener-feriados`, config);

      setFeriados(data);
    } catch (error) {
      console.log(error);
    }
  };

  const comunicarFeriado = async (fecha, motivo) => {
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
        `/clases/comunicar-feriado`,
        { fecha, motivo },
        config
      );

      toast.success("Feriado Comunicado correctamente", {
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
      toast.error(error.response.data.error, {
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

  const eliminarFeriado = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`/clases/eliminar-feriado/${id}`, {}, config);

      toast.success("Feriado Eliminado correctamente", {
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
      toast.error(error.response.data.error, {
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

  const registrarInasistenciaClienteLadoAdmin = async (id, claseId, fecha) => {
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
        `/clases/cancelar-clase-cliente-nuevo-lado-admin/${id}`,
        { claseId, fecha },
        config
      );

      if (data.msg1) {
        toast.warning(data.msg1, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success(data.msg2, {
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
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error, {
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
        registrarInasistenciaCliente,
        cupo,
        setCupo,
        modalClaseRecupero,
        handleModalClaseRecupero,
        clasesOrdenadasInicio,
        obtenerClasesOrdenadasInicio,
        recupero,
        inasistencias,
        obtenerInasistencias,
        asistenciasCliente,
        obtenerAsistenciasCliente,
        setClasesOrdenadas,
        registrarInasistenciaPaginaProfe,
        eliminarClase,
        consultarPrimerClase,
        clases,
        obtenerClases,
        idClaseVer,
        setIdClaseVer,
        clientesClaseVer,
        obtenerClientesClaseVer,
        eliminarClienteDeClase,
        diaSeleccionado,
        setDiaSeleccionado,
        asistencias,
        obtenerAsistenciasClase,
        inasist,
        comprobarInasistencia,
        handleModalEditarClase,
        modalEditarClase,
        idClaseEditar,
        setIdClaseEditar,
        editarClase,
        recargoListado,
        setRecargoListado,
        handleModalEnviarMensajeClase,
        modalEnviarMensajeClase,
        enviarMensajeClase,
        enviarEncuesta,
        modalCancelarClase,
        handleModalCancelarClase,
        clasesClienteFecha,
        obtenerClasesConFecha,
        setClaseClienteFecha,
        fechaCancelar,
        setFechaCancelar,
        idClaseCancelar,
        setIdClaseCancelar,
        inasistentesClase,
        obtenerInasistentesClase,
        inasistenciaRecupero,
        asistenciasClase,
        obtenerTodasLasAsistenciasClase,
        asistenciasInasistenciasCliente,
        obtenerAsistenciasInasistenciasClienteAdmin,
        modalRegistrarFeriado,
        handleModalRegistrarFeriado,
        fechaFeriado,
        setFechaFeriado,
        registrarFeriado,
        feriados,
        obtenerFeriados,
        comunicarFeriado,
        motivoFeriado,
        setMotivoFeriado,
        eliminarFeriado,
        modalCancelarClaseACliente,
        handleModalCancelarClaseACliente,
        registrarInasistenciaClienteLadoAdmin,
      }}
    >
      {children}
    </ClasesContext.Provider>
  );
};

export { ClasesProvider };

export default ClasesContext;
