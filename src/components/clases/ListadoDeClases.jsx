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
import Swal from "sweetalert2";

import useClases from "@/hooks/useClases";
import ModalEditarClase from "./ModalEditarClase";

const ListadoDeClases = () => {
  const { setIdClienteEditar, setCliente } = useClientes();

  const {
    setClasesCliente,
    clases,
    obtenerClases,
    setIdSede,
    idClaseVer,
    setIdClaseVer,
    eliminarClase,
    handleModalEditarClase,
    modalEditarClase,
    idClaseEditar,
    setDiaDeLaSemana,
    setIdClaseEditar,
    setHoraInicio,
    setIdProfesor,
    setCupo,
    recargoListado,
    setRecargoListado,
  } = useClases();

  const { handleCargando } = useAuth();

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerClases();
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (recargoListado) {
        handleCargando();
        await obtenerClases();
        setRecargoListado(false);
        handleCargando();
      }
    };
    obtenerInfo();
  }, [recargoListado]);

  useEffect(() => {
    setCliente([]);
    setClasesCliente([]);
    setIdClienteEditar("");
  }, []);

  const navigate = useNavigate();

  const handleProfile = (e, id) => {
    e.preventDefault();
    handleCargando();
    setIdClaseVer(id);
    navigate(`/clases/listado-alumnos-clase/${id}`);
    handleCargando();
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(clases?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currentItems = clases.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleEliminar = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Eliminamos la clase?",
      text: "Esta accion es irrecuperable",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarClase(id);
        setRecargoListado(true);
        handleCargando();
      }
    });
  };

  const editarClase = (e, id, idSede, dia, hora, profe, cupo) => {
    e.preventDefault();
    setIdClaseEditar(id);
    setIdSede(idSede);
    setDiaDeLaSemana(dia);
    setHoraInicio(hora);
    setIdProfesor(profe);
    setCupo(cupo);
    handleModalEditarClase();
  };

  return (
    <>
      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <div className="mb-3 mt-8 flex items-center justify-between text-black">
            <Typography className="ml-4  font-bold">
              Listado de Clases
            </Typography>

            <div className="mr-5 flex items-center space-x-4"></div>
          </div>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Nombre Sede", "Dia", "Horario", "Profesor", "Accion"].map(
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
                {currentItems.map(
                  (
                    {
                      _id,
                      nombreSede,
                      diaDeLaSemana,
                      horarioInicio,
                      nombreProfe,
                      sede,
                      profesor,
                      cupo,
                    },
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
                              {nombreSede}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {diaDeLaSemana}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {horarioInicio} : 00 hs
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {nombreProfe}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <EyeIcon
                              className="h-8 w-8 hover:cursor-pointer"
                              onClick={(e) => handleProfile(e, _id)}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="h-8 w-8 hover:cursor-pointer"
                              onClick={(e) =>
                                editarClase(
                                  e,
                                  _id,
                                  sede,
                                  diaDeLaSemana,
                                  horarioInicio,
                                  profesor,
                                  cupo
                                )
                              }
                            >
                              <path
                                fill="currentColor"
                                d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-1 2q-.425 0-.712-.288T3 20v-2.425q0-.4.15-.763t.425-.637L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763t-.437.662l-12.6 12.6q-.275.275-.638.425t-.762.15zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 256 256"
                              className="h-8 w-8 hover:cursor-pointer"
                              onClick={(e) => handleEliminar(e, _id)}
                            >
                              <path
                                fill="currentColor"
                                d="M216 50H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12m-22 158a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132ZM82 24a6 6 0 0 1 6-6h80a6 6 0 0 1 0 12H88a6 6 0 0 1-6-6"
                              />
                            </svg>
                          </div>
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
      {modalEditarClase ? <ModalEditarClase /> : null}
    </>
  );
};

export default ListadoDeClases;
