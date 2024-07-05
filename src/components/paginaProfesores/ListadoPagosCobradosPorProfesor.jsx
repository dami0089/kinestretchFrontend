import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import useClases from "@/hooks/useClases";
import useProfesores from "@/hooks/useProfesores";
import ModalEditarPagoProfe from "./ModalEditarPagoProfe";

const ListadoPagosCobradosPorProfesor = () => {
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

  useEffect(() => {
    const obtener = async () => {
      handleCargando();
      await obtenerRegistrosContablesProfesor(auth._id);
      handleCargando();
    };
    obtener();
  }, []);

  useEffect(() => {
    const pagos = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerRegistrosContablesProfesor(auth._id);
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
        await obtenerRegistrosContablesProfesor(auth._id);
        handleCargando();
        setActualizarListado(false);
      }
    };
    pagos();
  }, [actualizarListado]);

  const formatDate = (dateString) => {
    // Tomamos solo la parte de la fecha (año, mes, día)
    const dateOnly = dateString.split("T")[0];
    return dateOnly;
  };

  const editarpago = (e, fecha, importe, id, comentario, medio, cliente) => {
    e.preventDefault();
    setPagoId(id);
    setFechaPago(formatDate(fecha));
    setImportePagado(importe),
      setMedioPago(medio),
      setIdClientePago(cliente),
      setComentarioPago(comentario),
      handleModalEditarPagoProfe();
  };

  return (
    <>
      <Typography className="ml-4 text-start font-bold uppercase text-blue-gray-700">
        Pagos Recibidos
      </Typography>
      {registrosContbalesProfe && registrosContbalesProfe.length > 0 ? (
        <div className=" mb-4 mt-3 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Fecha", "Cliente", "Importe", "Accion"].map((el) => (
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
                  {registrosContbalesProfe.map(
                    (
                      {
                        _id,
                        importe,
                        fechaPago,
                        nombreCliente,
                        nombreProfe,
                        comentario,
                        medio,
                        cliente,
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
                                {formatearFecha(fechaPago)}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center justify-center gap-4">
                              <Typography
                                variant="small"
                                className={`text-xs font-medium  ${
                                  nombreCliente
                                    ? "text-blue-gray-600"
                                    : "text-green-600"
                                }`}
                              >
                                {nombreCliente ? nombreCliente : nombreProfe}
                              </Typography>
                            </div>
                          </td>

                          <td className={className}>
                            <div className="flex items-center justify-center gap-4">
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {nombreCliente
                                  ? `$ ${importe}`
                                  : `$ - ${importe}`}
                              </Typography>
                            </div>
                          </td>

                          <td className={className}>
                            <div className="flex items-center justify-center gap-4">
                              <PencilSquareIcon
                                className="h-8 w-8 hover:cursor-pointer"
                                onClick={(e) =>
                                  editarpago(
                                    e,
                                    fechaPago,
                                    importe,
                                    _id,
                                    comentario,
                                    medio,
                                    cliente
                                  )
                                }
                              />
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

export default ListadoPagosCobradosPorProfesor;
