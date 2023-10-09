import {
  Avatar,
  Button,
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

const ListadodeClientes = () => {
  const {
    clientes,
    setObtenerUs,
    setSeleccion,
    handleModalEditarCliente,
    setCuitEditar,
    cuitEditar,
    // obtenerUser,
    setObtenerUsuario,
    obtenerClientes,
  } = useClientes();

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerClientes();
    };
    obtenerInfo();
  }, []);

  const navigate = useNavigate();

  const handleClick = async (e, _id, usuarios) => {
    e.preventDefault();
    await setCuitEditar(_id);
    // obtenerUser([usuarios]);
    setSeleccion(8);
  };

  const handleClickEditar = async (e, _id) => {
    e.preventDefault();
    await setCuitEditar(_id);
    handleModalEditarCliente();
    console.log("editando");
  };

  return (
    <>
      <div className="ml-3 mt-3">
        <button
          type="button"
          className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={(e) => setSeleccion(1)}
        >
          <ArrowLeftCircleIcon />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          ></svg>
        </button>
      </div>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Cliente", "Vencimiento", "Mail Factura", "Accion"].map(
                (el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {clientes
              .filter((cliente) => cliente.isActivo) // filtrar solo los clientes con isActivo = true
              .map(
                (
                  { _id, nombre, fechaVencimiento, mailFactura, usuarios },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {nombre}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {formatearFecha(fechaVencimiento)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {mailFactura}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="mx-2 flex text-xs font-medium text-blue-gray-600"
                        >
                          <Button
                            color="blue"
                            className="mx-1 items-center gap-4 px-6 capitalize"
                            fullWidth
                            onClick={(e) => handleClick(e, _id, usuarios)}
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              ver
                            </Typography>
                          </Button>
                          <Button
                            color="gradient"
                            className="items-center gap-4 px-6 capitalize"
                            fullWidth
                            onClick={(e) => handleClickEditar(e, _id)}
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              editar
                            </Typography>
                          </Button>
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

export default ListadodeClientes;
