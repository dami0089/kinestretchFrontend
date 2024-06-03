import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useClientes from "@/hooks/useClientes";
import useClases from "@/hooks/useClases";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import ModalEditarDiagnostico from "./ModalEditarDiagnostico";

const ListadoAlumnosAusenteClaseProfe = () => {
  const {
    setDiagnosticoEditar,
    setIdCliente,
    handleModalEditarDiagnostico,
    modalEditarDiagnostico,
    setActualizarListado,
  } = useClientes();

  const {
    inasistentesClase,
    eliminarClienteDeClase,
    registrarInasistenciaPaginaProfe,
    asistencias,
    obtenerAsistenciasClase,
    asistencia,
    clase,
    inasist,
  } = useClases();

  const { handleCargando } = useAuth();
  const params = useParams();
  const { id } = params;

  const handleEliminar = (e, _id) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Seguro quieres eliminar al cliente de la clase?",
      text: "Esta acción lo borrará para siempre de la clase",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarClienteDeClase(_id, id);
        setActualizarListado(true);
        handleCargando();
      }
    });
  };

  const handleInasistencia = async (e, _id) => {
    e.preventDefault();
    if (asistencias.includes(_id)) {
      toast.error("Ya registraste una asistencia para este cliente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    Swal.fire({
      title: "¿Registramos la inasistencia?",
      text: "Se marcará al cliente como inasistente",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await registrarInasistenciaPaginaProfe(_id, id);
        setActualizarListado(true);
        toast.success("Inasistencia registrada", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleCargando();
      }
    });
  };

  return (
    <>
      <Typography className="ml-5 mt-8 font-bold uppercase">
        Alumnos Inasistentes con aviso
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
