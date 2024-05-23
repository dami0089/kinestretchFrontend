import {
  Avatar,
  Button,
  Card,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/context";
import { ArrowLeftCircleIcon, EyeIcon } from "@heroicons/react/24/solid";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import useClases from "@/hooks/useClases";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { DateTime } from "luxon";
import ModalEditarDiagnostico from "./ModalEditarDiagnostico";

const ListadoAlumnosClaseClasesVistaProfe = () => {
  const {
    setDiagnosticoEditar,
    setIdCliente,
    handleModalEditarDiagnostico,
    modalEditarDiagnostico,
    actualizarListado,
    setActualizarListado,
  } = useClientes();

  const {
    clientesClaseVer,
    obtenerClientesClaseVer,
    eliminarClienteDeClase,
    registrarInasistenciaPaginaProfe,
    asistencias,
    obtenerAsistenciasClase,
    asistencia,
    clase,
    inasist,
    comprobarInasistencia,
  } = useClases();

  const { handleCargando } = useAuth();
  const params = useParams();
  const { id } = params;

  function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const diaActual = removerAcentos(
    capitalizeFirstLetter(
      DateTime.now().setZone("America/Argentina/Buenos_Aires").weekdayLong
    )
  );

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerClientesClaseVer(id);
      await obtenerAsistenciasClase(id);
      await comprobarInasistencia(id);
      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizarListado) {
        handleCargando();
        await obtenerClientesClaseVer(id);
        await obtenerAsistenciasClase(id);
        await comprobarInasistencia(id);

        setActualizarListado(false);
        handleCargando();
      }
    };
    obtenerInfo();
  }, [actualizarListado]);

  const navigate = useNavigate();

  const handleEliminar = (e, _id) => {
    e.preventDefault();
    Swal.fire({
      title: "Seguro queres eliminar al cliente de la clase?",
      text: "Esta accion lo borra para siempre de la clase",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarClienteDeClase(_id, id);
        setActualizarListado(true);
        handleCargando();
      }
    });
  };

  const handleInasistencia = async (e, _id) => {
    e.preventDefault();
    if (asistencias.includes(_id)) {
      toast.error("Ya registraste una asistencia para este cliente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    Swal.fire({
      title: "Registramos la inasistencia?",
      text: "Se marcara al cliente como inasistente",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await registrarInasistenciaPaginaProfe(_id, id);
        setActualizarListado(true);
        toast.success("Inasistencia registrada", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        handleCargando();
      }
    });
  };

  const registrarAsistencia = async (e, _id) => {
    e.preventDefault();
    if (asistencias.includes(_id)) {
      toast.error("Ya registraste esta asistencia", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (inasist.includes(_id)) {
      toast.error("Ya registraste una inasistencia", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (clase.diaDeLaSemana !== diaActual) {
      toast.error(
        "No se puede marcar una asistencia a un dia que no es el de hoy",
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      handleCargando();
      await asistencia(id, _id);
      setActualizarListado(true);
      handleCargando();
    }
  };

  const handleDiagnostico = (e, diagnostico, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Diagnostico",
      text: `${diagnostico ? diagnostico : "No tiene diagnostico"}`,
      imageUrl:
        "https://www.shutterstock.com/image-photo/doctor-medical-office-reviewing-data-600nw-2244599039.jpg",
      imageWidth: 450,
      imageHeight: 170,
      imageAlt: "Diagnostico",
      confirmButtonText: "Listo",
      showDenyButton: true,
      denyButtonColor: "#008eff",
      denyButtonText: `Editar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      } else if (result.isDenied) {
        setDiagnosticoEditar(diagnostico);
        setIdCliente(id);
        handleModalEditarDiagnostico();
      }
    });
  };

  const handleEmergencia = (
    e,
    nombreContactoEmergencia,
    celularContactoEmergencia
  ) => {
    e.preventDefault();
    Swal.fire({
      title: `${
        nombreContactoEmergencia
          ? `Nombre Contacto: ${nombreContactoEmergencia}`
          : ""
      }`,
      text: `${
        celularContactoEmergencia
          ? `Telefono Contacto: ${celularContactoEmergencia}`
          : "No tiene telefono de emergencia"
      }`,
      imageUrl:
        "https://www.shutterstock.com/image-photo/doctor-medical-office-reviewing-data-600nw-2244599039.jpg",
      imageWidth: 450,
      imageHeight: 170,
      imageAlt: "Diagnostico",
      confirmButtonText: "Listo",
      showDenyButton: false,
      denyButtonColor: "#008eff",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      }
    });
  };

  return (
    <>
      <div className="  mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <div className=" flex items-center justify-between text-black">
            <div className="mr-5 flex items-center space-x-4"></div>
          </div>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Presente",
                    "Ausente",
                    "Nombre",
                    "Diagnostico",
                    "Apto Fisico",
                    "Contacto de Emergencia",
                    "Accion",
                  ].map((el) => (
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
                {clientesClaseVer.map(
                  (
                    {
                      _id,
                      nombre,
                      apellido,
                      email,
                      celular,
                      esRecupero,
                      esPrimeraClase,
                      diagnostico,
                      linkApto,
                      nombreContactoEmergencia,
                      celularContactoEmergencia,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr
                        key={_id}
                        className={`${
                          esRecupero
                            ? "bg-yellow-100"
                            : esPrimeraClase
                            ? "bg-yellow-300"
                            : ""
                        }`}
                      >
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className={`h-8 w-8  ${
                                asistencias.includes(_id)
                                  ? "text-green-500"
                                  : "hover:cursor-pointer"
                              }`}
                              onClick={(e) => registrarAsistencia(e, _id)}
                            >
                              <path
                                fill="currentColor"
                                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m3.707-9.293l-4.003 4a1 1 0 0 1-1.415 0l-1.997-2a1 1 0 1 1 1.416-1.414l1.29 1.293l3.295-3.293a1 1 0 0 1 1.414 1.414"
                              />
                            </svg>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className={`h-8 w-8  ${
                                inasist.includes(_id)
                                  ? "text-red-500"
                                  : asistencias.includes(_id)
                                  ? ""
                                  : "hover:cursor-pointer"
                              }`}
                              onClick={(e) => handleInasistencia(e, _id)}
                            >
                              <path
                                fill="currentColor"
                                d="M12 20.25A8.25 8.25 0 0 1 3.75 12h-1.5A9.75 9.75 0 0 0 12 21.75zm0-16.5A8.25 8.25 0 0 1 20.25 12h1.5A9.75 9.75 0 0 0 12 2.25zM3.75 12c0-2.278.923-4.34 2.416-5.834l-1.06-1.06A9.722 9.722 0 0 0 2.25 12zm2.416-5.834A8.222 8.222 0 0 1 12 3.75v-1.5a9.722 9.722 0 0 0-6.894 2.856zm-1.06 0l12.728 12.728l1.06-1.06L6.166 5.106zM20.25 12c0 2.278-.923 4.34-2.416 5.834l1.06 1.06A9.722 9.722 0 0 0 21.75 12zm-2.416 5.834A8.222 8.222 0 0 1 12 20.25v1.5a9.722 9.722 0 0 0 6.894-2.856z"
                              />
                            </svg>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {nombre} {apellido}{" "}
                              {esRecupero ? "(Recupero)" : null}
                              {esPrimeraClase ? "(Primer Clase)" : null}
                            </Typography>
                          </div>
                        </td>

                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className={`h-8 w-8 hover:cursor-pointer ${
                                diagnostico ? "text-green-500" : "text-red-500"
                              }`}
                              onClick={(e) =>
                                handleDiagnostico(e, diagnostico, _id)
                              }
                            >
                              <path
                                fill="currentColor"
                                d="M14.84 16.26C17.86 16.83 20 18.29 20 20v2H4v-2c0-1.71 2.14-3.17 5.16-3.74L12 21zM8 8h8v2a4 4 0 0 1-4 4a4 4 0 0 1-4-4zm0-1l.41-4.1a1 1 0 0 1 1-.9h5.19c.51 0 .94.39.99.9L16 7zm4-4h-1v1h-1v1h1v1h1V5h1V4h-1z"
                              />
                            </svg>
                          </div>
                        </td>

                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <a
                              href={linkApto ? linkApto : null}
                              target="_blank"
                              rel="noopener noreferrer" // Importante por seguridad
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 48 48"
                                className={`h-8 w-8 hover:cursor-pointer ${
                                  linkApto ? "text-green-500" : "text-red-500"
                                }`}
                              >
                                <path
                                  fill="currentColor"
                                  d="M18.5 8.5v8.75c0 .69-.56 1.25-1.25 1.25H8.5v11h8.75c.69 0 1.25.56 1.25 1.25v8.75h11v-8.75c0-.69.56-1.25 1.25-1.25h8.75v-11h-8.75c-.69 0-1.25-.56-1.25-1.25V8.5zM16 8.25A2.25 2.25 0 0 1 18.25 6h11.5A2.25 2.25 0 0 1 32 8.25V16h7.75A2.25 2.25 0 0 1 42 18.25v11.5A2.25 2.25 0 0 1 39.75 32H32v7.75A2.25 2.25 0 0 1 29.75 42h-11.5A2.25 2.25 0 0 1 16 39.75V32H8.25A2.25 2.25 0 0 1 6 29.75v-11.5A2.25 2.25 0 0 1 8.25 16H16z"
                                />
                              </svg>
                            </a>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className={`h-8 w-8 hover:cursor-pointer ${
                                nombreContactoEmergencia
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                              onClick={(e) =>
                                handleEmergencia(
                                  e,
                                  nombreContactoEmergencia,
                                  celularContactoEmergencia
                                )
                              }
                            >
                              <path
                                fill="currentColor"
                                d="M10.25 21v-5.95L5.1 18.025L3.35 15l5.15-3l-5.15-2.975L5.1 6l5.15 2.975V3h3.5v5.975L18.9 6l1.75 3.025L15.5 12l5.15 3l-1.75 3.025l-5.15-2.975V21z"
                              />
                            </svg>
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
      {modalEditarDiagnostico ? <ModalEditarDiagnostico /> : null}
      <Cargando />
    </>
  );
};

export default ListadoAlumnosClaseClasesVistaProfe;
