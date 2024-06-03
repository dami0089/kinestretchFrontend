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

const ListadoAsistenciasInasistenciasCliente = () => {
  const { setIdClienteEditar, modalVerClaseCliente, handleVerClase, cliente } =
    useClientes();

  const {
    clasesCliente,
    idClasePerfilCliente,
    setIdClasePerfilCliente,
    cancelarClaseCliente,
    eliminarDeClaseACliente,
    setActualizoClasesCliente,
    asistenciasInasistenciasCliente,
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
        Listado Asistencias / Inasistencias
      </Typography>
      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Fecha", "Dia", "Tipo"].map((el) => (
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
                {asistenciasInasistenciasCliente.map(
                  ({ _id, fecha, diaClase, tipo }, key) => {
                    const className = `py-3 px-5 ${
                      tipo === "inasistencia" ? "bg-red-50" : "bg-green-50"
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
                              {fecha}{" "}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {diaClase}
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

export default ListadoAsistenciasInasistenciasCliente;
