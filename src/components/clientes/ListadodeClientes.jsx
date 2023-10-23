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
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";

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
    idClienteEditar,
    setIdClienteEditar,
    setCliente,
  } = useClientes();

  const { handleCargando } = useAuth();

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerClientes();
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    setCliente([]);
  }, []);

  const navigate = useNavigate();

  const handleProfile = (e, id) => {
    e.preventDefault();
    setIdClienteEditar(id);
    navigate("/clientes/perfil");
  };

  return (
    <>
      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <Typography className="mb-4 ml-4 mt-4 font-bold">
            Listado de Clientes
          </Typography>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Nombre", "Email", "Celular", "Sede", "Accion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 px-6 py-3 text-left"
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
                {clientes.map(
                  (
                    { _id, nombre, apellido, email, celular, nombreSede },
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
                              {nombre} {apellido}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {email}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {celular}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {nombreSede ? nombreSede : "Sin asignar"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Button
                            color="blue"
                            className="mx-1 items-center gap-4 px-6 capitalize"
                            onClick={(e) => handleProfile(e, _id)}
                            fullWidth
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              ver
                            </Typography>
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      <Cargando />
    </>
  );
};

export default ListadodeClientes;
