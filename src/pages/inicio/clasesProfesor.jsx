import { Avatar, Typography, Button } from "@material-tailwind/react";
import useAuth from "@/hooks/useAuth";
import Cargando from "@/components/Cargando";
import useProfesores from "@/hooks/useProfesores";
import ModalClaseProfe from "@/components/paginaProfesores/ModalClaseProfe";
import useClases from "@/hooks/useClases";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListadoAlumnosClaseClasesVistaProfe from "@/components/paginaProfesores/ListadoAlumnosClaseClasesVistaProfe";
import ListadoAlumnosAusenteClaseProfe from "@/components/paginaProfesores/ListadoAlumnosAusenteClaseProfe";
import ModalEnviarMensajeClase from "@/components/clases/ModalEnviarMensajeClase";
import ModalRegistrarPagoProfesor from "@/components/paginaProfesores/ModalRegistrarPagoProfesor";
import { convertirHora } from "@/helpers/convertirHora";

export function ClasesProfe() {
  const { auth, handleCargando } = useAuth();
  const { modalClasesProfe } = useProfesores();
  const {
    modalRegistrarPagoProfe,
    obtenerClase,
    clase,
    inasistentesClase,
    obtenerInasistentesClase,
    obtenerTodasLasAsistenciasClase,
    modalEnviarMensajeClase,
    handleModalEnviarMensajeClase,
    clientesClaseVer,
  } = useClases();

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const obtenerDataClase = async () => {
      handleCargando();
      await obtenerTodasLasAsistenciasClase(id);
      await obtenerInasistentesClase(id);
      await obtenerClase(id);
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
      {clase && clase.diaDeLaSemana && clientesClaseVer ? (
        <>
          <ToastContainer pauseOnFocusLoss={false} />

          <section className="relative block h-[40vh]">
            <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/trainer-grupo-personas-ayudando-ejercicios-estiramiento.jpg')] bg-cover bg-center" />
            <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
          </section>
          <section className="relative max-h-screen bg-blue-gray-50/50 px-4 py-16">
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
                    <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center"></div>
                    <div className="w-full px-4 lg:order-1 lg:w-4/12"></div>
                  </div>
                  <div className="my-8 text-center">
                    <Typography variant="h2" color="blue-gray" className="mb-2">
                      Clase del {clase.diaDeLaSemana} -{" "}
                      {convertirHora(clase.horarioInicio)} HS
                    </Typography>
                  </div>

                  {auth.rol === "admin" ? (
                    <div>
                      <Button onClick={(e) => handleMensaje(e)}>
                        Comunicar
                      </Button>
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
              </div>
            </div>
          </section>
        </>
      ) : (
        <h1>Cargando..</h1>
      )}

      {modalClasesProfe ? <ModalClaseProfe /> : ""}
      {modalRegistrarPagoProfe ? <ModalRegistrarPagoProfesor /> : ""}
      {modalEnviarMensajeClase ? <ModalEnviarMensajeClase /> : null}
      <Cargando />
    </>
  );
}

export default ClasesProfe;
