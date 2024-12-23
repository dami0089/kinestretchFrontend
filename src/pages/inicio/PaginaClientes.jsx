import { Avatar, Typography } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import useAuth from "@/hooks/useAuth";
import ListadoClasesCliente from "@/components/paginaClientes/ListadoClasesCliente";
import { ToastContainer } from "react-toastify";
import useClientes from "@/hooks/useClientes";
import { useEffect } from "react";
import useClases from "@/hooks/useClases";
import ModalClaseRecupero from "@/components/paginaClientes/ModalClaseRecupero";
import Cargando from "@/components/Cargando";
import ModalCancelarClase from "@/components/paginaClientes/ModalCancelarClase";
import ModalAceptarTerminos from "@/components/paginaClientes/ModalAceptarTerminos";

export function PaginaClientes() {
  const { auth, consultarTerminos, modalAceptarTerminos } = useAuth();
  const { obtenerCliente, cliente, obtenerCreditosCliente, creditosCliente } =
    useClientes();
  const {
    modalClaseRecupero,
    handleModalClaseRecupero,
    obtenerInasistencias,
    modalCancelarClase,
  } = useClases();

  useEffect(() => {
    const dataCliente = async () => {
      await obtenerCliente(auth.cliente);
      await consultarTerminos(auth._id);
      await obtenerCreditosCliente(auth.cliente);
      await obtenerInasistencias(auth.cliente);
    };
    dataCliente();
  }, []);

  const handleReservarRecupero = async (e) => {
    e.preventDefault();
    handleModalClaseRecupero();
  };

  return (
    <>
      <ToastContainer />
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/public/img/Kinestretch-.png')] bg-cover bg-center" />
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
                        src="/img/lado-frontal-usuario-fondo-blanco.jpg"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  {/* <Button className="bg-blue-400">Mensaje</Button> */}
                </div>
                <div className="w-full lg:order-1 lg:w-4/12">
                  <div
                    class="mt-5 flex-1 font-light text-gray-600 hover:cursor-pointer"
                    onClick={(e) => handleReservarRecupero(e)}
                  >
                    {creditosCliente.length > 0 ? (
                      <div class="rounded border border-red-500 p-2 text-center">
                        {creditosCliente.length > 0 ? (
                          <>
                            <p>
                              Tenes {creditosCliente.length} credito disponibles{" "}
                            </p>
                            <strong>Reserva tu clase haciendo clic aqui</strong>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {cliente.nombre} {cliente.apellido}
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  {auth.nombreSede ? (
                    <>
                      <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                      <Typography className="font-medium text-blue-gray-700">
                        {auth.nombreSede}
                      </Typography>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="align-middle ">
              <ListadoClasesCliente />
            </div>
          </div>
        </div>
      </section>
      {modalClaseRecupero ? <ModalClaseRecupero /> : ""}
      {modalCancelarClase ? <ModalCancelarClase /> : ""}
      {modalAceptarTerminos ? <ModalAceptarTerminos /> : ""}
      <Cargando />
    </>
  );
}

export default PaginaClientes;
