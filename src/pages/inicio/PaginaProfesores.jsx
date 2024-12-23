import { Avatar, Typography, Button } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

import useAuth from "@/hooks/useAuth";

import ClasesProfesor from "@/components/paginaProfesores/ClasesProfesor";
import Cargando from "@/components/Cargando";
import useProfesores from "@/hooks/useProfesores";
import ModalClaseProfe from "@/components/paginaProfesores/ModalClaseProfe";
import useClases from "@/hooks/useClases";

import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import ModalRegistrarPagoProfesor from "@/components/paginaProfesores/ModalRegistrarPagoProfesor";

export function PaginaProfesores() {
  const { auth } = useAuth();
  const { modalClasesProfe, obtenerProfesor, profesor } = useProfesores();
  const {
    modalRegistrarPagoProfe,
    setClientesClaseVer,
    setInasistentesClase,
    setClase,
  } = useClases();

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerProfesor(auth.profesor);
      setClientesClaseVer([]);
      setInasistentesClase([]);
      setClase([]);
    };
    obtenerInfo();
  }, []);

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/trainer-grupo-personas-ayudando-ejercicios-estiramiento.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative h-auto bg-blue-gray-50/50 px-4 py-16">
        <div className="container mx-auto">
          <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
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
                  {profesor.nombre} {profesor.apellido}
                </Typography>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <UserIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    Profesor
                  </Typography>
                </div>
              </div>
            </div>
            <div className="align-middle ">
              <ClasesProfesor />
            </div>
          </div>
          {modalClasesProfe ? <ModalClaseProfe /> : ""}
          {modalRegistrarPagoProfe ? <ModalRegistrarPagoProfesor /> : ""}
          <Cargando />
        </div>
      </section>
    </>
  );
}

export default PaginaProfesores;
