import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";
import { EllipsisVerticalIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { DateTime } from "luxon";
import ModalClaseSede from "./ModalClaseSede";

const ProximaClaseSede = () => {
  const {
    obtenerClasesSede,
    clasesSede,
    recargoProximasClases,
    setRecargoProximasClases,
    setIdVerClase,
    setDiaClase,
    setHoraClase,
    setSedeClase,
  } = useClases();
  const { idVerSede, modalVerClase, handleModalVerClase } = useSedes();

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

  const handleVer = (e, _id, diaDeLaSemana, horarioInicio, nombreSede) => {
    e.preventDefault();
    console.log(_id);
    setIdVerClase(_id);
    setDiaClase(diaDeLaSemana);
    setHoraClase(horarioInicio);
    setSedeClase(nombreSede);
    handleModalVerClase();
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
                      nombreSede,
                      _id,
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
                              {horarioInicio}:00 hs
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
                              {percent(clientes.length)}%
                            </Typography>
                            <Progress
                              value={percent(clientes.length)}
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
