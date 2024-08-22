import { projectsTableData } from "@/data";
import useAuth from "@/hooks/useAuth";
import useClases from "@/hooks/useClases";
import useProfesores from "@/hooks/useProfesores";
import useSedes from "@/hooks/useSedes";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { Box, Modal } from "@mui/material";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const ModalVerClaseSedeSecretaria = () => {
  const { handleModalClasesProfe, modalClasesProfe } = useProfesores();
  const {
    idVerClase,
    setIdVerClase,
    clientesClase,
    obtenerClientesClases,
    diaClase,
    setDiaClase,
    horaClase,
    setHoraClase,
    sedeClase,
    setSedeClase,
    asistencia,
    asist,
    comprobarAsistencia,

    handleModalPagosProfes,

    idPagoProfe,
    setIdPagoProfe,
    actualizo,
    setActualizo,
    modalClaseProfePerfilAdmin,
    handleModalClaseProfePerfilAdmin,
  } = useClases();

  const { modalVerClase, handleModalVerClase } = useSedes();
  const { idSedeSeleccionada } = useAuth();

  const { handleCargando } = useAuth();
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const diaActual = removerAcentos(
    capitalizeFirstLetter(
      DateTime.now().setZone("America/Argentina/Buenos_Aires").weekdayLong
    )
  );

  const [comprobar, setComprobar] = useState(false);

  useEffect(() => {
    const obtenerNombresClientes = async () => {
      await obtenerClientesClases(idVerClase);
    };
    obtenerNombresClientes();
  }, []);

  useEffect(() => {
    const obtenerNombresClientes = async () => {
      if (actualizo) {
        await obtenerClientesClases(idVerClase);
        setActualizo(false);
      }
    };
    obtenerNombresClientes();
  }, [actualizo]);

  useEffect(() => {
    const asistencias = async () => {
      if (comprobar) {
        await comprobarAsistencia(idVerClase);
        setComprobar(false);
      }
    };
    asistencias();
  }, [comprobar]);

  useEffect(() => {
    const asistencias = async () => {
      await comprobarAsistencia(idVerClase);
    };

    asistencias();
  }, []);

  const registrarAsistencia = async (e, id) => {
    e.preventDefault();
    if (diaClase !== diaActual) {
      toast.error(
        "No se puede marcar una asistencia a un dia que no es el de hoy",
        {
          position: "top-right",
          autoClose: 2000,
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
      await asistencia(idVerClase, id);
      setComprobar(true);
      setActualizo(true);
      handleCargando();
    }
  };

  const handlePagos = async (e, id, fecha) => {
    e.preventDefault();
    if (esMismoMes(fecha)) {
      handleModalClaseProfePerfilAdmin();
      await Swal.fire({
        title: "El cliente ya abono este mes",
        text: "Queres registrar otro pago mas?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIdPagoProfe(id);
          handleModalClasesProfe();
          handleModalClaseProfePerfilAdmin();
        }
      });
    } else {
      setIdPagoProfe(id);
      handleModalClasesProfe();
      handleModalPagosProfes();
    }
  };

  const esMismoMes = (fechaBaseDatos) => {
    const fechaActual = new Date(); // Fecha actual
    const fechaBD = new Date(fechaBaseDatos); // Convertir la fecha de la base de datos a un objeto Date

    // Comprobar si el año y el mes son iguales
    return (
      fechaActual.getFullYear() === fechaBD.getFullYear() &&
      fechaActual.getMonth() === fechaBD.getMonth()
    );
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <Modal
        open={modalVerClase}
        onClose={handleModalVerClase}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute left-1/2 top-1/2 mx-4 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded border border-black bg-white p-4 text-center shadow-lg md:w-[800px] md:max-w-none">
          <h2
            id="modal-modal-title"
            className="mb-4 text-xl font-semibold md:text-2xl"
          >
            Clase del {diaClase}-{horaClase}hs en {sedeClase}
          </h2>

          <CardBody className="max-h-[60vh] overflow-y-auto px-0 pb-2 pt-0">
            <div className="responsive-table">
              {clientesClase.map(
                (
                  {
                    id,
                    nombre,
                    apellido,
                    fechaUltimoPago,
                    importeUltimoPago,
                    asistioHoy,
                    esRecupero,
                    esPrimeraClase,
                  },
                  key
                ) => (
                  <div
                    key={id}
                    className={`card mb-4 border p-4 ${
                      esRecupero
                        ? "bg-orange-200"
                        : esPrimeraClase
                        ? "bg-yellow-200"
                        : ""
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <Typography
                        variant="small"
                        className="text-xl font-medium uppercase text-blue-gray-400"
                      >
                        Nombre:{" "}
                        <p className="ml-4 text-xl font-bold text-blue-gray-800">
                          {nombre} {apellido} {esRecupero ? "- RECUPERO" : ""}
                        </p>
                      </Typography>

                      <div>
                        <CurrencyDollarIcon
                          className={`h-8 w-8 ${
                            esMismoMes(fechaUltimoPago)
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        />
                      </div>
                    </div>
                    {/* Aquí continúa el resto de tu contenido, como botones de asistencia, etc. */}
                    <div className="card-row mt-4 flex flex-wrap justify-between space-y-2 md:space-y-0">
                      <Button
                        onClick={(e) => registrarAsistencia(e, id)}
                        disabled={
                          asistioHoy === "Si"
                            ? true
                            : asistioHoy === "No"
                            ? true
                            : false
                        }
                        className={`mb-2 mr-5 w-full bg-green-500 md:mb-0 md:w-auto ${
                          asistioHoy === "Si" || asistioHoy === "No"
                            ? "bg-gray-600"
                            : ""
                        }`}
                      >
                        Asistencia
                      </Button>
                      <Button
                        disabled={
                          asistioHoy === "Si"
                            ? true
                            : asistioHoy === "No"
                            ? true
                            : false
                        }
                        className="mb-2 mr-5 w-full bg-orange-500 md:mb-0 md:w-auto"
                      >
                        Inasistencia
                      </Button>
                      <Button
                        onClick={(e) => handlePagos(e, id, fechaUltimoPago)}
                        className="mr-5 w-full bg-blue-gray-500 md:w-auto"
                      >
                        Registrar Pago
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardBody>
        </div>
      </Modal>
    </>
  );
};

export default ModalVerClaseSedeSecretaria;
