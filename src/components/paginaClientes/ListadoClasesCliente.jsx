import { Button, Typography } from "@material-tailwind/react";

import React, { useEffect } from "react";
import useClientes from "@/hooks/useClientes";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/solid";
import useClases from "@/hooks/useClases";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { convertirHora } from "@/helpers/convertirHora";

const ListadoClasesCliente = () => {
  const { obtenerCliente, cliente, obtenerCreditosCliente } = useClientes();

  const {
    obtenerClasesCliente,
    clasesCliente,
    actualizoClasesCliente,
    setActualizoClasesCliente,
    inasistencias,
    handleModalCancelarClase,
    setIdClaseCancelar,
    inasistenciaRecupero,
  } = useClases();

  const { handleCargando, auth } = useAuth();

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerClasesCliente(auth._id);

      handleCargando();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const dataCliente = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerCliente(auth.cliente);
        await obtenerCreditosCliente(auth.cliente);
        await obtenerClasesCliente(auth._id);
        setActualizoClasesCliente(false);
        handleCargando();
      }
    };
    dataCliente();
  }, [actualizoClasesCliente]);

  const handleCancelarClases = (e, clase, esRecupero) => {
    e.preventDefault();
    setIdClaseCancelar(clase);
    if (!esRecupero) {
      handleModalCancelarClase();
    } else {
      Swal.fire({
        title: "Queres Cancelar Tu clase?",
        text: "Si cancelas esta clase de recupero, deberas contactarnos si deseas reprogramarla.",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          handleCargando();
          await inasistenciaRecupero(auth._id, clase);
          setActualizoClasesCliente(true);
          handleCargando();
        }
      });
    }
  };

  const esClaseCancelada = (idClase, claseFechacompleta) => {
    // Extraer día y mes de claseFechacompleta
    const [day, month] = claseFechacompleta.split("/").map(Number);

    if (inasistencias.length > 0) {
      return inasistencias.some((inasistencia) => {
        // Convertir fechaInasistencia a un objeto Date
        const fechaInasistencia = new Date(inasistencia.fechaInasistencia);
        // Extraer día y mes de fechaInasistencia
        const inasistenciaDay = fechaInasistencia.getUTCDate();
        const inasistenciaMonth = fechaInasistencia.getUTCMonth() + 1; // getUTCMonth() devuelve un índice de mes basado en cero

        return (
          inasistencia.clase === idClase &&
          inasistenciaDay === day &&
          inasistenciaMonth === month
        );
      });
    }
    return false;
  };

  const obtenerProximaFecha = (diaSemana, horaInicio) => {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];

    // Suponiendo que el servidor está en Argentina, GMT-3
    const offsetArgentina = -3;
    let ahora = new Date(new Date().getTime() + offsetArgentina * 3600 * 1000);

    let indiceDiaSemana = dias.indexOf(diaSemana);

    // Si no se encuentra el día o es domingo, devolvemos null o una cadena vacía
    if (indiceDiaSemana === -1 || indiceDiaSemana === 0) {
      return null;
    }

    let diferenciaDias = indiceDiaSemana - ahora.getDay();
    let horaActual = ahora.getHours();

    // Si es el mismo día pero la hora ya pasó, calculamos para la próxima semana
    if (diferenciaDias === 0 && horaInicio <= horaActual) {
      diferenciaDias += 7;
    } else if (diferenciaDias < 0) {
      // Si ya pasó ese día de la semana, calculamos para la próxima semana
      diferenciaDias += 7;
    }

    let proximaFecha = new Date(ahora.getTime());
    proximaFecha.setDate(ahora.getDate() + diferenciaDias);

    return `${proximaFecha.getDate()}/${proximaFecha.getMonth() + 1}`;
  };

  return (
    <>
      <Typography className="text-center text-xl font-bold uppercase text-blue-gray-500">
        Tu Próxima Clase
      </Typography>

      <div className="mb-4 mt-10 flex justify-center">
        <ToastContainer />

        <div
          className={`grid gap-6 ${
            clasesCliente.length > 1 ? "xl:grid-cols-2" : "xl:grid-cols-1"
          }`}
        >
          {clasesCliente
            .map((clase) => ({
              ...clase,
              fechaCompleta: obtenerProximaFecha(
                clase.diaDeLaSemana,
                clase.horarioInicio
              ),
              // No es necesario convertir la hora, ya es un número adecuado para ordenar
              horaOrden: clase.horarioInicio,
            }))
            .sort((a, b) => {
              const fechaA = new Date(
                a.fechaCompleta.split("/").reverse().join("-")
              );
              const fechaB = new Date(
                b.fechaCompleta.split("/").reverse().join("-")
              );

              // Primero comparar por fecha
              if (fechaA - fechaB !== 0) {
                return fechaA - fechaB;
              }

              // Si las fechas son iguales, comparar por hora (horaOrden)
              return a.horaOrden - b.horaOrden;
            })
            .map((clase) => (
              <div
                key={clase._id}
                className={`mx-auto mb-5 max-w-md overflow-hidden rounded-lg border ${
                  esClaseCancelada(clase._id, clase.fechaCompleta)
                    ? "bg-gray-300"
                    : "bg-white"
                } shadow-md xl:mx-0`}
              >
                <div className="flex">
                  {/* Columna del Horario */}
                  <div className="w-4/10 flex flex-col items-center justify-center bg-blue-gray-500 p-4 text-center text-white">
                    <CalendarIcon className="h-8 w-8" />
                    <div className="text-s">{clase.diaDeLaSemana}</div>
                    <div className="text-lg font-bold">
                      {clase.fechaCompleta ? `${clase.fechaCompleta} - ` : ""}
                      {convertirHora(clase.horarioInicio)} HS
                    </div>
                  </div>

                  {/* Columna del Profesor y Alumnos */}
                  <div className="w-6/10 flex flex-col justify-center p-4">
                    <div className="items-left flex text-lg font-medium">
                      <UserIcon className="mr-2 h-5 w-5" />
                      Profesor {clase.nombreProfe}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`text-l text-gray-600 ${
                          esClaseCancelada(clase._id, clase.fechaCompleta)
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {esClaseCancelada(clase._id, clase.fechaCompleta)
                          ? "CANCELASTE ESTA CLASE"
                          : clase.nombreSede}
                        <span className="font-bold uppercase">
                          {" "}
                          {clase.esRecupero ? "- recupero" : ""}
                        </span>
                      </span>

                      {esClaseCancelada(clase._id, clase.fechaCompleta) ? (
                        ""
                      ) : (
                        <Button
                          className="bg-red-500 p-1 hover:bg-red-600"
                          onClick={(e) =>
                            handleCancelarClases(e, clase._id, clase.esRecupero)
                          }
                        >
                          Cancelar Clase
                        </Button>
                        // <XCircleIcon
                        //   title="Cancelar clase"
                        //   className="h-8 w-8 text-red-300 hover:cursor-pointer"

                        // />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListadoClasesCliente;
