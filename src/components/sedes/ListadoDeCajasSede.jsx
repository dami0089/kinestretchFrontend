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
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const ListadoDeCajasSede = () => {
  const {
    cliente,

    setIdClienteEditar,

    pagosCliente,
    obtenerPagos,
    idClienteEditar,
    handleModalEditarPago,
    fechaPago,
    setFechaPago,
    importePagoEditar,
    setImportePagoEditar,
    pagoId,
    setPagoId,
    setImportePagado,
    setMedioPago,
    setIdClientePago,
    setComentarioPago,
    modalEditarPagoProfe,
    handleModalEditarPagoProfe,
    actualizarListado,
    setActualizarListado,
  } = useClientes();

  const { registrosContbalesProfe, obtenerRegistrosContablesProfesor } =
    useProfesores();

  const { actualizoClasesCliente, setActualizoClasesCliente } = useClases();
  const { handleCargando, auth } = useAuth();

  const { cajasSede, obtenerCajasSede, idVerSede, cerrarCaja } = useSedes();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(cajasSede.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = cajasSede.slice(indexOfFirstItem, indexOfLastItem);

  const MySwal = withReactContent(Swal);

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
      await obtenerCajasSede(idVerSede);
      handleCargando();
    };
    obtener();
  }, []);

  useEffect(() => {
    const pagos = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerCajasSede(idVerSede);
        handleCargando();
        setActualizoClasesCliente(false);
      }
    };
    pagos();
  }, [actualizoClasesCliente]);

  useEffect(() => {
    const pagos = async () => {
      if (actualizarListado) {
        handleCargando();
        await obtenerCajasSede(idVerSede);
        handleCargando();
        setActualizarListado(false);
      }
    };
    pagos();
  }, [actualizarListado]);

  const handleVerPagos = (e, pagos) => {
    e.preventDefault();

    const pagosHtml = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 8px;">Fecha</th>
          <th style="border: 1px solid black; padding: 8px;">Importe</th>
          <th style="border: 1px solid black; padding: 8px;">Medio</th>
          <th style="border: 1px solid black; padding: 8px;">Cliente</th>
        </tr>
      </thead>
      <tbody>
        ${pagos
          .map(
            (pago) => `
          <tr>
            <td style="border: 1px solid black; padding: 8px;">${new Date(
              pago.fechaPago
            ).toLocaleDateString()}</td>
            <td style="border: 1px solid black; padding: 8px;">${
              pago && pago.nombreCliente
                ? `$ ${pago.importe}`
                : `-$ ${pago.importe}`
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              pago && pago.nombreCliente ? `${pago.medio}` : `Efectivo`
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              pago && pago.nombreCliente
                ? `${pago.nombreCliente}`
                : `${pago.nombreProfe}`
            }</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

    MySwal.fire({
      title: "Pagos",
      html: pagosHtml,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Cerrar",
    });
  };

  const handleCerrarCaja = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Cerrar la caja?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await cerrarCaja(id);
        handleCargando();
        setActualizarListado(true);
      }
    });
  };

  return (
    <>
      <Typography className="ml-4 text-start font-bold uppercase text-blue-gray-700">
        Cajas Sede
      </Typography>
      {currentItems && currentItems.length > 0 ? (
        <>
          <div className=" mb-4 mt-3 grid grid-cols-1 gap-6  xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-3">
              <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {[
                        "Fecha",
                        "Profesor",
                        "Pagos",
                        "Importe",
                        "Estado Caja",
                        "Accion",
                      ].map((el) => (
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
                    {currentItems.map(
                      (
                        { _id, fechaCaja, pagos, profesor, totalCaja, estado },
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
                                  {formatearFecha(fechaCaja)}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className={`text-xs font-medium  ${
                                    profesor && profesor.nombre
                                      ? "text-blue-gray-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {profesor && profesor.nombre
                                    ? `${profesor.nombre} ${profesor.apellido}`
                                    : "-"}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600 hover:cursor-pointer"
                                  onClick={(e) => handleVerPagos(e, pagos)}
                                >
                                  {pagos ? `${pagos.length}` : `-`}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {totalCaja ? `$ ${totalCaja}` : "-"}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {estado ? `${estado}` : "-"}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              {estado === "Abierta" ? (
                                <>
                                  <div className="flex items-center justify-center gap-4">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 16 16"
                                      className="h-6 w-6 hover:cursor-pointer"
                                      onClick={(e) => handleCerrarCaja(e, _id)}
                                    >
                                      <g
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                      >
                                        <path d="m8.621 8.086l-.707-.707L6.5 8.793L5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414l.707.707L6.5 10.207l1.414 1.414l.707-.707L7.207 9.5z" />
                                        <path d="m5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2zm1 2h4l1 1v4h2V3H6zm4 1H3v7h7z" />
                                      </g>
                                    </svg>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center justify-center gap-4">
                                  -
                                </div>
                              )}
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
          <button className="font-bold">
            No hay cobros sin liquidar para mostrar
          </button>
        </div>
      )}
      {modalEditarPagoProfe ? <ModalEditarPagoProfe /> : null}
    </>
  );
};

export default ListadoDeCajasSede;
