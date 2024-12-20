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
import ListadoAsistenciasInasistenciasCliente from "./ListadoAsistenciasInasistenciasCliente";
import HistorialCreditosCliente from "./HistorialCreditosCliente";
import UsuarioCliente from "./UsuarioCliente";

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
    refrescarListado,
    setRefrescarListado,
    creditosCliente,
    obtenerCreditosCliente,
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
    asistenciasInasistenciasCliente,
    obtenerAsistenciasInasistenciasClienteAdmin,
  } = useClases();

  useEffect(() => {
    const pagos = async () => {
      handleCargando();
      await obtenerPagos(idClienteEditar);
      await obtenerCreditosCliente(idClienteEditar);
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
      await obtenerAsistenciasInasistenciasClienteAdmin(idClienteEditar);
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerCliente(idClienteEditar);
        await obtenerCreditosCliente(idClienteEditar);
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

  useEffect(() => {
    const pagos = async () => {
      if (refrescarListado) {
        handleCargando();
        await obtenerPagos(idClienteEditar);
        setRefrescarListado(false);
        handleCargando();
      }
    };
    pagos();
  }, [refrescarListado]);

  const handleAsignarClase = (e) => {
    e.preventDefault();
    handleModalAsignarClaseACliente();
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

    // Calculamos la fecha de 30 días después de hoy
    const hoy = new Date();
    const fechaPorDefecto = new Date(hoy.setDate(hoy.getDate() + 30))
      .toISOString()
      .split("T")[0]; // Convertimos a formato YYYY-MM-DD

    Swal.fire({
      title: `¿Otorgamos 1 crédito al cliente?`,
      text: "Se le agregará ese crédito a su cuenta",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      html: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label for="fechaVencimiento">Fecha de vencimiento</label>
          <input id="fechaVencimiento" type="date" value="${fechaPorDefecto}" min="${
        new Date().toISOString().split("T")[0]
      }" class="swal2-input" />
        </div>
        <div>
          <label for="tipoCredito">Tipo de crédito</label>
          <select id="tipoCredito" class="swal2-input">
            <option value="recupero">Recupero de clase</option>
            <option value="extra">Clase Extra</option>
            <option value="suelta">Clase Suelta</option>
            <option value="otros">Otros</option>
          </select>
        </div>
      </div>
    `,
      preConfirm: () => {
        const fechaVencimiento =
          document.getElementById("fechaVencimiento").value;
        const tipoCredito = document.getElementById("tipoCredito").value;

        if (!fechaVencimiento || !tipoCredito) {
          Swal.showValidationMessage(
            "Por favor, selecciona una fecha y un tipo de crédito"
          );
          return null;
        }

        return { fechaVencimiento, tipoCredito };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        const { fechaVencimiento, tipoCredito } = result.value; // Accede a la fecha y el tipo seleccionados
        await otorgarCreditos(idClienteEditar, fechaVencimiento, tipoCredito);
        setActualizoClasesCliente(true);
        handleCargando();
      }
    });
  };

  const handleCertificado = (e) => {
    e.preventDefault();
    handleModalCertificado();
  };

  const handleVerHistorial = (e) => {
    e.preventDefault();
    setSelectPerfil(4);
  };

  return (
    <div class="p-16">
      <ToastContainer pauseOnFocusLoss={false} />
      <div class="mt-10 bg-white p-8 shadow">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="order-last mt-20 grid grid-cols-2 text-center md:order-first md:mt-0">
            <div>
              <p class="text-xl font-bold text-gray-700">
                {creditosCliente && creditosCliente.length > 0
                  ? creditosCliente.length
                  : "0"}
              </p>
              <p class="p-1 text-gray-400">Creditos Disponibles</p>
            </div>
            <div className="w-full flex-col items-center text-center">
              <p class="text-xl font-bold text-gray-700">← Creditos</p>
              <div className="flex items-center justify-between align-middle hover:cursor-pointer">
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

                <p
                  className="text-blue-gray-500"
                  onClick={(e) => handleVerHistorial(e)}
                >
                  Historial de creditos
                </p>
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

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
              onClick={(e) => setSelectPerfil(3)}
            >
              <title>Ver Asistencias/Inasistencias</title>

              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M17 7h6v16H7v-4m16-8h-6M13 0v3M1 7h16M1 3h16v16H1zm4-3v3m-1 8h2m2 0h6M4 15h2m2 0h6"
              />
            </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
            className="mb-4 h-[35px] w-[35px] text-[#C5CAE8] hover:cursor-pointer"
            onClick={(e) => setSelectPerfil(5)}
          >
            <title>Ver usuario</title>

            <path
              fill="currentColor"
              d="M512 512a192 192 0 1 0 0-384a192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512a256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0"
            />
          </svg>
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
        ) : selectPerfil === 2 ? (
          <div class="mt-4 flex flex-col justify-center">
            {pagosCliente && pagosCliente.length > 0 ? (
              <ContableCliente />
            ) : (
              <div class="mt-5 flex flex-col justify-center">
                <button class="">La cuenta no tiene movimientos</button>
              </div>
            )}
          </div>
        ) : selectPerfil === 3 ? (
          <div class="mt-4 flex flex-col justify-center">
            {asistenciasInasistenciasCliente &&
            asistenciasInasistenciasCliente.length > 0 ? (
              <ListadoAsistenciasInasistenciasCliente />
            ) : (
              <div class="mt-5 flex flex-col justify-center">
                <button class="">El cliente no tiene registros</button>
              </div>
            )}
          </div>
        ) : selectPerfil === 4 ? (
          <div class="mt-4 flex flex-col justify-center">
            <HistorialCreditosCliente />
          </div>
        ) : selectPerfil === 5 ? (
          <div class="mt-4 flex flex-col justify-center">
            <UsuarioCliente />
          </div>
        ) : null}
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
