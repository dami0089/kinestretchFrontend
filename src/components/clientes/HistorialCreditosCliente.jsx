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

import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";

import { formatearFecha } from "@/helpers/formatearFecha";
import Swal from "sweetalert2";
import useClases from "@/hooks/useClases";
import ModalRecuperoAdmin from "./ModalRecuperoAdmin";

const HistorialCreditosCliente = () => {
  const {
    historialCreditos,
    obtenerHistorialCreditosCliente,
    idClienteEditar,
    quitarCredito,
    modalRecuperoAdmin,
    handleModalRecuperoAdmin,
  } = useClientes();

  const {
    setActualizoClasesCliente,
    tipoCreditoAsignar,
    setTipoCreditoAsignar,
    idCreditoAsignar,
    setIdCreditoAsignar,
    actualizarHistorial,
    setActualizarHistorial,
  } = useClases();

  const { handleCargando } = useAuth();

  useEffect(() => {
    const traerData = async () => {
      handleCargando();
      await obtenerHistorialCreditosCliente(idClienteEditar);
      handleCargando();
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      if (actualizarHistorial) {
        handleCargando();
        await obtenerHistorialCreditosCliente(idClienteEditar);
        handleCargando();
        setActualizarHistorial(false);
      }
    };
    traerData();
  }, [actualizarHistorial]);

  const restarCredito = (e, id, estado) => {
    e.preventDefault();
    if (estado === "Usado" || estado === "Vencido") {
      Swal.fire({
        title: `No se puede eliminar el credito`,
        text: "El credito ya fue usado o esta vencido",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: `Eliminamos el credito?`,

        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          handleCargando();
          await quitarCredito(id);
          setActualizoClasesCliente(true);
          handleCargando();
        }
      });
    }
  };

  const recupero = (e, tipo, id) => {
    e.preventDefault();
    setTipoCreditoAsignar(tipo);
    setIdCreditoAsignar(id);
    handleModalRecuperoAdmin();
  };

  return (
    <>
      <Typography className="ml-4 text-start font-bold uppercase text-blue-gray-700">
        Historial de Creditos
      </Typography>
      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Fecha Creacion",
                    "Fecha Vencimiento",
                    "Tipo",
                    "Estado",
                    "Accion",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 bg-blue-50 px-6 py-3 text-center"
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
                {historialCreditos.map(
                  (
                    { _id, fechaCreacion, fechaVencimiento, tipo, estado },
                    key
                  ) => {
                    const className = `py-3 px-5  ${
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
                              {formatearFecha(fechaCreacion)}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {formatearFecha(fechaVencimiento)}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {tipo}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {estado}
                            </Typography>
                          </div>
                        </td>

                        <td className={className}>
                          <div className="flex justify-center">
                            {estado === "Activo" ? (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="0.76em"
                                  height="1em"
                                  viewBox="0 0 456 604"
                                  className="mb-4 h-8 w-8 text-[#C5CAE8] hover:cursor-pointer"
                                  onClick={(e) => recupero(e, tipo, _id)}
                                >
                                  <title>Asignar Clase Recupero</title>

                                  <path
                                    fill="currentColor"
                                    d="M46 0h364v1h4v1h3v1l6 2v1h2l5 6l3 2c12.983 19.155 4.316 65.868 9 94v30c2.722 9.717.483 24.526 1 36l2 44v28c1.8 6.413.9 16.938 1 25v5h1v40c1.99 7.1.606 18.26 1 27v3h1v32l3 82l1 64c1.979 7.1.606 18.256 1 27c.233 5.16 2.828 16.7 1 23h-1v5h-1v3h-1v2l-9 12h-2l-1 2h-2l-1 2c-7.484 4.7-19.9 4-32 4H52c-6.813 0-15.8.563-21-1h-5v-1h-3v-1h-2l-12-9v-2l-2-1v-2l-2-1v-2H4v-2H3v-3H2v-5H1c-1.945-6.754.867-18.257 1-24c.195-8.388-.892-19.265 1-26v-9c.008-9.5-1.186-22.216 1-30v-30c1.634-5.8 1-15.564 1-23l1-28v-19c2.189-7.781.992-20.5 1-30v-9h1v-30c3.083-10.96-1.088-26.507 1-39c.916-5.482 1-13.975 1-21v-10h1v-14c0-8.028-.787-18.63 1-25v-30h1v-9c.008-9.5-1.185-22.216 1-30l2-81c0-6.259-.316-14.321 1-19c1.377-4.9-.7-10.022 1-14h1v-2h1v-3l2-1l1-4l2-1l6-7h2V5l6-2V2h3V1h4zm293 12v46c-2.937 1.709-2.863 2.891-8 3a21.9 21.9 0 0 0-4-5V12h-58c.085 15.168 1.451 33.546-1 47c-2.449 1.091-3.225 1.813-7 2l-3-4h-1V12h-58v45c-3.146 1.873-2.838 3.7-8 4c-1.72-2.135-2.033-.566-3-4c-1.812-2.048-1-8.3-1-12V12h-58v33c0 4.206.763 10.318-1 13h-1c-2.066 2.518-2.221 2.919-7 3a20 20 0 0 0-3-3V12H47c-2.324.741-4.921 2.382-8 3l-5 6l-2 1l-4 12l-2 95c-2.191 7.779-.992 20.5-1 30v9c-1.9 6.733-.8 17.614-1 26v4h-1v12c0 9.535.313 21.063-1 29c-1.546 9.345 1.225 21.106-1 29v9c-.008 9.5 1.192 22.222-1 30v30h-1v9c-.009 9.8 1.272 22.94-1 31v18l-1 28c0 7.435.635 17.2-1 23v30c-2.512 8.98-.869 23.257-1 34l-1 22v13c-.892 3.2-2.407 24.644-1 29h1v3h1v2h1v2l2 1v2l2 1c7.353 7.635 15.147 7 30 7h375v-1h3v-1h2v-1l4-1l3-4h1v-2l2-1c3.21-5.107 3-12.7 3-21v-15h-1v-30h-1v-37c-.463-5.344-1-13.176-1-20v-12h-1v-10c0-9.2 1.114-21.506-1-29v-30h-1v-40c-1.642-5.811-.976-15.558-1-23l-1-25v-17c-1-4.037-1-14.716-1-23v-11h-1v-36c-1-4.036-1-14.717-1-23v-11h-1v-17l-3-95c-.284-12.4 1.074-26.446-4-34l-4-3c-1.91-1.9-1.771-3.144-5-4c-3.9-3.871-14.158-3-22-3zM166 514h81c14.582 0 32.111-1.314 45 1l1 3h1c.943 1.683-1.787 6.883-2 7h-2c-1.7 1.491-5.808 1-9 1h-83c-11.132 0-24.485.741-34-1l-1-3c-3.133-3.4 1.434-6.153 3-8"
                                    className="cls-1"
                                  />
                                </svg>
                              </>
                            ) : (
                              ""
                            )}
                            <div title="Eliminar">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                className="h-8 w-8 hover:cursor-pointer"
                                onClick={(e) => restarCredito(e, _id, estado)}
                              >
                                <path
                                  fill="currentColor"
                                  d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
                                />
                              </svg>
                            </div>
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
        <Cargando />
        {modalRecuperoAdmin ? <ModalRecuperoAdmin /> : null}
      </div>
    </>
  );
};

export default HistorialCreditosCliente;
