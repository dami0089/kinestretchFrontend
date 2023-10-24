import useClases from "@/hooks/useClases";
import useProfesores from "@/hooks/useProfesores";

import { Button, Typography } from "@material-tailwind/react";
import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";

const ModalClaseProfe = () => {
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
  } = useClases();

  useEffect(() => {
    const obtenerNombresClientes = async () => {
      await obtenerClientesClases(idVerClase);
    };
    obtenerNombresClientes();
  }, []);

  return (
    <div>
      <Modal
        open={modalClasesProfe}
        onClose={handleModalClasesProfe}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute left-1/2 top-1/2 w-[800px] -translate-x-1/2 -translate-y-1/2 border border-black bg-white p-4 text-center shadow-lg">
          <h2 id="modal-modal-title" className="text-xl font-semibold">
            Clase del {diaClase}-{horaClase}hs en {sedeClase}
          </h2>
          {clientesClase.map((cliente) => (
            <div
              key={cliente._id}
              className="mb-5 mt-5 w-full overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer md:ml-10 md:w-96"
              // onClick={(e) => handleVerClase(e, clase._id, clase.diaDeLaSemana, clase.horarioInicio, clase.nombreSede)}
            >
              <div className="flex">
                {/* Columna 1: Nombre del cliente */}
                <div className="flex w-4/5 flex-col justify-center p-4">
                  <div className="text-lg font-medium">
                    Nombre: {cliente.nombre} {cliente.apellido}
                  </div>
                </div>

                {/* Columna 2: Tilde con fondo verde para confirmar asistencia */}
                <div className="flex w-1/6 items-center justify-center bg-green-500 p-4 text-white">
                  ✓
                </div>

                {/* Columna 3: Cruz con fondo rojo para confirmar inasistencia */}
                <div className="flex w-1/6 items-center justify-center bg-red-500 p-4 text-white">
                  ✕
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ModalClaseProfe;
