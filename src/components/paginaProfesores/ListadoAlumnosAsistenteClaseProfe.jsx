import { Card, CardBody, Typography } from "@material-tailwind/react";

import React from "react";
import { useParams } from "react-router-dom";
import useClientes from "@/hooks/useClientes";
import useClases from "@/hooks/useClases";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import ModalEditarDiagnostico from "./ModalEditarDiagnostico";

const ListadoAlumnosAsistenteClaseProfe = () => {
  const { modalEditarDiagnostico } = useClientes();
  const { asistenciasClase } = useClases();
  const { handleCargando } = useAuth();
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Typography className="ml-5 mt-8 font-bold uppercase">
        Alumnos Asistentes
      </Typography>
      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {asistenciasClase.map(({ _id, clientes }, key) => (
          <Card key={_id} className="overflow-hidden shadow-lg">
            <CardBody className="px-6 py-4">
              <Typography className="mb-2 text-center text-xl font-bold">
                {clientes[0].nombre} {clientes[0].apellido}
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

export default ListadoAlumnosAsistenteClaseProfe;
