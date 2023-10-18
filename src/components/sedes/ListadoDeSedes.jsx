import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import { useNavigate } from "react-router-dom";
import useSedes from "@/hooks/useSedes";

const ListadoDeSedes = () => {
  const { obtenerSedes, sedes, idVerSede, setIdVerSede } = useSedes();

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerSedes();
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
            Listado de Sedes
          </Typography>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Nombre",
                    "Direccion",
                    "Localidad",
                    "Provincia",
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
                {sedes.map(
                  ({ _id, nombre, direccion, localidad, provincia }, key) => {
                    const className = `py-3 px-5 text-center ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {nombre}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {direccion}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {localidad}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {provincia}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Button
                            color="blue"
                            className="mx-1 items-center gap-4 px-6 capitalize"
                            fullWidth
                            onClick={(e) => handleVer(e, _id)}
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              ver
                            </Typography>
                          </Button>
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
    </>
  );
};

export default ListadoDeSedes;
