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
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useClases from "@/hooks/useClases";
import useAuth from "@/hooks/useAuth";

const ListadoClasesCliente = () => {
  const {
    cliente,
    setObtenerUs,
    setSeleccion,
    handleModalEditarCliente,
    setCuitEditar,
    cuitEditar,
    // obtenerUser,
    setObtenerUsuario,
    obtenerClientes,
    idClienteEditar,
    setIdClienteEditar,
    setCliente,
  } = useClientes();

  const {
    asignarClienteAClase,
    obtenerClasesCliente,
    clasesCliente,
    actualizoClasesCliente,
    setActualizoClasesCliente,
  } = useClases();

  const { handleCargando, auth } = useAuth();

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerClasesCliente(auth.cliente);
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerClasesCliente(auth.cliente);
        handleCargando();
        setActualizoClasesCliente(false);
      }
    };
    obtenerInfo();
  }, [actualizoClasesCliente]);

  const navigate = useNavigate();

  return (
    <>
      <Typography className="text-center text-xl font-bold uppercase text-blue-gray-500">
        Tu Proxima Clase
      </Typography>

      <div className="mb-4 mt-10 flex justify-center">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
          {clasesCliente.map((clase) => (
            <div
              key={clase._id}
              className="mx-auto mb-5 max-w-xs overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer xl:mx-0"
              // onClick={(e) => handleVerClase(e)}
            >
              <div className="flex ">
                {/* Columna del Horario */}
                <div className="w-1/4 flex-shrink-0 bg-blue-gray-500 p-4 text-center text-white">
                  {clase.diaDeLaSemana} {clase.horarioInicio} HS
                </div>

                {/* Columna del Profesor y Alumnos */}
                <div className="flex flex-col justify-center p-4">
                  <div className="text-lg font-medium">
                    Profesor {clase.nombreProfe}
                  </div>
                  <div className="text-sm text-gray-600">
                    {clase.nombreSede}
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
