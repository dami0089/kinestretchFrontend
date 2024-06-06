import { Avatar, Typography, Button } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

import useAuth from "@/hooks/useAuth";

import ClasesProfesor from "@/components/paginaProfesores/ClasesProfesor";
import Cargando from "@/components/Cargando";
import useProfesores from "@/hooks/useProfesores";
import ModalClaseProfe from "@/components/paginaProfesores/ModalClaseProfe";
import useClases from "@/hooks/useClases";
import ModalRegistrarPagoProfesor from "@/components/paginaProfesores/ModalRegistrarPagoProfesor";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListadoAlumnosClaseClasesVistaProfe from "@/components/paginaProfesores/ListadoAlumnosClaseClasesVistaProfe";
import ListadoAlumnosAusenteClaseProfe from "@/components/paginaProfesores/ListadoAlumnosAusenteClaseProfe";
import ListadoAlumnosAsistenteClaseProfe from "@/components/paginaProfesores/ListadoAlumnosAsistenteClaseProfe";
import ModalEnviarMensajeClase from "@/components/clases/ModalEnviarMensajeClase";

export function ClasesProfe() {
  const { auth, handleCargando } = useAuth();
  const { modalClasesProfe, obtenerProfesor, profesor } = useProfesores();
  const {
    modalRegistrarPagoProfe,
    limpiarAsistencias,
    obtenerClase,
    clase,
    inasistentesClase,
    obtenerInasistentesClase,
    asistenciasClase,
    obtenerTodasLasAsistenciasClase,
    modalEnviarMensajeClase,
    handleModalEnviarMensajeClase,
  } = useClases();

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const obtenerDataClase = async () => {
      handleCargando();
      await obtenerClase(id);
      await obtenerInasistentesClase(id);
      await obtenerTodasLasAsistenciasClase(id);

      handleCargando();
    };
    obtenerDataClase();
  }, []);

  const handleMensaje = (e) => {
    e.preventDefault();

    handleModalEnviarMensajeClase();
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <section className="relative block h-[40vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/trainer-grupo-personas-ayudando-ejercicios-estiramiento.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative h-auto bg-blue-gray-50/50 px-4 py-16">
        <div className="container mx-auto">
          <div className="relative -mt-64 mb-6 flex h-full w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src="/img/lado-frontal-usuario-fondo-blanco.jpg"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  {/* <Button className="bg-blue-400">Mensaje</Button> */}
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12"></div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  Clase del {clase.diaDeLaSemana} - {clase.horarioInicio}:00 HS
                </Typography>
              </div>

              {auth.rol === "admin" ? (
                <div>
                  <Button onClick={(e) => handleMensaje(e)}>Comunicar</Button>
                </div>
              ) : null}
            </div>
            <div className="align-middle ">
              <ListadoAlumnosClaseClasesVistaProfe />
            </div>

            {inasistentesClase.length > 0 ? (
              <div className="align-middle ">
                <ListadoAlumnosAusenteClaseProfe />
              </div>
            ) : null}

            {asistenciasClase.length > 0 ? (
              <div className="align-middle ">
                <ListadoAlumnosAsistenteClaseProfe />
              </div>
            ) : null}

            <Cargando />
          </div>
          {modalClasesProfe ? <ModalClaseProfe /> : ""}
          {modalRegistrarPagoProfe ? <ModalRegistrarPagoProfesor /> : ""}
          {modalEnviarMensajeClase ? <ModalEnviarMensajeClase /> : null}
        </div>
      </section>
    </>
  );
}

export default ClasesProfe;
