import { projectsTableData } from "@/data";
import useClases from "@/hooks/useClases";
import useProfesores from "@/hooks/useProfesores";

import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
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
    <>
      <Modal
        open={modalClasesProfe}
        onClose={handleModalClasesProfe}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute left-1/2 top-1/2 mx-4 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded border border-black bg-white p-4 text-center shadow-lg md:w-[800px] md:max-w-none">
          <h2
            id="modal-modal-title"
            className="mb-4 text-xl font-semibold md:text-2xl"
          >
            Clase del {diaClase}-{horaClase}hs en {sedeClase}
          </h2>

          <CardBody className="max-h-[60vh] overflow-y-auto px-0 pb-2 pt-0">
            <div className="responsive-table">
              {clientesClase.map(({ _id, nombre, apellido }, key) => (
                <div key={_id} className="card mb-4 border p-4">
                  <div className="card-row mb-2 flex flex-wrap">
                    <Typography
                      variant="small"
                      className="w-full text-xl font-medium uppercase text-blue-gray-400 md:w-auto"
                    >
                      Nombre:
                    </Typography>
                    <Typography
                      variant="small"
                      className="ml-4 w-full text-xl font-bold text-blue-gray-800 md:w-auto"
                    >
                      {nombre} {apellido}
                    </Typography>
                  </div>
                  <div className="card-row mb-2 flex flex-wrap justify-between">
                    <Typography
                      variant="small"
                      className="w-full text-xl  font-medium uppercase text-blue-gray-400 md:w-auto"
                    >
                      Observaciones:{" "}
                    </Typography>
                    <Typography
                      variant="small"
                      className="w-full font-bold text-blue-gray-800 md:w-auto"
                    >
                      {/* {email} */}
                    </Typography>
                  </div>

                  <div className="card-row mt-4 flex flex-wrap justify-between space-y-2 md:space-y-0">
                    <Button className="mb-2 mr-5 w-full bg-green-500 md:mb-0 md:w-auto">
                      Asistencia
                    </Button>
                    <Button className="mb-2 mr-5 w-full bg-orange-500 md:mb-0 md:w-auto">
                      Inasistencia
                    </Button>
                    <Button className="mr-5 w-full bg-blue-gray-500 md:w-auto">
                      Registrar Pago
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </div>
      </Modal>
    </>
  );
};

export default ModalClaseProfe;
