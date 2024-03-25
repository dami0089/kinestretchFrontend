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
import ModalMostrarClaseCliente from "./ModalMostrarClaseCliente";
import Swal from "sweetalert2";

const ClasesPorCliente = () => {
  const { setIdClienteEditar, modalVerClaseCliente, handleVerClase, cliente } =
    useClientes();

  const {
    clasesCliente,
    idClasePerfilCliente,
    setIdClasePerfilCliente,
    cancelarClaseCliente,
    eliminarDeClaseACliente,
    setActualizoClasesCliente,
  } = useClases();

  const { handleCargando } = useAuth();

  const handleCancelar = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Inasistencia de cliente",
      text: "Se marcara como inasistente al cliente en la proxima clase",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await cancelarClaseCliente(cliente._id, id);
        setActualizoClasesCliente(true);
        handleVerClase();
      }
    });
  };

  const handleEliminar = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Eliminamos al cliente de la clase?",
      text: "Esta accion lo eliminara de todos los listados",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarDeClaseACliente(id, cliente._id);
        setActualizoClasesCliente(true);
        handleCargando();
      }
    });
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
                      recupero,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      recupero.includes(cliente._id) ? "bg-yellow-50" : null
                    } ${
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
                              {diaDeLaSemana}{" "}
                              {recupero.includes(cliente._id)
                                ? "(RECUPERO)"
                                : ""}
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
                          {/* <Button
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
                          </Button> */}
                          <div className="flex justify-center">
                            <div title="Ausencia">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                className="h-8 w-8 hover:cursor-pointer"
                                onClick={(e) => handleCancelar(e, _id)}
                              >
                                <path
                                  fill="currentColor"
                                  d="M3 20V9.5l7-5.288l3.99 3.011q-.278.094-.52.22q-.243.126-.474.303L10 5.462L4 10v9h4.115v1zm7.5 0v-1.327q0-.367.205-.676q.205-.309.52-.507q1.092-.655 2.297-.977q1.205-.32 2.478-.32q1.273 0 2.478.32q1.205.322 2.297.977q.315.198.52.507q.205.309.205.676V20zm1.035-1h8.93v-.538q-1.028-.597-2.148-.933q-1.119-.337-2.317-.337q-1.198 0-2.317.337q-1.12.336-2.148.933zm4.467-4.904q-1.04 0-1.771-.728q-.731-.729-.731-1.77q0-1.04.729-1.771q.728-.73 1.769-.73q1.04 0 1.771.728q.731.728.731 1.769t-.728 1.771q-.729.731-1.77.731m-.002-1q.617 0 1.059-.441q.441-.442.441-1.059t-.441-1.058q-.442-.442-1.059-.442t-1.059.442q-.441.44-.441 1.058q0 .617.441 1.059q.442.441 1.059.441M16 19"
                                />
                              </svg>
                            </div>
                            <div title="Eliminar">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                className="h-8 w-8 hover:cursor-pointer"
                                onClick={(e) => handleEliminar(e, _id)}
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
        {/* {modalVerClaseCliente ? <ModalVerClase /> : ""} */}
        {modalVerClaseCliente ? <ModalMostrarClaseCliente /> : ""}
      </div>
    </>
  );
};

export default ClasesPorCliente;
