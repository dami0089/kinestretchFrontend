import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
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

const ClasesManana = () => {
  const {
    obtenerClasesSedeManana,
    clasesSedeManana,
    recargoProximasClases,
    setRecargoProximasClases,
  } = useClases();
  const { idVerSede } = useSedes();

  useEffect(() => {
    const traerData = async () => {
      await obtenerClasesSedeManana(idVerSede);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      if (recargoProximasClases) {
        await obtenerClasesSedeManana(idVerSede);
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
  const diaSemanaActual = diasDeLaSemanaOrden[diaActual.weekday];

  return (
    <>
      <Card className="overflow-hidden xl:col-span-2">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex items-center justify-between p-6"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Proximas Mañana{" "}
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
                {["Hora", "Profesor", "Inscriptos", "Ocupacion"].map((el) => (
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
              {clasesSedeManana.map(
                (
                  {
                    img,
                    diaDeLaSemana,
                    horarioInicio,
                    nombreProfe,
                    clientes,
                    _id,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 text-center ${
                    key === clasesSedeManana.length - 1
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
                            className="font-body"
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
                        {clientes.map(({ img, nombre }, key) => (
                          <Tooltip key={nombre} content={name}>
                            <Avatar
                              src={"../../../public/img/team-1.jpeg"}
                              alt={nombre}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>

                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {clientes.length}%
                          </Typography>
                          <Progress
                            value={clientes.length}
                            variant="gradient"
                            color={clientes.length === 10 ? "green" : "blue"}
                            className="h-1"
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
    </>
  );
};

export default ClasesManana;
