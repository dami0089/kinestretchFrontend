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
import useProfesores from "@/hooks/useProfesores";

const EditarDatosPerfilProfe = () => {
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
    obtenerCliente,
  } = useClientes();

  const {
    asignarClienteAClase,
    obtenerClasesCliente,
    clasesCliente,
    actualizoClasesCliente,
    setActualizoClasesCliente,
  } = useClases();

  const { handleCargando, auth } = useAuth();

  const { profesor } = useProfesores();

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
        Tus Datos
      </Typography>

      <div className="mb-4 mt-10 flex justify-center">
        <div className="ml-8 mr-8 grid grid-cols-2 gap-6 xl:grid-cols-4">
          <div>
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="Nombre"
            >
              Nombre
            </label>
            <input
              id="Nombre"
              className="mb-5 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
              type="text"
              placeholder="Ingrese el Nombre"
              disabled={true}
              value={profesor.nombre}
              // onChange={(e) => setImportePagado1(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="Apellido"
            >
              Apellido
            </label>
            <input
              id="Apellido"
              className="mb-5 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
              type="text"
              placeholder="Ingrese el Apellido"
              disabled={true}
              value={profesor.apellido}
              // onChange={(e) => setImportePagado2(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="DNI"
            >
              DNI
            </label>
            <input
              id="origen2"
              className="mb-5 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
              type="text"
              placeholder="Ingrese el DNI"
              disabled={true}
              value={profesor.dni}
              // onChange={(e) => setImportePagado2(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              id="origen2"
              className="mb-5 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
              type="text"
              placeholder="Ingrese el Email"
              disabled={true}
              value={profesor.email}
              // onChange={(e) => setImportePagado2(e.target.value)}
            ></input>
          </div>

          <div>
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="Celular"
            >
              Celular
            </label>
            <input
              id="origen2"
              className="mb-5 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
              type="text"
              placeholder="Ingrese el Celular"
              value={profesor.celular}
              disabled={true}
              // onChange={(e) => setImportePagado2(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarDatosPerfilProfe;
