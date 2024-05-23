import useAuth from "@/hooks/useAuth";
import useClientes from "@/hooks/useClientes";
import React, { useEffect, useRef, useState } from "react";
import Cargando from "../Cargando";
import { formatearFecha } from "@/helpers/formatearFecha";
import ClasesPorCliente from "./ClasesPorCliente";
import useClases from "@/hooks/useClases";
import ModalAsignarClaseACliente from "./ModalAsignarClaseACliente";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import ModalEditarCliente from "./ModalEditarCliente";
import ModalEnviarMensaje from "./ModalEnviarMensaje";
import ContableCliente from "./ContableCliente";
import ModalRegistrarPago from "./ModalRegistrarPago";
import ModalEditarPago from "./ModalEditarPago";
import { Button } from "@material-tailwind/react";
import ModalCertificadoMedico from "./ModalCertificadoMedico";
import ModalRecuperoAdmin from "./ModalRecuperoAdmin";

const ProfileCliente = () => {
  const {
    obtenerCliente,
    cliente,
    idClienteEditar,
    desactivarCliente,
    setNombreCliente,
    setApellidoCliente,
    setDniCliente,
    setCelularCliente,
    setFechaNacimientoCliente,
    setDiagnosticoCliente,
    setAptoFisicoCliente,
    setNombreContactoEmergencia,
    setEmailCliente,
    setCelularContactoEmergencia,
    modalEditarCliente,
    handleModalEditarCliente,
    handleModalEnviarMensaje,
    modalEnviarMensaje,
    selectPerfil,
    setSelectPerfil,
    handleModalPago,
    modalPago,
    obtenerPagos,
    modalEditarPago,
    pagosCliente,
    activarCliente,
    otorgarCreditos,
    creditosCliente,
    setCreditosCliente,
    fechaApto,
    setFechaApto,
    linkApto,
    setLinkApto,
    handleModalCertificado,
    modalCertificadoMedico,
    quitarCredito,
    modalRecuperoAdmin,
    handleModalRecuperoAdmin,
  } = useClientes();
  const { handleCargando, cargando } = useAuth();

  const {
    modalAsignarClaseACliente,
    handleModalAsignarClaseACliente,
    actualizoClasesCliente,
    setActualizoClasesCliente,
    obtenerClasesClienteAdmin,
    clasesCliente,
    setClasesCliente,
    inasistenciaCliente,
    verificarInasistenciaClietne,
    setInasistenciaCliente,
  } = useClases();

  useEffect(() => {
    const pagos = async () => {
      handleCargando();
      await obtenerPagos(idClienteEditar);
      handleCargando();
    };
    pagos();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      setSelectPerfil(1);
      handleCargando();
      await obtenerCliente(idClienteEditar);
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      setClasesCliente([]);
      handleCargando();
      await obtenerClasesClienteAdmin(idClienteEditar);
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerCliente(idClienteEditar);
        handleCargando();
        setActualizoClasesCliente(false);
      }
    };
    obtenerInfo();
  }, [actualizoClasesCliente]);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerClasesClienteAdmin(cliente._id);
        handleCargando();
        setActualizoClasesCliente(false);
      }
    };
    obtenerInfo();
  }, [actualizoClasesCliente]);

  useEffect(() => {
    const chequearInasistencias = async () => {
      if (cliente) {
        setInasistenciaCliente([]);
        if (cliente.clases?.length > 0) {
          await verificarInasistenciaClietne(
            cliente.clases[0],
            idClienteEditar
          );
        }
      }
    };
    chequearInasistencias();
  }, [cliente]);

  useEffect(() => {
    const chequearInasistencias = async () => {
      if (actualizoClasesCliente) {
        setInasistenciaCliente([]);
        await verificarInasistenciaClietne(cliente.clases[0], idClienteEditar);
        setActualizoClasesCliente(false);
      }
    };
    chequearInasistencias();
  }, [actualizoClasesCliente]);

  const handleAsignarClase = (e) => {
    e.preventDefault();
    handleModalAsignarClaseACliente();
  };

  const recupero = (e) => {
    e.preventDefault();
    handleModalRecuperoAdmin();
  };

  const handleDesactivar = async (e) => {
    e.preventDefault();
    if (cliente.isActivo) {
      Swal.fire({
        title: "Seguro queres desactivar este cliente?",
        text: "Se eliminara automaticamente al mismo de todas las clases que tenga asignadas",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await desactivarCliente(idClienteEditar);
          setActualizoClasesCliente(true);
        }
      });
    }
    if (!cliente.isActivo) {
      Swal.fire({
        title: "Seguro queres activar este cliente?",
        text: "El cliente volvera al listado de clientes activos",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await activarCliente(idClienteEditar);
          setActualizoClasesCliente(true);
        }
      });
    }
  };

  const handleEditar = (e) => {
    e.preventDefault();
    setNombreCliente(cliente.nombre),
      setApellidoCliente(cliente.apellido),
      setDniCliente(cliente.dni),
      setCelularCliente(cliente.celular),
      setEmailCliente(cliente.email);
    setFechaNacimientoCliente(cliente.fechaNacimiento),
      setDiagnosticoCliente(cliente.diagnostico),
      setAptoFisicoCliente(cliente.aptoFisico),
      setNombreContactoEmergencia(cliente.nombreContactoEmergencia),
      setCelularContactoEmergencia(cliente.celularContactoEmergencia);
    setFechaApto(cliente.fechaApto), setLinkApto(cliente.linkApto);
    handleModalEditarCliente();
  };

  const handleMensaje = (e) => {
    e.preventDefault();
    handleModalEnviarMensaje();
  };

  const handleNuevoPago = (e) => {
    e.preventDefault();
    handleModalPago();
  };

  const creditos = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `Otorgamos 1 credito al cliente?`,
      text: "Se le agregara ese credito a su cuenta",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await otorgarCreditos(idClienteEditar);
        setActualizoClasesCliente(true);
      }
    });
  };

  const restarCredito = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `Restamos 1 credito al cliente?`,
      text: "Se le restara ese credito a su cuenta",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await quitarCredito(idClienteEditar);
        setActualizoClasesCliente(true);
      }
    });
  };

  const handleCertificado = (e) => {
    e.preventDefault();
    handleModalCertificado();
  };

  return (
    <div class="p-16">
      <ToastContainer pauseOnFocusLoss={false} />
      <div class="mt-10 bg-white p-8 shadow">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="order-last mt-20 grid grid-cols-2 text-center md:order-first md:mt-0">
            <div>
              <p class="text-xl font-bold text-gray-700">
                {cliente.creditos ? cliente.creditos : "0"}
              </p>
              <p class="p-1 text-gray-400">Creditos Disponibles</p>
            </div>
            <div className="w-full">
              <p class="text-xl font-bold text-gray-700">← Creditos</p>
              <div className="flex justify-between">
                {cliente.creditos > 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    onClick={(e) => restarCredito(e)}
                    className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
                  >
                    <title>Restar Credito</title>

                    <path fill="currentColor" d="M19 13H5v-2h14z" />
                  </svg>
                ) : null}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  onClick={(e) => creditos(e)}
                  className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
                >
                  <title>Sumar Credito</title>
                  <path
                    fill="currentColor"
                    d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                  />
                </svg>
                {cliente.creditos > 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.76em"
                    height="1em"
                    viewBox="0 0 456 604"
                    className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
                    onClick={(e) => recupero(e)}
                  >
                    <title>Asignar Clase Recupero</title>

                    <path
                      fill="currentColor"
                      d="M46 0h364v1h4v1h3v1l6 2v1h2l5 6l3 2c12.983 19.155 4.316 65.868 9 94v30c2.722 9.717.483 24.526 1 36l2 44v28c1.8 6.413.9 16.938 1 25v5h1v40c1.99 7.1.606 18.26 1 27v3h1v32l3 82l1 64c1.979 7.1.606 18.256 1 27c.233 5.16 2.828 16.7 1 23h-1v5h-1v3h-1v2l-9 12h-2l-1 2h-2l-1 2c-7.484 4.7-19.9 4-32 4H52c-6.813 0-15.8.563-21-1h-5v-1h-3v-1h-2l-12-9v-2l-2-1v-2l-2-1v-2H4v-2H3v-3H2v-5H1c-1.945-6.754.867-18.257 1-24c.195-8.388-.892-19.265 1-26v-9c.008-9.5-1.186-22.216 1-30v-30c1.634-5.8 1-15.564 1-23l1-28v-19c2.189-7.781.992-20.5 1-30v-9h1v-30c3.083-10.96-1.088-26.507 1-39c.916-5.482 1-13.975 1-21v-10h1v-14c0-8.028-.787-18.63 1-25v-30h1v-9c.008-9.5-1.185-22.216 1-30l2-81c0-6.259-.316-14.321 1-19c1.377-4.9-.7-10.022 1-14h1v-2h1v-3l2-1l1-4l2-1l6-7h2V5l6-2V2h3V1h4zm293 12v46c-2.937 1.709-2.863 2.891-8 3a21.9 21.9 0 0 0-4-5V12h-58c.085 15.168 1.451 33.546-1 47c-2.449 1.091-3.225 1.813-7 2l-3-4h-1V12h-58v45c-3.146 1.873-2.838 3.7-8 4c-1.72-2.135-2.033-.566-3-4c-1.812-2.048-1-8.3-1-12V12h-58v33c0 4.206.763 10.318-1 13h-1c-2.066 2.518-2.221 2.919-7 3a20 20 0 0 0-3-3V12H47c-2.324.741-4.921 2.382-8 3l-5 6l-2 1l-4 12l-2 95c-2.191 7.779-.992 20.5-1 30v9c-1.9 6.733-.8 17.614-1 26v4h-1v12c0 9.535.313 21.063-1 29c-1.546 9.345 1.225 21.106-1 29v9c-.008 9.5 1.192 22.222-1 30v30h-1v9c-.009 9.8 1.272 22.94-1 31v18l-1 28c0 7.435.635 17.2-1 23v30c-2.512 8.98-.869 23.257-1 34l-1 22v13c-.892 3.2-2.407 24.644-1 29h1v3h1v2h1v2l2 1v2l2 1c7.353 7.635 15.147 7 30 7h375v-1h3v-1h2v-1l4-1l3-4h1v-2l2-1c3.21-5.107 3-12.7 3-21v-15h-1v-30h-1v-37c-.463-5.344-1-13.176-1-20v-12h-1v-10c0-9.2 1.114-21.506-1-29v-30h-1v-40c-1.642-5.811-.976-15.558-1-23l-1-25v-17c-1-4.037-1-14.716-1-23v-11h-1v-36c-1-4.036-1-14.717-1-23v-11h-1v-17l-3-95c-.284-12.4 1.074-26.446-4-34l-4-3c-1.91-1.9-1.771-3.144-5-4c-3.9-3.871-14.158-3-22-3zM166 514h81c14.582 0 32.111-1.314 45 1l1 3h1c.943 1.683-1.787 6.883-2 7h-2c-1.7 1.491-5.808 1-9 1h-83c-11.132 0-24.485.741-34-1l-1-3c-3.133-3.4 1.434-6.153 3-8"
                      className="cls-1"
                    />
                  </svg>
                ) : null}
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div class="mt-32 flex flex-wrap justify-center space-x-8 md:mt-0">
            {/* doc Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              title="Editar"
              className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
              onClick={(e) => handleCertificado(e)}
            >
              <title>Ver certificado Medico</title>

              <path
                fill="currentColor"
                d="M7 18h2v-2h2v-2H9v-2H7v2H5v2h2zm6-3.5h6V13h-6zm0 3h4V16h-4zM4 22q-.825 0-1.412-.587T2 20V9q0-.825.588-1.412T4 7h5V4q0-.825.588-1.412T11 2h2q.825 0 1.413.588T15 4v3h5q.825 0 1.413.588T22 9v11q0 .825-.587 1.413T20 22zm7-13h2V4h-2z"
              />
            </svg>
            {/* Edit Icon */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              title="Editar"
              viewBox="0 0 24 24"
              onClick={(e) => handleEditar(e)}
              className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
            >
              <title>Editar Cliente</title>

              <path
                fill="currentColor"
                d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h8.386l-1 1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423v-7.489l1-1v8.489q0 .69-.462 1.153T18.384 20zM10 14v-2.615l8.944-8.944q.166-.166.348-.23t.385-.063q.189 0 .368.064t.326.21L21.483 3.5q.16.166.242.365t.083.4t-.061.382q-.06.18-.226.345L12.52 14zm10.814-9.715l-1.112-1.17zM11 13h1.092l6.666-6.666l-.546-.546l-.61-.584L11 11.806zm7.212-7.211l-.61-.585zl.546.546z"
              />
            </svg>
            {/* Trash Icon */}
            {cliente.isActivo === true ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  title="Desactivar Cliente"
                  onClick={(e) => handleDesactivar(e)}
                  className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
                >
                  <title>Desactivar Cliente</title>

                  <rect
                    width="20"
                    height="10"
                    x="2"
                    y="7"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    rx="5"
                  />
                  <circle cx="7" cy="12" r="3" fill="currentColor">
                    <animate
                      fill="freeze"
                      attributeName="cx"
                      dur="0.2s"
                      values="7;17"
                    />
                  </circle>
                </svg>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  title="Activar Cliente"
                  viewBox="0 0 24 24"
                  onClick={(e) => handleDesactivar(e)}
                  className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
                >
                  <title>Activar Cliente</title>

                  <rect
                    width="20"
                    height="10"
                    x="2"
                    y="7"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    rx="5"
                  />
                  <circle cx="17" cy="12" r="3" fill="currentColor">
                    <animate
                      fill="freeze"
                      attributeName="cx"
                      dur="0.2s"
                      values="17;7"
                    />
                  </circle>
                </svg>
              </>
            )}
            {/* Message Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              title="Mensaje"
              height="1em"
              viewBox="0 0 24 24"
              className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
              onClick={(e) => handleMensaje(e)}
            >
              <title>Enviar mensaje</title>

              <path
                fill="currentColor"
                d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M8 14H6v-2h2zm0-3H6V9h2zm0-3H6V6h2zm7 6h-5v-2h5zm3-3h-8V9h8zm0-3h-8V6h8z"
              />
            </svg>
            {/* Pago Icon */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              title="Registrar Pago"
              height="1em"
              className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
              onClick={(e) => handleNuevoPago(e)}
              viewBox="0 0 14 14"
            >
              <title>Registrar Pago</title>

              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="10.5" height="8" x=".5" y="1.75" rx="1" />
                <circle cx="5.75" cy="5.75" r="1.5" />
                <path d="M3.5 12.25h9a1 1 0 0 0 1-1v-5" />
              </g>
            </svg>
            {/* Asignar Clase Icon */}
            {cliente.isActivo ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                title="Asignar Clase"
                onClick={(e) => handleAsignarClase(e)}
                className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="14.5" cy="4.5" r="2.5" />
                  <title>Asignar clase</title>

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 22l3.849-1.373a2 2 0 0 0 1.073-.907M19 22v-5.232a2 2 0 0 0-2.32-1.974l-1.013.165M8.5 14l-.614-.598a1.5 1.5 0 0 1 .456-2.453l2.456-1.053a1.5 1.5 0 0 1 2.09 1.38v2.62a2 2 0 0 1-.254.976l-.678 1.212"
                  />
                </g>
              </svg>
            ) : null}
          </div>
        </div>

        <div class="mt-20 border-b pb-12 text-center">
          <div class="mt-3 flex">
            {/* <!-- Columna izquierda --> */}
            <div class="flex-1 font-light text-gray-600">
              {inasistenciaCliente.data ? (
                <div class="rounded border border-red-500 p-2">
                  <p>
                    {inasistenciaCliente.data ? (
                      <>
                        El cliente tendrá una inasistencia el día{" "}
                        <strong>
                          {formatearFecha(inasistenciaCliente.data)}
                        </strong>
                      </>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* <!-- Columna del centro --> */}
            <div class="flex-1 font-light text-gray-600">
              <h1 class="text-4xl font-medium text-gray-700">
                {cliente.nombre} {cliente.apellido}
              </h1>
              <p class="mt-3 font-light text-gray-600">
                Miembro desde:{" "}
                {cliente.fechaAlta ? formatearFecha(cliente.fechaAlta) : "-"}
              </p>
              {cliente && cliente.isActivo ? (
                ""
              ) : (
                <div class="flex flex-col justify-center">
                  <button className="font-bold text-red-200">
                    Cliente Inactivo
                  </button>
                </div>
              )}
            </div>

            {/* <!-- Columna de la derecha (vacía) --> */}
            <div class="flex-1">{/* <!-- Contenido vacío --> */}</div>
          </div>
        </div>

        <div class="mr-4 mt-2 flex justify-end space-x-4 md:justify-end">
          {/* Calendario */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            title="Calendario de clases"
            viewBox="0 0 24 24"
            onClick={(e) => setSelectPerfil(1)}
            className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M7 11h2v2H7zm14-6v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2M5 7h14V5H5zm14 12V9H5v10zm-4-6v-2h2v2zm-4 0v-2h2v2zm-4 2h2v2H7zm8 2v-2h2v2zm-4 0v-2h2v2z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            title="Pagos realizados"
            height="1em"
            className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
            onClick={(e) => setSelectPerfil(2)}
            viewBox="0 0 14 14"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="10.5" height="8" x=".5" y="1.75" rx="1" />
              <circle cx="5.75" cy="5.75" r="1.5" />
              <path d="M3.5 12.25h9a1 1 0 0 0 1-1v-5" />
            </g>
          </svg>
          {/* Placeholder para el segundo ícono */}
        </div>
        {selectPerfil === 1 ? (
          <div class="mt-4 flex flex-col justify-center">
            {clasesCliente.length !== 0 ? (
              <ClasesPorCliente />
            ) : (
              <div class="mt-5 flex flex-col justify-center">
                <button class="">No tiene clases asignadas</button>
              </div>
            )}
          </div>
        ) : (
          <div class="mt-4 flex flex-col justify-center">
            {pagosCliente && pagosCliente.length > 0 ? (
              <ContableCliente />
            ) : (
              <div class="mt-5 flex flex-col justify-center">
                <button class="">La cuenta no tiene movimientos</button>
              </div>
            )}
          </div>
        )}
      </div>
      {modalAsignarClaseACliente ? <ModalAsignarClaseACliente /> : ""}
      {modalEditarCliente ? <ModalEditarCliente /> : ""}
      {modalEnviarMensaje ? <ModalEnviarMensaje /> : ""}
      {modalPago ? <ModalRegistrarPago /> : ""}
      {modalEditarPago ? <ModalEditarPago /> : ""}
      {modalCertificadoMedico ? <ModalCertificadoMedico /> : ""}
      {modalRecuperoAdmin ? <ModalRecuperoAdmin /> : null}
      <Cargando />
    </div>
  );
};

export default ProfileCliente;
