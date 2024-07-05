import { Avatar, Typography, Button } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

import useAuth from "@/hooks/useAuth";

import ClasesProfesor from "@/components/paginaProfesores/ClasesProfesor";
import Cargando from "@/components/Cargando";
import useProfesores from "@/hooks/useProfesores";
import ModalClaseProfe from "@/components/paginaProfesores/ModalClaseProfe";
import useClases from "@/hooks/useClases";

import { ToastContainer, toast } from "react-toastify";
import ListadoPagosCobradosPorProfesor from "./ListadoPagosCobradosPorProfesor";
import ModalEditarPago from "../clientes/ModalEditarPago";
import useClientes from "@/hooks/useClientes";
import { useEffect, useState } from "react";
import ModalRegistrarRetiro from "./ModalRegistrarRetiro";
import Swal from "sweetalert2";
import ModalRegistrarPagoProfesor from "./ModalRegistrarPagoProfesor";

export function ContableProfesores() {
  const { auth, handleCargando } = useAuth();
  const {
    modalClasesProfe,
    registrosContbalesProfe,
    registrarRetiro,
    handleRetiro,
    modalRegistrarRetiro,
    hacerCierre,
  } = useProfesores();
  const { modalRegistrarPagoProfe, setActualizoClasesCliente } = useClases();
  const { modalEditarPago } = useClientes();

  const [totalImporte, setTotalImporte] = useState(0);

  useEffect(() => {
    // Función para sumar o restar los importes
    const calcularTotal = () => {
      const total = registrosContbalesProfe.reduce((acum, registro) => {
        // Verifica si nombreCliente tiene un valor significativo
        if (registro.nombreCliente) {
          return acum + Number(registro.importe);
        }
        // Si nombreCliente no tiene valor pero nombreProfe sí, entonces resta el importe
        else if (registro.nombreProfe) {
          return acum - Number(registro.importe);
        }
        // Si ninguno de los dos campos tiene valor, no modifica el acumulador
        return acum;
      }, 0);

      setTotalImporte(total);
    };

    if (registrosContbalesProfe && registrosContbalesProfe.length > 0) {
      // Llamar a la función para calcular el total
      calcularTotal();
    }
  }, [registrosContbalesProfe]);

  const retiro = (e) => {
    e.preventDefault();
    handleRetiro();
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('../../../public/img/trainer-grupo-personas-ayudando-ejercicios-estiramiento.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative h-[50vh] bg-blue-gray-50/50 px-4 py-16">
        <div className="container mx-auto">
          <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src="../../../public/img/lado-frontal-usuario-fondo-blanco.jpg"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-8/12 lg:justify-end lg:self-center">
                    <Button
                      onClick={(e) => retiro(e)}
                      className="w-full bg-blue-400"
                    >
                      Registrar Retiro
                    </Button>
                  </div>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12"></div>
              </div>
              <div className="ml-4 flex justify-between">
                <div className="my-8 text-center">
                  <Typography variant="h2" color="blue-gray" className="mb-2">
                    {auth.nombre} {auth.apellido}
                  </Typography>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <UserIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                    <Typography className="font-medium text-blue-gray-700">
                      Instructor
                    </Typography>
                  </div>
                </div>
                <div></div>
                <div className="my-8 text-center">
                  <div class="flex-1 font-light text-gray-600">
                    <div class="rounded border border-blue-500 p-2">
                      <p className=" uppercase text-black">
                        Total en Caja:{" "}
                        <strong className="font-bold text-blue-gray-400">
                          $ {totalImporte}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4 mr-4 align-middle">
              <ListadoPagosCobradosPorProfesor />
            </div>
            <Cargando />
          </div>
          {modalClasesProfe ? <ModalClaseProfe /> : ""}
          {modalRegistrarPagoProfe ? <ModalRegistrarPagoProfesor /> : ""}
          {modalEditarPago ? <ModalEditarPago /> : ""}
          {modalRegistrarRetiro ? <ModalRegistrarRetiro /> : ""}
        </div>
      </section>
    </>
  );
}

export default ContableProfesores;
