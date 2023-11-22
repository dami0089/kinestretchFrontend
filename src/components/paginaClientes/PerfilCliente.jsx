import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import useAuth from "@/hooks/useAuth";
import ListadodeClientes from "@/components/clientes/ListadodeClientes";
import ListadoClasesCliente from "@/components/paginaClientes/ListadoClasesCliente";
import EditarDatosPerfil from "./EditarDatosPerfil";
import useClientes from "@/hooks/useClientes";
import { useEffect } from "react";
import ModalEditarDatosCliente from "./ModalEditarDatosCliente";

export function PerfilCliente() {
  const { auth } = useAuth();

  const {
    nombreCliente,
    setNombreCliente,
    apellidoCliente,
    setApellidoCliente,
    dniCliente,
    setDniCliente,
    emailCliente,
    setEmailCliente,
    celularCliente,
    setCelularCliente,
    fechaNacimientoCliente,
    setFechaNacimientoCliente,
    nombreContactoEmergencia,
    setNombreContactoEmergencia,
    celularContactoEmergencia,
    setCelularContactoEmergencia,
    obtenerCliente,
    cliente,
    modalEditarDatosPerfilCliente,
    handleModalDatosCliente,
  } = useClientes();

  useEffect(() => {
    const obtenerCli = async (e) => {
      await obtenerCliente(auth.cliente);
    };
    obtenerCli();
  }, []);

  const editarCliente = (e) => {
    e.preventDefault();
    setNombreCliente(cliente.nombre);
    setApellidoCliente(cliente.apellido);
    setDniCliente(cliente.dni);
    setEmailCliente(cliente.email);
    setCelularCliente(cliente.celular);
    setFechaNacimientoCliente(cliente.fechaNacimiento);
    setNombreContactoEmergencia(cliente.nombreContactoEmergencia);
    setCelularContactoEmergencia(cliente.celularContactoEmergencia);
    handleModalDatosCliente();
  };

  return (
    <>
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
                  <Button
                    onClick={(e) => editarCliente(e)}
                    className="bg-blue-400"
                  >
                    Editar Datos
                  </Button>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12"></div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {auth.nombre} {auth.apellido}
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
              <EditarDatosPerfil />
            </div>
          </div>
        </div>
      </section>
      {modalEditarDatosPerfilCliente ? <ModalEditarDatosCliente /> : ""}
    </>
  );
}

export default PerfilCliente;
