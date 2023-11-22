import useAuth from "@/hooks/useAuth";
import useClientes from "@/hooks/useClientes";
import React, { useEffect, useRef, useState } from "react";
import Cargando from "../Cargando";
import { formatearFecha } from "@/helpers/formatearFecha";
import ClasesPorCliente from "../clientes/ClasesPorCliente";
import useClases from "@/hooks/useClases";
import ModalAsignarClaseACliente from "../clientes/ModalAsignarClaseACliente";
import { ToastContainer } from "react-toastify";
import lottie from "lottie-web";
import editar from "../../../public/lotties/editar.json";
import mensaje from "../../../public/lotties/mensaje.json";
import eliminar from "../../../public/lotties/delete.json";
import alerta from "../../../public/lotties/Alert.json";
import Swal from "sweetalert2";

import ModalEditarCliente from "../clientes/ModalEditarCliente";
import ModalEnviarMensaje from "../clientes/ModalEnviarMensaje";
import pago from "../../../public/lotties/billing.json";
import calendario from "../../../public/lotties/calendar.json";
import cuenta from "../../../public/lotties/Currency.json";
import activar from "../../../public/lotties/Success.json";

import ContableCliente from "../clientes/ContableCliente";
import ModalRegistrarPago from "../clientes/ModalRegistrarPago";
import ModalEditarPago from "../clientes/ModalEditarPago";
import useProfesores from "@/hooks/useProfesores";
import ClasesProfesorPerfil from "./ClasesProfesorPerfil";
import ModalClaseProfePerfilAdmin from "./ModalClaseProfePerfilAdmin";
import ContableProfesor from "./ContableProfesor";
import ModalRegistrarPagoProfesor from "../paginaProfesores/ModalRegistrarPagoProfesor";
import ModalRegistrarPagoPerfilProfesor from "./ModalRegistrarPagoPerfilProfesor";

const PerfilProfesor = () => {
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
    modalClaseProfePerfilAdmin,
    handleModalClaseProfePerfilAdmin,
    modalPagoProfesorPerfil,
  } = useClases();

  const {
    idProfesor,
    profesor,
    obtenerProfesor,
    registrosContbalesProfe,
    obtenerRegistrosContablesProfesorAdmin,
    desactivarProfe,
  } = useProfesores();

  useEffect(() => {
    const obtener = async () => {
      await obtenerRegistrosContablesProfesorAdmin(profesor._id);
    };
    obtener();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      setSelectPerfil(1);
      handleCargando();
      await obtenerProfesor(idProfesor);
      handleCargando();
    };
    obtenerInfo();
  }, []);

  const handleAsignarClase = (e) => {
    e.preventDefault();
    handleModalAsignarClaseACliente();
  };

  const editRef = useRef(null);
  const envelopeRef = useRef(null);
  const plusRef = useRef(null);
  const alert = useRef(null);
  const pay = useRef(null);
  const cal = useRef(null);
  const cur = useRef(null);
  const act = useRef(null);

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
    if (profesor.isActivo) {
      Swal.fire({
        title: "Seguro queres desactivar este profesor?",
        text: "Se eliminara automaticamente al mismo de todas las clases que tenga asignadas",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          handleCargando();
          await desactivarProfe(profesor._id);
          setActualizoClasesCliente(true);
          handleCargando();
        }
      });
    }
    if (!profesor.isActivo) {
      Swal.fire({
        title: "Seguro queres activar este Profesor?",
        text: "Se eliminara automaticamente al mismo de todas las clases que tenga asignadas",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          handleCargando();
          await desactivarProfe(profesor._id);
          setActualizoClasesCliente(true);
          handleCargando();
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

  return (
    <div class="p-16">
      <ToastContainer pauseOnFocusLoss={false} />
      <div class="mt-10 bg-white p-8 shadow">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="order-last mt-20 grid grid-cols-2 text-center md:order-first md:mt-0">
            <div>
              <p class="text-gray-400">Nombre</p>
              <p class=" text-l font-bold text-gray-700">
                {profesor.nombre} {profesor.apellido}
              </p>
            </div>
            <div>
              <p class="text-gray-400">Ingreso</p>
              <p class="text-l font-bold text-gray-700">
                {formatearFecha(profesor.fechaAlta)}
              </p>
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
            {/* Edit Icon */}
            <div
              ref={editRef}
              title="Editar"
              className="hover:cursor-pointer"
              onClick={(e) => handleEditar(e)}
              style={{ width: 50, height: 50 }}
            ></div>
            {/* Trash Icon */}
            {profesor.isActivo === true ? (
              <div
                ref={plusRef}
                title="Desactivar Profesor"
                className="hover:cursor-pointer"
                onClick={(e) => handleDesactivar(e)}
                style={{ width: 50, height: 50 }}
              ></div>
            ) : (
              <div
                ref={act}
                title="Activar Profesor"
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
            {clasesCliente && clasesCliente.length === 0 ? (
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

        <div class="mt-5 border-b pb-12 text-center">
          <div class=" flex">
            {/* <!-- Columna izquierda --> */}
            <div class="flex-1 font-light text-gray-600"></div>

            {/* <!-- Columna del centro --> */}
            <div class="flex-1 font-light text-gray-600">
              {profesor && profesor.isActivo ? (
                ""
              ) : (
                <div class="flex flex-col justify-center">
                  <button className="font-bold text-red-200">
                    Profesor Inactivo
                  </button>
                </div>
              )}
            </div>
            {/* <!-- Columna de la derecha (vacía) --> */}
            <div class="flex-1">{/* <!-- Contenido vacío --> */}</div>
          </div>
        </div>

        <div class="mb-5 mr-4 flex justify-end space-x-4 md:justify-end">
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
          <div class=" flex flex-col justify-center">
            {profesor && profesor.clases && profesor.clases.length !== 0 ? (
              <ClasesProfesorPerfil />
            ) : (
              <div class="mt-5 flex flex-col justify-center">
                <button class="">No tiene clases asignadas</button>
              </div>
            )}
          </div>
        ) : (
          <div class=" flex flex-col justify-center">
            {registrosContbalesProfe && registrosContbalesProfe.length > 0 ? (
              <ContableProfesor />
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
      {modalClaseProfePerfilAdmin ? <ModalClaseProfePerfilAdmin /> : ""}
      {modalPagoProfesorPerfil ? <ModalRegistrarPagoPerfilProfesor /> : ""}
      <Cargando />
    </div>
  );
};

export default PerfilProfesor;
