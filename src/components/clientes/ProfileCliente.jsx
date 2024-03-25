import useAuth from "@/hooks/useAuth";
import useClientes from "@/hooks/useClientes";
import React, { useEffect, useRef, useState } from "react";
import Cargando from "../Cargando";
import { formatearFecha } from "@/helpers/formatearFecha";
import ClasesPorCliente from "./ClasesPorCliente";
import useClases from "@/hooks/useClases";
import ModalAsignarClaseACliente from "./ModalAsignarClaseACliente";
import { ToastContainer } from "react-toastify";
import lottie from "lottie-web";
import editar from "../../../public/lotties/editar.json";
import mensaje from "../../../public/lotties/mensaje.json";
import eliminar from "../../../public/lotties/delete.json";
import alerta from "../../../public/lotties/Alert.json";
import Swal from "sweetalert2";
import ModalEditarCliente from "./ModalEditarCliente";
import ModalEnviarMensaje from "./ModalEnviarMensaje";
import pago from "../../../public/lotties/billing.json";
import calendario from "../../../public/lotties/calendar.json";
import cuenta from "../../../public/lotties/Currency.json";
import activar from "../../../public/lotties/Success.json";
import doctor from "../../../public/lotties/doctor.json";

import ContableCliente from "./ContableCliente";
import ModalRegistrarPago from "./ModalRegistrarPago";
import ModalEditarPago from "./ModalEditarPago";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
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

  const editRef = useRef(null);
  const envelopeRef = useRef(null);
  const plusRef = useRef(null);
  const alert = useRef(null);
  const pay = useRef(null);
  const cal = useRef(null);
  const cur = useRef(null);
  const act = useRef(null);
  const doc = useRef(null);

  useEffect(() => {
    // Cargando las animaciones
    lottie.loadAnimation({
      container: editRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: editar,
    });

    lottie.loadAnimation({
      container: envelopeRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: mensaje,
    });

    lottie.loadAnimation({
      container: plusRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: eliminar,
    });
    lottie.loadAnimation({
      container: pay.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: pago,
    });
    lottie.loadAnimation({
      container: cal.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: calendario,
    });

    lottie.loadAnimation({
      container: cur.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: cuenta,
    });

    lottie.loadAnimation({
      container: act.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: activar,
    });

    lottie.loadAnimation({
      container: doc.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: doctor,
    });
  }, []);

  useEffect(() => {
    if (clasesCliente && clasesCliente.length === 0) {
      lottie.loadAnimation({
        container: alert.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: alerta,
      });
    }
  }, [clasesCliente.length === 0]);

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
        text: "Se eliminara automaticamente al mismo de todas las clases que tenga asignadas",
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
                  <Button
                    onClick={(e) => restarCredito(e)}
                    className=" h-8 w-8 rounded-lg bg-orange-300 p-1 text-white"
                  >
                    -
                  </Button>
                ) : null}

                <Button
                  onClick={(e) => creditos(e)}
                  className=" h-8 w-8 rounded-lg bg-green-300 p-1 text-white"
                >
                  +
                </Button>
                {cliente.creditos > 0 ? (
                  <Button
                    onClick={(e) => recupero(e)}
                    className=" h-8 w-8 rounded-lg bg-light-blue-300 p-1 text-white"
                  >
                    A
                  </Button>
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

          <div class="mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center">
            {/* doc Icon */}
            <div
              ref={doc}
              title="Editar"
              className="hover:cursor-pointer"
              onClick={(e) => handleCertificado(e)}
              style={{ width: 50, height: 50 }}
            ></div>
            {/* Edit Icon */}
            <div
              ref={editRef}
              title="Editar"
              className="hover:cursor-pointer"
              onClick={(e) => handleEditar(e)}
              style={{ width: 50, height: 50 }}
            ></div>
            {/* Trash Icon */}
            {cliente.isActivo === true ? (
              <div
                ref={plusRef}
                title="Desactivar Cliente"
                className="hover:cursor-pointer"
                onClick={(e) => handleDesactivar(e)}
                style={{ width: 50, height: 50 }}
              ></div>
            ) : (
              <div
                ref={act}
                title="Activar Cliente"
                className="hover:cursor-pointer"
                onClick={(e) => handleDesactivar(e)}
                style={{ width: 50, height: 50 }}
              ></div>
            )}

            {/* Message Icon */}
            <div
              ref={envelopeRef}
              title="Mensaje"
              onClick={(e) => handleMensaje(e)}
              className="hover:cursor-pointer"
              style={{ width: 50, height: 50 }}
            ></div>
            {/* Pago Icon */}
            <div
              ref={pay}
              title="Registrar Pago"
              onClick={(e) => handleNuevoPago(e)}
              className="hover:cursor-pointer"
              style={{ width: 50, height: 50 }}
            ></div>
            {/* Asignar Clase Icon */}
            {(clasesCliente && clasesCliente.length === 0) ||
            (clasesCliente && cliente.creditos > 0) ? (
              <div
                ref={alert}
                title="Asignar Clase"
                className="hover:cursor-pointer"
                onClick={(e) => handleAsignarClase(e)}
                style={{ width: 50, height: 50 }}
              ></div>
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
          <div
            ref={cal}
            title="Calendario de clases"
            className="hover:cursor-pointer"
            onClick={(e) => setSelectPerfil(1)}
            style={{ width: 50, height: 50 }}
          ></div>
          <div
            ref={cur}
            title="Pagos realizados"
            className="hover:cursor-pointer"
            onClick={(e) => setSelectPerfil(2)}
            style={{ width: 50, height: 50 }}
          ></div>
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
