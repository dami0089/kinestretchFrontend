import {
  Avatar,
  Button,
  Card,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/context";
import { ArrowLeftCircleIcon, EyeIcon } from "@heroicons/react/24/solid";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import useClases from "@/hooks/useClases";

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

  const { setClasesCliente } = useClases();

  const { handleCargando } = useAuth();

  const [nombreFiltrado, setNombreFiltrado] = useState("");
  const [clientesFiltrado, setClientesFiltrados] = useState([]);

  const handleNombreClienteChange = (e) => {
    const inputValue = e.target.value;
    setNombreFiltrado(inputValue);

    const coincidencias = clientes.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(inputValue.toLowerCase()) ||
        cliente.apellido.toLowerCase().includes(inputValue.toLowerCase())
    );
    setClientesFiltrados(coincidencias);
  };

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
    setClasesCliente([]);
    setIdClienteEditar("");
  }, []);

  const navigate = useNavigate();

  const handleProfile = (e, id) => {
    e.preventDefault();
    handleCargando();

    setIdClienteEditar(id);
    navigate("/clientes/perfil");
    handleCargando();
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(clientes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currentItems = nombreFiltrado
    ? clientesFiltrado
    : clientes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <div className="mb-3 mt-8 flex items-center justify-between text-black">
            <Typography className="ml-4  font-bold">
              Listado de Clientes
            </Typography>

            <div className="mr-5 flex items-center space-x-4">
              <input
                className="mb-4 mt-2 rounded-md border-2 p-2 placeholder-gray-400"
                type="text"
                autoComplete="off"
                placeholder="Filtrar por Cliente"
                value={nombreFiltrado}
                onChange={handleNombreClienteChange}
              />
            </div>
          </div>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Nombre", "Email", "Celular", "Sede", "Accion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 px-6 py-3 text-center"
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
                {clientesFiltrado.length > 0 ? (
                  <>
                    {clientesFiltrado.map(
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
                              <div className="flex items-center justify-center gap-4">
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
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {email}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {celular}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {nombreSede ? nombreSede : "Sin asignar"}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <EyeIcon
                                  className="h-8 w-8 hover:cursor-pointer"
                                  onClick={(e) => handleProfile(e, _id)}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </>
                ) : (
                  <>
                    {currentItems.map(
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
                              <div className="flex items-center justify-center gap-4">
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
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {email}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {celular}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {nombreSede ? nombreSede : "Sin asignar"}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <EyeIcon
                                  className="h-8 w-8 hover:cursor-pointer"
                                  onClick={(e) => handleProfile(e, _id)}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      <div className="mb-4 mt-4 flex items-center justify-center">
        <Button
          color="blue"
          className="mx-1"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Typography variant="small" className="mx-1">
          Página {currentPage} de {totalPages === 0 ? "1" : totalPages}
        </Typography>
        <Button
          color="blue"
          className="mx-1"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
      <Cargando />
    </>
  );
};

export default ListadodeClientes;
