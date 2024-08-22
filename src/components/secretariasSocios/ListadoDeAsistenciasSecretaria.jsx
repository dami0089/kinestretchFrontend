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
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import useClases from "@/hooks/useClases";
import useProfesores from "@/hooks/useProfesores";

import useSedes from "@/hooks/useSedes";
import ModalEditarPagoProfe from "../paginaProfesores/ModalEditarPagoProfe";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ListadoDeAsistenciasSecretaria = () => {
  const { modalEditarPagoProfe } = useClientes();

  const { handleCargando, auth, idSedeSeleccionada } = useAuth();

  const {
    idVerSede,
    asistenciasSede,
    obtenerAsistenciasFecha,
    setAsistInasist,
  } = useSedes();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(asistenciasSede.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [fechaElegida, setFechaElegida] = useState(
    new Date().toISOString().split("T")[0]
  );

  const currentItems = asistenciasSede.slice(indexOfFirstItem, indexOfLastItem);

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
      const fechaHoy = new Date().toISOString().split("T")[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD

      await obtenerAsistenciasFecha(idSedeSeleccionada, fechaHoy);
      handleCargando();
    };
    obtener();
  }, []);

  const handleAsist = async (fecha) => {
    handleCargando();

    await obtenerAsistenciasFecha(idSedeSeleccionada, fecha);
    handleCargando();
  };

  const formatDate = (dateString) => {
    // Tomamos solo la parte de la fecha (año, mes, día)
    const dateOnly = dateString.split("T")[0];
    return dateOnly;
  };

  const MySwal = withReactContent(Swal);

  const handleVerAsistencias = (e, clientes) => {
    e.preventDefault();

    const pagosHtml = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 8px;">Nombre</th>
          <th style="border: 1px solid black; padding: 8px;">Apellido</th>
   
        </tr>
      </thead>
      <tbody>
        ${clientes
          .map(
            (cliente) => `
          <tr>
            <td style="border: 1px solid black; padding: 8px;">
              ${cliente.nombre}
            </td>

            <td style="border: 1px solid black; padding: 8px;">${cliente.apellido}</td>
     
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

    MySwal.fire({
      title: "Clientes Asistentes",
      html: pagosHtml,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Typography className="ml-4 text-center font-bold uppercase text-blue-gray-700">
            Asistencias Fecha
          </Typography>

          <div className="flex">
            <input
              type="date"
              className="ml-4 mr-4 mt-2 w-40 rounded-md border-2 p-2 placeholder-gray-400"
              value={fechaElegida}
              onChange={(e) => setFechaElegida(e.target.value)}
            />
            <Button onClick={(e) => handleAsist(fechaElegida)}>Buscar</Button>
          </div>
        </div>
        <div className="flex">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="mr-2 h-6 w-6 text-green-500 hover:cursor-pointer"
              onClick={(e) => setAsistInasist("a")}
            >
              <path
                fill="currentColor"
                d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"
              />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="mr-2 h-6 w-6 text-red-500 hover:cursor-pointer"
              onClick={(e) => setAsistInasist("b")}
            >
              <path
                fill="currentColor"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
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
                      {["Fecha", "Hora Clase", "Profesor", "Alumnos"].map(
                        (el) => (
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
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(
                      (
                        { _id, fechaClase, horaInicio, clase, clientes },
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
                                  {formatearFecha(fechaClase)}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className={`$ text-xs  font-medium`}
                                >
                                  {clase ? `${clase.horarioInicio} hs` : "-"}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {clase ? clase.nombreProfe : `-`}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div
                                className="flex items-center justify-center gap-4 hover:cursor-pointer"
                                onClick={(e) =>
                                  handleVerAsistencias(e, clientes)
                                }
                              >
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {clientes
                                    ? `${clientes[0].nombre} ${clientes[0].apellido}`
                                    : `-`}
                                </Typography>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
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
          <button className="font-bold">No hay asistencias para mostrar</button>
        </div>
      )}
      {modalEditarPagoProfe ? <ModalEditarPagoProfe /> : null}
    </>
  );
};

export default ListadoDeAsistenciasSecretaria;
