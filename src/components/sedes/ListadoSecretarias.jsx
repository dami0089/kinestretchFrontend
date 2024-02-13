import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import { useNavigate } from "react-router-dom";
import useSedes from "@/hooks/useSedes";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import { EyeIcon } from "@heroicons/react/24/solid";

const ListadoSecretarias = () => {
  const {
    obtenerSedes,
    sedes,
    idVerSede,
    setIdVerSede,
    secretarias,
    obtenerSecretarias,
  } = useSedes();

  const { handleCargando } = useAuth();

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerSecretarias();
      handleCargando();
    };
    obtenerInfo();
  }, []);

  const navigate = useNavigate();

  const handleVer = (e, id) => {
    e.preventDefault();
    setIdVerSede(id);
    navigate("/sedes/profile-sede");
  };

  return (
    <>
      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <Typography className="mb-4 ml-4 mt-4 font-bold">
            Listado de Secretarias
          </Typography>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Nombre", "DNI", "Email", "Sede", "Accion"].map((el) => (
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
                {secretarias.map(
                  ({ _id, nombre, apellido, dni, email, nombreSede }, key) => {
                    const className = `py-3 px-5 text-center ${
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
                              {dni}
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
                              {nombreSede}
                            </Typography>
                          </div>
                        </td>

                        <td className={className}>
                          <div className="flex items-center justify-center gap-4">
                            <EyeIcon
                              className="h-8 w-8 hover:cursor-pointer"
                              onClick={(e) => handleVer(e, _id)}
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
      </div>
      <Cargando />
    </>
  );
};

export default ListadoSecretarias;
