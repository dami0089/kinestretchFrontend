import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import useClases from "@/hooks/useClases";
import useProfesores from "@/hooks/useProfesores";

import useSedes from "@/hooks/useSedes";
import ModalEditarPago from "../clientes/ModalEditarPago";
import ModalEditarPagoProfe from "../paginaProfesores/ModalEditarPagoProfe";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ListadoDeFeriados = () => {
  const { modalEditarPagoProfe } = useClientes();

  const { handleCargando } = useAuth();

  const { feriados, obtenerFeriados, eliminarFeriado } = useClases();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(feriados.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = feriados.slice(indexOfFirstItem, indexOfLastItem);
  const [actualizarListado, setActualizarListado] = useState(false);

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

  useEffect(() => {
    const obtener = async () => {
      handleCargando();
      await obtenerFeriados();
      handleCargando();
    };
    obtener();
  }, []);

  useEffect(() => {
    const obtener = async () => {
      if (actualizarListado) {
        handleCargando();
        await obtenerFeriados();
        handleCargando();
        setActualizarListado(false);
      }
    };
    obtener();
  }, [actualizarListado]);

  const handleEliminar = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarFeriado(id);
        setActualizarListado(true);
        handleCargando();
      }
    });
  };

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <Typography className="ml-4 text-center font-bold uppercase text-blue-gray-700">
            Listado de Feriados
          </Typography>
        </div>
      </div>

      {currentItems && currentItems.length > 0 ? (
        <>
          <div className=" mb-4 mt-3 grid grid-cols-1 gap-6  xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-3">
              <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Fecha", "Motivo", "Borrar"].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 bg-orange-50 px-6 py-3 text-center"
                        >
                          <Typography
                            variant="small"
                            className=" text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(({ _id, fechaFeriado, motivo }, key) => {
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
                                {formatearFecha(fechaFeriado)}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center justify-center gap-4">
                              <Typography
                                variant="small"
                                className={`$ text-xs  font-medium`}
                              >
                                {motivo}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center justify-center gap-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                className="h-6 w-6 text-red-500 hover:cursor-pointer"
                                onClick={(e) => handleEliminar(e, _id)}
                              >
                                <path
                                  fill="currentColor"
                                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708"
                                />
                              </svg>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
              <Cargando />
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
        </>
      ) : (
        <div class="mb-5 mt-5 flex flex-col justify-center">
          <button className="font-bold">
            No hay inasistencias para mostrar
          </button>
        </div>
      )}
      {modalEditarPagoProfe ? <ModalEditarPagoProfe /> : null}
    </>
  );
};

export default ListadoDeFeriados;
