import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { DateTime } from "luxon";
import ModalClaseSede from "./ModalClaseSede";
import Swal from "sweetalert2";
import { convertirHora } from "@/helpers/convertirHora";
import { useNavigate } from "react-router-dom";
import { id } from "date-fns/locale";

const ProximaClaseSede = () => {
  const {
    obtenerClasesSede,
    clasesSede,
    recargoProximasClases,
    setRecargoProximasClases,
    eliminarClase,
  } = useClases();
  const { idVerSede, modalVerClase, handleModalVerClase } = useSedes();
  const navigate = useNavigate();
  useEffect(() => {
    const traerData = async () => {
      await obtenerClasesSede(idVerSede);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      if (recargoProximasClases) {
        await obtenerClasesSede(idVerSede);
        setRecargoProximasClases(false);
      }
    };
    traerData();
  }, [recargoProximasClases]);

  const diaActual = DateTime.now().setZone("America/Argentina/Buenos_Aires");
  const diasDeLaSemanaOrden = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  const diaSemanaActual = diasDeLaSemanaOrden[diaActual.weekday - 1];

  const percent = (length) => {
    const porcentaje = (length / 8) * 100;

    return porcentaje;
  };

  const handleVer = (e, _id) => {
    e.preventDefault();

    navigate(`/sedes/vista-clase/${_id}`);
  };

  const handleEliminar = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Eliminamos la clase?",
      text: "Esta accion es irrecuperable",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarClase(id);
        setRecargoProximasClases(true);
      }
    });
  };

  return (
    <>
      {clasesSede && clasesSede.length !== 0 ? (
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Proximas clases hoy{" "}
                <span className="text-blue-500">
                  {diaSemanaActual.toUpperCase()}
                </span>
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Hora", "Profesor", "Ocupacion", "Ver"].map((el) => (
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
                {clasesSede.map(
                  (
                    {
                      diaDeLaSemana,
                      horarioInicio,
                      nombreProfe,
                      clientes,
                      recupero,
                      nombreSede,
                      _id,
                      cupo,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 text-center ${
                      key === clasesSede.length - 1
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
                              {convertirHora(horarioInicio)} hs
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-body"
                            >
                              {nombreProfe}
                            </Typography>
                          </div>
                        </td>

                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {clientes.length + recupero.legth}/{cupo}
                            </Typography>
                            <Progress
                              value={
                                clientes.length >= 8
                                  ? 100
                                  : (clientes.length / 8) * 100
                              }
                              variant="gradient"
                              color={clientes.length === 8 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <EyeIcon
                              className="h-8 w-8 text-blue-gray-600 hover:cursor-pointer"
                              onClick={(e) =>
                                handleVer(
                                  e,
                                  _id,
                                  diaDeLaSemana,
                                  horarioInicio,
                                  nombreSede
                                )
                              }
                            />
                            <TrashIcon
                              className="h-8 w-8 text-blue-gray-600 hover:cursor-pointer"
                              onClick={(e) => handleEliminar(e, _id)}
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
        </Card>
      ) : clasesSede && clasesSede.length === 0 ? (
        <div class="mt-5 flex flex-col justify-center">
          <button class="">No hay mas clases por hoy</button>
        </div>
      ) : (
        <div class="mt-5 flex flex-col justify-center">
          <button class="">No hay clases para hoy</button>
        </div>
      )}
      {modalVerClase ? <ModalClaseSede /> : ""}
    </>
  );
};

export default ProximaClaseSede;
