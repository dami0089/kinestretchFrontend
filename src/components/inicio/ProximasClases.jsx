import { projectsTableData } from "@/data";
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
import React from "react";

const ProximasClases = () => {
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
              {["Fecha, hora y Sede", "Alumnos", "Profe", "Ocupacion"].map(
                (el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 px-6 py-3 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {projectsTableData.map(
              ({ img, name, members, budget, completion }, key) => {
                const className = `py-3 px-5 ${
                  key === projectsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      {members.map(({ img, name }, key) => (
                        <Tooltip key={name} content={name}>
                          <Avatar
                            src={img}
                            alt={name}
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
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {budget}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="w-10/12">
                        <Typography
                          variant="small"
                          className="mb-1 block text-xs font-medium text-blue-gray-600"
                        >
                          {completion}%
                        </Typography>
                        <Progress
                          value={completion}
                          variant="gradient"
                          color={completion === 100 ? "green" : "blue"}
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
  );
};

export default ProximasClases;
