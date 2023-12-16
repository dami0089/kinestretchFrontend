import {
  Avatar,
  Button,
  Card,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/context";
import {
  ArrowLeftCircleIcon,
  CalendarIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import useClases from "@/hooks/useClases";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

const ListadoClasesCliente = () => {
  const { obtenerCliente } = useClientes();

  const {
    obtenerClasesCliente,
    clasesCliente,
    actualizoClasesCliente,
    setActualizoClasesCliente,
    registrarInasistenciaCliente,
    inasistencias,
  } = useClases();

  const { handleCargando, auth } = useAuth();

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerClasesCliente(auth._id);
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const dataCliente = async () => {
      if (actualizoClasesCliente) {
        await obtenerCliente(auth.cliente);
        setActualizoClasesCliente(false);
      }
    };
    dataCliente();
  }, [actualizoClasesCliente]);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerClasesCliente(auth._id);
        await obtenerCliente(auth.cliente);
        handleCargando();
        setActualizoClasesCliente(false);
      }
    };
    obtenerInfo();
  }, [actualizoClasesCliente]);

  const navigate = useNavigate();

  const handleCancelarClase = (e, clase) => {
    e.preventDefault();
    Swal.fire({
      title: "Queres Cancelar Tu clase?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await registrarInasistenciaCliente(auth._id, clase);
        setActualizoClasesCliente(true);
        handleCargando();
      }
    });
  };

  const esClaseCancelada = (idClase) => {
    if (inasistencias.length > 0) {
      return inasistencias.some(
        (inasistencia) => inasistencia.clase === idClase
      );
    }
  };

  const obtenerProximaFecha = (diaSemana, horaInicio) => {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];

    // Suponiendo que el servidor está en Argentina, GMT-3
    const offsetArgentina = -3;
    let ahora = new Date(new Date().getTime() + offsetArgentina * 3600 * 1000);

    let indiceDiaSemana = dias.indexOf(diaSemana);

    // Si no se encuentra el día o es domingo, devolvemos null o una cadena vacía
    if (indiceDiaSemana === -1 || indiceDiaSemana === 0) {
      return null;
    }

    let diferenciaDias = indiceDiaSemana - ahora.getDay();
    let horaActual = ahora.getHours();

    // Si es el mismo día pero la hora ya pasó, calculamos para la próxima semana
    if (diferenciaDias === 0 && horaInicio <= horaActual) {
      diferenciaDias += 7;
    } else if (diferenciaDias < 0) {
      // Si ya pasó ese día de la semana, calculamos para la próxima semana
      diferenciaDias += 7;
    }

    let proximaFecha = new Date(ahora.getTime());
    proximaFecha.setDate(ahora.getDate() + diferenciaDias);

    return `${proximaFecha.getDate()}/${proximaFecha.getMonth() + 1}`;
  };

  return (
    <>
      <Typography className="text-center text-xl font-bold uppercase text-blue-gray-500">
        Tu Próxima Clase
      </Typography>

      <div className="mb-4 mt-10 flex justify-center">
        <ToastContainer />

        <div
          className={`grid gap-6 ${
            clasesCliente.length > 1 ? "xl:grid-cols-2" : "xl:grid-cols-1"
          }`}
        >
          {clasesCliente.map((clase) => {
            const fechaClase = obtenerProximaFecha(
              clase.diaDeLaSemana,
              parseInt(clase.horarioInicio)
            );
            return (
              <div
                key={clase._id}
                className={`mx-auto mb-5 max-w-md overflow-hidden rounded-lg border ${
                  esClaseCancelada(clase._id) ? "bg-gray-300" : "bg-white"
                } shadow-md xl:mx-0`}
              >
                <div className="flex">
                  {/* Columna del Horario */}
                  <div className="w-4/10 flex flex-col items-center justify-center bg-blue-gray-500 p-4 text-white">
                    <CalendarIcon className="h-8 w-8" />
                    <div className="text-s">{clase.diaDeLaSemana}</div>
                    <div className="text-lg font-bold">
                      {fechaClase ? `${fechaClase} - ` : ""}
                      {clase.horarioInicio} HS
                    </div>
                  </div>

                  {/* Columna del Profesor y Alumnos */}
                  <div className="w-6/10 flex flex-col justify-center p-4">
                    <div className="items-left flex text-lg font-medium">
                      <UserIcon className="mr-2 h-5 w-5" />
                      Profesor {clase.nombreProfe}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`text-l text-gray-600 ${
                          esClaseCancelada(clase._id) ? "text-red-500" : ""
                        }`}
                      >
                        {esClaseCancelada(clase._id)
                          ? "CANCELASTE ESTA CLASE"
                          : clase.nombreSede}
                        {clase.esRecupero ? "-Clase de recupero" : ""}
                      </span>
                      {esClaseCancelada(clase._id) ? (
                        ""
                      ) : (
                        <XCircleIcon
                          title="Cancelar clase"
                          className="h-8 w-8 text-red-300 hover:cursor-pointer"
                          onClick={(e) => handleCancelarClase(e, clase._id)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListadoClasesCliente;
