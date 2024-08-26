import { projectsTableData } from "@/data";
import { convertirHora } from "@/helpers/convertirHora";
import useClases from "@/hooks/useClases";
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

const ProximasClases = () => {
  const { clasesOrdenadasInicio, obtenerClasesOrdenadasInicio } = useClases();

  useEffect(() => {
    const clasesOrdenadas = async () => {
      await obtenerClasesOrdenadasInicio();
    };
    clasesOrdenadas();
  }, []);

  return (
    <Card className="overflow-hidden xl:col-span-2">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between p-6"
      >
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Proximas Clases
          </Typography>
        </div>
        <Menu placement="left-start">
          <MenuHandler>
            <IconButton size="sm" variant="text" color="blue-gray">
              <EllipsisVerticalIcon
                strokeWidth={3}
                fill="currenColor"
                className="h-6 w-6"
              />
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem>Belgrano</MenuItem>
            <MenuItem>Caballito</MenuItem>
            <MenuItem>Palermo</MenuItem>
            <MenuItem>Tribunales</MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Dia y Hora", "Sede", "Profe", "Ocupacion", "Ver"].map((el) => (
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
            {clasesOrdenadasInicio.map(
              (
                {
                  diaDeLaSemana,
                  horarioInicio,
                  nombreSede,
                  nombreProfe,
                  clientes,
                },
                key
              ) => {
                const className = `py-3 px-5 ${
                  key === projectsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center justify-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {diaDeLaSemana} {convertirHora(horarioInicio)} hs
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
                          {nombreSede}
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
                    <td className={className}>
                      <div className="flex items-center justify-center gap-4">
                        <EyeIcon className="h-8 w-8 text-blue-gray-600 hover:cursor-pointer" />
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
  );
};

export default ProximasClases;
