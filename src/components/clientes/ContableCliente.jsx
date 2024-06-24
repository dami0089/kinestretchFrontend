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
import Swal from "sweetalert2";

const ContableCliente = () => {
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
    refrescarListado,
    setRefrescarListado,
    setMedioPago,
    eliminarPago,
  } = useClientes();

  const { actualizoClasesCliente, setActualizoClasesCliente } = useClases();
  const { handleCargando } = useAuth();

  useEffect(() => {
    const pagos = async () => {
      if (refrescarListado) {
        handleCargando();
        await obtenerPagos(idClienteEditar);
        setRefrescarListado(false);
        handleCargando();
      }
    };
    pagos();
  }, [refrescarListado]);

  useEffect(() => {
    const pagos = async () => {
      handleCargando();
      await obtenerPagos(idClienteEditar);
      handleCargando();
    };
    pagos();
  }, []);

  const formatDate = (dateString) => {
    // Tomamos solo la parte de la fecha (año, mes, día)
    const dateOnly = dateString.split("T")[0];
    return dateOnly;
  };

  const editarpago = (e, fecha, importe, id, medio) => {
    e.preventDefault();
    setPagoId(id);
    setFechaPago(formatDate(fecha));
    setImportePagoEditar(importe);
    setMedioPago(medio);
    handleModalEditarPago();
  };

  const handleEliminarPago = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Estas seguro de eliminar el pago?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarPago(id);
        setRefrescarListado(true);
        handleCargando();
      }
    });
  };

  return (
    <>
      <Typography className="ml-4 text-start font-bold uppercase text-blue-gray-700">
        Pagos
      </Typography>
      <div className=" mb-4 mt-3 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Fecha", "Importe", "Medio pago", "Accion"].map((el) => (
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
                {pagosCliente.map(({ _id, importe, fechaPago, medio }, key) => {
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
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            $ {importe}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center justify-center gap-4">
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {medio}
                          </Typography>
                        </div>
                      </td>

                      <td className={className}>
                        <div className="flex items-center justify-center gap-4">
                          <PencilSquareIcon
                            className="h-8 w-8 hover:cursor-pointer"
                            onClick={(e) =>
                              editarpago(e, fechaPago, importe, _id, medio)
                            }
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            className="h-8 w-8 hover:cursor-pointer"
                            onClick={(e) => handleEliminarPago(e, _id)}
                          >
                            <path
                              fill="currentColor"
                              d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
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
        </Card>
        <Cargando />
      </div>
    </>
  );
};

export default ContableCliente;
