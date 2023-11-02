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

import useClases from "@/hooks/useClases";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import ModalVerClase from "./ModalVerClase";

const ClasesPorCliente = () => {
  const { setIdClienteEditar, modalVerClaseCliente, handleVerClase } =
    useClientes();

  const { clasesCliente, idClasePerfilCliente, setIdClasePerfilCliente } =
    useClases();

  const { handleCargando } = useAuth();

  const handleClase = async (e, id) => {
    e.preventDefault();
    handleCargando();
    await setIdClasePerfilCliente(id);
    handleVerClase();
    handleCargando();
  };

  return (
    <>
      <Typography className="ml-4 text-start font-bold uppercase text-blue-gray-700">
        Clases
      </Typography>
      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Dia", "Hora", "Profesor", "Sede", "Accion"].map((el) => (
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
                {clasesCliente.map(
                  (
                    {
                      _id,
                      diaDeLaSemana,
                      horarioInicio,
                      nombreProfe,
                      nombreSede,
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
                              {horarioInicio}:00 hs
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
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {nombreSede}
                            </Typography>
                          </div>
                        </td>

                        <td className={className}>
                          <Button
                            color="blue"
                            className="mx-1 items-center gap-4 px-6 capitalize"
                            onClick={(e) => handleClase(e, _id)}
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
        <Cargando />
        {modalVerClaseCliente ? <ModalVerClase /> : ""}
      </div>
    </>
  );
};

export default ClasesPorCliente;
