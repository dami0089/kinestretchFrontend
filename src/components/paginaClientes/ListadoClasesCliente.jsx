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

  return (
    <>
      <Typography className="text-center text-xl font-bold uppercase text-blue-gray-500">
        Tu Proxima Clase
      </Typography>

      <div className="mb-4 mt-10 flex justify-center">
        <ToastContainer />

        <div
          className={`grid gap-6 ${
            clasesCliente.length > 1 ? "xl:grid-cols-2" : "xl:grid-cols-1"
          }`}
        >
          {clasesCliente.map((clase) => (
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
                        ? "CLASE CANCELADA"
                        : clase.nombreSede}
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
          ))}
        </div>
      </div>
    </>
  );
};

export default ListadoClasesCliente;
