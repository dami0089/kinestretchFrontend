import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import useClientes from "@/hooks/useClientes";
import useClases from "@/hooks/useClases";
import Cargando from "../Cargando";
import ModalEditarDiagnostico from "./ModalEditarDiagnostico";

const ListadoAlumnosAusenteClaseProfe = () => {
  const { modalEditarDiagnostico } = useClientes();

  const { inasistentesClase } = useClases();

  return (
    <>
      <Typography className="ml-5 mt-8 font-bold uppercase">
        Alumnos Inasistentes
      </Typography>
      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {inasistentesClase.map(({ _id, nombre, apellido }, key) => (
          <Card key={_id} className="overflow-hidden shadow-lg">
            <CardBody className="px-6 py-4">
              <Typography className="mb-2 text-center text-xl font-bold">
                {nombre} {apellido}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
      {modalEditarDiagnostico && <ModalEditarDiagnostico />}
      <Cargando />
    </>
  );
};

export default ListadoAlumnosAusenteClaseProfe;
