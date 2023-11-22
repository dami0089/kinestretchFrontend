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

const EditarDatosPerfil = () => {
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
              value={cliente.nombre}
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
              value={cliente.apellido}
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
              value={cliente.dni}
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
              value={cliente.email}
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
              value={cliente.celular}
              disabled={true}
              // onChange={(e) => setImportePagado2(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="Contacto2"
            >
              Nombre Contacto De Emergencia
            </label>
            <input
              id="Contacto2"
              className="mb-5 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
              type="text"
              placeholder="Ingrese el Contacto de Emergencia"
              disabled={true}
              value={cliente.nombreContactoEmergencia}
              // onChange={(e) => setImportePagado2(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="Contacto3"
            >
              Telefono Contacto De Emergencia
            </label>
            <input
              id="Contacto3"
              className="mb-5 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
              type="text"
              placeholder="Ingrese el Telefono del Contacto"
              disabled={true}
              value={cliente.celularContactoEmergencia}
              // onChange={(e) => setImportePagado2(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarDatosPerfil;
