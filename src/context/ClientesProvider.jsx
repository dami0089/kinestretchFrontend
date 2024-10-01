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
  const [modalEditarCliente, setModalEditarCliente] = useState(false);
  const [modalEnviarMensaje, setModalEnviarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [selectPerfil, setSelectPerfil] = useState(1);
  const [modalPago, setModalPago] = useState(false);
  const [importePagado, setImportePagado] = useState("");
  const [modalEditarPago, setModalEditarPago] = useState(false);
  const [fechaPago, setFechaPago] = useState("");
  const [importePagoEditar, setImportePagoEditar] = useState("");
  const [pagoId, setPagoId] = useState("");
  const [modalVerClaseCliente, setModalVerClaseCliente] = useState(false);
  const [modalEditarDatosPerfilCliente, setModalEditarDatosPerfilCliente] =
    useState(false);

  const [fechaApto, setFechaApto] = useState("");
  const [linkApto, setLinkApto] = useState("");
  const [primerClase, setPrimerClase] = useState("si");
  const [modalCertificadoMedico, setModalCertificadoMedico] = useState(false);
  const [fechaEntregaCertificado, setFechaEntregaCertificado] = useState("");
  const [fechaVencimientoCertificado, setFechaVencimientoCertificado] =
    useState("");
  const [linkCertificado, setLinkCertificado] = useState("");
  const [modalEditarDiagnostico, setModalEditarDiagnostico] = useState(false);
  const [diagnosticoEditar, setDiagnosticoEditar] = useState("");
  const [IdCliente, setIdCliente] = useState("");
  const [actualizarListado, setActualizarListado] = useState(false);

  const [modalRecuperoAdmin, setModalRecuperoAdmin] = useState(false);
  const [medioPago, setMedioPago] = useState("");
  const [refrescarListado, setRefrescarListado] = useState(false);
  const [comentarioPago, setComentarioPago] = useState("");
  const [idClientePago, setIdClientePago] = useState("");
  const [modalEditarPagoProfe, setModalEditarPagoProfe] = useState(false);

  const handleModalEditarPagoProfe = () => {
    setModalEditarPagoProfe(!modalEditarPagoProfe);
  };

  const handleModalRecuperoAdmin = () => {
    setModalRecuperoAdmin(!modalRecuperoAdmin);
  };

  const handleModalEditarDiagnostico = () => {
    setModalEditarDiagnostico(!modalEditarDiagnostico);
  };

  const handleModalCertificado = () => {
    setModalCertificadoMedico(!modalCertificadoMedico);
  };

  const handleModalDatosCliente = () => {
    setModalEditarDatosPerfilCliente(!modalEditarDatosPerfilCliente);
  };

  const handleVerClase = () => {
    setModalVerClaseCliente(!modalVerClaseCliente);
  };

  const handleModalEditarPago = () => {
    setModalEditarPago(!modalEditarPago);
  };

  const handleModalEditarCliente = () => {
    setModalEditarCliente(!modalEditarCliente);
  };

  const handleModalEnviarMensaje = () => {
    setModalEnviarMensaje(!modalEnviarMensaje);
  };

  const handleModalPago = () => {
    setModalPago(!modalPago);
  };

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
    creador,
    fechaApto,
    linkApto,
    sede
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
      fechaApto,
      linkApto,
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

      const { data } = await clienteAxios.post("/clientes", cliente, config);

      setIdClienteEditar(data._id);

      toast.success("Cliente creado correctamente", {
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

  const [clientesInactivos, setClientesInactivos] = useState([]);

  const obtenerClientesInactivos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/clientes/inactivos", config);
      //guarda los datos de los clientes
      setClientesInactivos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  //abre o cierra el modal nuevo cliente
  const handleModalNuevoCliente = () => {
    setModalNuevoCliente(!modalNuevoCliente);
  };

  const editarC = async (
    id,
    nombreCliente,
    apellidoCliente,
    dniCliente,
    emailCliente,
    celularCliente,
    fechaNacimientoCliente,
    diagnosticoCliente,
    aptoFisicoCliente,
    nombreContactoEmergencia,
    celularContactoEmergencia,
    fechaApto,
    linkApto
  ) => {
    const cliente = {
      nombre: nombreCliente,
      apellido: apellidoCliente,
      dni: dniCliente,
      email: emailCliente,
      celular: celularCliente,
      fechaNacimiento: fechaNacimientoCliente,
      diagnostico: diagnosticoCliente,
      aptoFisico: aptoFisicoCliente,
      nombreContactoEmergencia: nombreContactoEmergencia,
      celularContactoEmergencia: celularContactoEmergencia,
      fechaApto: fechaApto,
      linkApto: linkApto,
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
      const { data } = await clienteAxios.put(
        `/clientes/${id}`,
        cliente,
        config
      );

      //Mostrar la alerta
      toast.success("Cliente Editado correctamente", {
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

  const desactivarCliente = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`/clientes/desactivar/${id}`, {}, config);

      toast.success("Cliente desactivado correctamente", {
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

  const activarCliente = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`/clientes/activar/${id}`, {}, config);

      toast.success("Cliente activado correctamente", {
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

  const enviarMensaje = async (id, mensaje, asunto) => {
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
        `/clientes/enviar-mensaje/${id}`,
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

  const registrarPago = async (
    id,
    importe,
    usuario,
    via,
    fecha,
    comentario
  ) => {
    const info = {
      fechaPago: fecha,
      importe: importe,
      usuario: usuario,
      medio: via,
      comentario: comentario,
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

      await clienteAxios.post(`/clientes/registrar-pago/${id}`, info, config);

      toast.success("Pago Registrado correctamente", {
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

  const registrarPagoAdmin = async (id, importe, profesor) => {
    const info = {
      importe: importe,
      profesor: profesor,
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

      await clienteAxios.post(
        `/clientes/registrar-pago-admin/${id}`,
        info,
        config
      );

      toast.success("Pago Registrado correctamente", {
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

  const [pagosCliente, setPagosCliente] = useState([]);
  const obtenerPagos = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/clientes/pagos/${id}`, config);
      setPagosCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarPago = async (id, fecha, importe, medio, comentario) => {
    const pago = {
      fechaPago: fecha,
      importe: importe,
      medio: medio,
      comentario: comentario,
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
      const { data } = await clienteAxios.put(
        `/clientes/editar-pago/${id}`,
        pago,
        config
      );

      //Mostrar la alerta
      toast.success("Pago Editado correctamente", {
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

  const eliminarPago = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(
        `/clientes/eliminar-pago/${id}`,

        config
      );

      //Mostrar la alerta
      toast.success(data.msg, {
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

  const editarCPerfil = async (
    id,
    nombreCliente,
    apellidoCliente,
    dniCliente,
    emailCliente,
    celularCliente,
    fechaNacimientoCliente,
    nombreContactoEmergencia,
    celularContactoEmergencia
  ) => {
    const cliente = {
      nombre: nombreCliente,
      apellido: apellidoCliente,
      dni: dniCliente,
      email: emailCliente,
      celular: celularCliente,
      fechaNacimiento: fechaNacimientoCliente,
      nombreContactoEmergencia: nombreContactoEmergencia,
      celularContactoEmergencia: celularContactoEmergencia,
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
      const { data } = await clienteAxios.put(
        `/clientes/editar-desde-perfil/${id}`,
        cliente,
        config
      );

      //Mostrar la alerta
      toast.success("Datos editados correctamente", {
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

  const [movimientosCliente, setMovimientosCliente] = useState([]);

  const obtenerPagosCliente = async (id) => {
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
        `/clientes/obtener-movimientos-cliente/${id}`,
        {},
        config
      );

      setMovimientosCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const otorgarCreditos = async (id, fechaVencimiento, tipo) => {
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
        `/clientes/otorgar-creditos/${id}`,
        { fechaVencimiento, tipo },
        config
      );

      toast.success("Credito Asignado Correctamente", {
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

  const [creditosCliente, setCreditosCliente] = useState([]);

  const obtenerCreditosCliente = async (id) => {
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
        `/clientes/creditos-activos/${id}`,

        config
      );

      console.log(data);

      setCreditosCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [historialCreditos, setHistorialCreditos] = useState([]);

  const obtenerHistorialCreditosCliente = async (id) => {
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
        `/clientes/historial-creditos/${id}`,
        config
      );

      setHistorialCreditos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const quitarCredito = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`/clientes/quitar-creditos/${id}`, {}, config);

      toast.success("Credito Restado Correctamente", {
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

  const [certificado, setCertificado] = useState([]);

  const obtenerCertificados = async (id) => {
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
        `/clientes/obtener-certificados/${id}`,
        config
      );

      setFechaEntregaCertificado(data.fechaEntrega);
      setFechaVencimientoCertificado(data.fechaVencimiento);
      setLinkCertificado(data.linkDrive);

      setCertificado(data);

      toast.success(data.msg, {
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

  const guardarCertificado = async (id, fechaE, fechaV, link) => {
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
        `/clientes/guardar-certificado/${id}`,
        { fechaE, fechaV, link },
        config
      );

      toast.success(data.msg, {
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

  const editarDiagnostico = async (id, diagnostico) => {
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
        `/clientes/editar-diagnostico/${id}`,
        { diagnostico },
        config
      );

      toast.success(data.msg, {
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

  const eliminarCliente = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/clientes/eliminar-cliente/${id}`, config);
    } catch (error) {
      console.log(error);
    }
  };

  const [clientesSede, setClientesSede] = useState([]);

  const obtenerClientesPorSede = async (id) => {
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
        `/clientes/clientes-por-sede/${id}`,
        config
      );
      //guarda los datos de los clientes
      setClientesSede(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [clientesInactivosSede, setClientesInactivosSede] = useState([]);

  const obtenerClientesInactivosPorSede = async (id) => {
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
        `/clientes/clientes-inactivos-por-sede/${id}`,
        config
      );
      //guarda los datos de los clientes
      setClientesInactivosSede(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [clientesSinClase, setClientesSinClase] = useState([]);

  const obtenerClientesSinClase = async () => {
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
        `/clientes/clientes-sin-clases`,
        config
      );

      setClientesSinClase(data);
    } catch (error) {
      console.log(error);
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
        clientesInactivos,
        obtenerClientesInactivos,
        desactivarCliente,
        handleModalEditarCliente,
        modalEditarCliente,
        editarC,
        handleModalEnviarMensaje,
        modalEnviarMensaje,
        mensaje,
        setMensaje,
        enviarMensaje,
        selectPerfil,
        setSelectPerfil,
        registrarPago,
        handleModalPago,
        modalPago,
        importePagado,
        setImportePagado,
        pagosCliente,
        obtenerPagos,
        handleModalEditarPago,
        modalEditarPago,
        fechaPago,
        setFechaPago,
        importePagoEditar,
        setImportePagoEditar,
        editarPago,
        pagoId,
        setPagoId,
        handleVerClase,
        modalVerClaseCliente,
        activarCliente,
        modalEditarDatosPerfilCliente,
        handleModalDatosCliente,
        editarCPerfil,
        movimientosCliente,
        obtenerPagosCliente,
        registrarPagoAdmin,
        otorgarCreditos,
        creditosCliente,
        setCreditosCliente,
        fechaApto,
        setFechaApto,
        linkApto,
        setLinkApto,
        primerClase,
        setPrimerClase,
        fechaEntregaCertificado,
        setFechaEntregaCertificado,
        fechaVencimientoCertificado,
        setFechaVencimientoCertificado,
        linkCertificado,
        setLinkCertificado,
        handleModalCertificado,
        modalCertificadoMedico,
        certificado,
        obtenerCertificados,
        guardarCertificado,
        diagnosticoEditar,
        setDiagnosticoEditar,
        IdCliente,
        setIdCliente,
        handleModalEditarDiagnostico,
        modalEditarDiagnostico,
        editarDiagnostico,
        actualizarListado,
        setActualizarListado,
        quitarCredito,
        modalRecuperoAdmin,
        handleModalRecuperoAdmin,
        medioPago,
        setMedioPago,
        refrescarListado,
        setRefrescarListado,
        eliminarPago,
        comentarioPago,
        setComentarioPago,
        idClientePago,
        setIdClientePago,
        handleModalEditarPagoProfe,
        modalEditarPagoProfe,
        eliminarCliente,
        clientesSede,
        obtenerClientesPorSede,
        creditosCliente,
        obtenerCreditosCliente,
        historialCreditos,
        obtenerHistorialCreditosCliente,
        clientesSinClase,
        obtenerClientesSinClase,
        clientesInactivosSede,
        obtenerClientesInactivosPorSede,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export { ClientesProvider };

export default ClientesContext;
