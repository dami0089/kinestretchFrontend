import { projectsTableData } from "@/data";
import useAuth from "@/hooks/useAuth";
import useClases from "@/hooks/useClases";
import useClientes from "@/hooks/useClientes";
import useProfesores from "@/hooks/useProfesores";

import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";
import Cargando from "../Cargando";

const ModalVerClase = () => {
  const { handleModalClasesProfe, modalClasesProfe } = useProfesores();
  const {
    idVerClase,
    setIdVerClase,
    clientesClase,
    obtenerClientesClases,
    diaClase,
    setDiaClase,
    horaClase,
    setHoraClase,
    sedeClase,
    setSedeClase,

    clase,
    obtenerClase,
    idClasePerfilCliente,
    setIdClasePerfilCliente,
  } = useClases();

  const { handleVerClase, modalVerClaseCliente } = useClientes();

  const { handleCargando } = useAuth();

  useEffect(() => {
    const obtenerDataClase = async () => {
      handleCargando();
      await obtenerClase(idClasePerfilCliente);
      handleCargando();
    };
    obtenerDataClase();
  }, []);

  return (
    <>
      <Modal
        open={modalVerClaseCliente}
        onClose={handleVerClase}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute left-1/2 top-1/2 mx-4 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded border border-black bg-white p-4 text-center shadow-lg md:w-[800px] md:max-w-none">
          <h2
            id="modal-modal-title"
            className="mb-4 text-xl font-semibold md:text-2xl"
          >
            Clase del {clase.diaDeLaSemana}-{clase.horarioInicio}hs en{" "}
            {clase.nombreSede}
          </h2>
          <p className="mb-4">Profesor: {clase.nombreProfe}</p>
          <button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            // onClick={handleCancelarClase}
          >
            Cancelar Clase
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModalVerClase;
