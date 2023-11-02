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
  } = useClientes();

  const { actualizoClasesCliente, setActualizoClasesCliente } = useClases();
  const { handleCargando } = useAuth();

  useEffect(() => {
    const pagos = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerPagos(idClienteEditar);
        handleCargando();
        setActualizoClasesCliente(false);
      }
    };
    pagos();
  }, [actualizoClasesCliente]);

  const formatDate = (dateString) => {
    // Tomamos solo la parte de la fecha (año, mes, día)
    const dateOnly = dateString.split("T")[0];
    return dateOnly;
  };

  const editarpago = (e, fecha, importe, id) => {
    e.preventDefault();
    setPagoId(id);
    setFechaPago(formatDate(fecha));
    setImportePagoEditar(importe);
    handleModalEditarPago();
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
                  {["Dia", "Importe", "Accion"].map((el) => (
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
                {pagosCliente.map(({ _id, importe, fecha }, key) => {
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
                            {formatearFecha(fecha)}
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
                          <PencilSquareIcon
                            className="h-8 w-8 hover:cursor-pointer"
                            onClick={(e) => editarpago(e, fecha, importe, _id)}
                          />
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
