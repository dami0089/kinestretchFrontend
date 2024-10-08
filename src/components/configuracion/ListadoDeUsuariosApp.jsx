import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import ModalNuevoUsuario from "./ModalNuevoUsuario";
import { set } from "date-fns";
import Swal from "sweetalert2";

const ListadoDeUsuariosApp = () => {
  const {
    handleCargando,
    modalAgregarUsuarioApp,
    handleAgregarUsuarioApp,
    usuariosApp,
    obtenerUsuariosApp,
    actualizarList,
    setActualizarList,
    eliminarUsuario,
  } = useAuth();

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerUsuariosApp();
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizarList) {
        handleCargando();
        await obtenerUsuariosApp();
        handleCargando();
        setActualizarList(false);
      }
    };
    obtenerInfo();
  }, [actualizarList]);

  const navigate = useNavigate();

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(usuariosApp.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = usuariosApp.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleEliminar = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Eliminamos al usuario?",
      text: "Esta accion es irrecuperable",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarUsuario(id);
        setActualizarList(true);
        handleCargando();
      }
    });
  };

  return (
    <>
      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <div className="mb-3 mt-8 flex items-center justify-between text-black">
            <Typography className="ml-4  font-bold">
              Listado de Usuarios BackOffice
            </Typography>

            <div className="mr-5 flex items-center space-x-4">
              <Button onClick={(e) => handleAgregarUsuarioApp()}>
                Agregar
              </Button>
            </div>
          </div>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Nombre", "Email", "Sede", "Rol", "Accion"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 px-6 py-3 text-center"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map(
                  ({ _id, nombre, apellido, email, nombreSede, rol }, key) => {
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
                              {nombre} {apellido}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {email}
                            </Typography>
                          </div>
                        </td>

                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {nombreSede ? nombreSede : "Sin asignar"}
                            </Typography>
                          </div>
                        </td>

                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              className="text-xs font-medium uppercase text-blue-gray-600"
                            >
                              {rol}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 256 256"
                              className="h-8 w-8 hover:cursor-pointer"
                              onClick={(e) => handleEliminar(e, _id)}
                            >
                              <path
                                fill="currentColor"
                                d="M216 50H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12m-22 158a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132ZM82 24a6 6 0 0 1 6-6h80a6 6 0 0 1 0 12H88a6 6 0 0 1-6-6"
                              />
                            </svg>
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
      <Cargando />
      {modalAgregarUsuarioApp ? <ModalNuevoUsuario /> : null}
    </>
  );
};

export default ListadoDeUsuariosApp;
