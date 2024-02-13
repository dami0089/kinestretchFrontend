import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  CurrencyDollarIcon,
  PlusIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  CalendarDaysIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import useSedes from "@/hooks/useSedes";
import { ProfileInfoCard } from "@/widgets/cards";
import ProximaClaseSede from "./ProximaClaseSede";
import ClasesManana from "./ClasesManana";
import useClases from "@/hooks/useClases";
import ModalNuevaClaseSede from "./ModalNuevaClaseSede";
import ClasesSedes from "../clases/ClasesSedes";
import Cargando from "../Cargando";
import { useNavigate } from "react-router-dom";

import ModalClaseSede from "./ModalClaseSede";
import useAuth from "@/hooks/useAuth";

export function ProfileSede() {
  const { idVerSede, obtenerSede, sede, modalVerClase } = useSedes();
  const [valueProfile, setValueProfile] = useState(1);
  const {
    obtenerClasesSede,
    clasesSede,
    modalNuevaClaseSede,
    handleModalNuevaClaseSede,
  } = useClases();

  const navigate = useNavigate();

  const { handleCargando } = useAuth();

  useEffect(() => {
    const traerData = async () => {
      handleCargando();
      await obtenerSede(idVerSede);
      handleCargando();
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerClasesSede(idVerSede);
    };
    traerData();
  }, []);

  const handleCompartir = (e) => {
    e.preventDefault();
    const url = `/disponibilidad-sede/${idVerSede}`; // Construye la URL
    window.open(url, "_blank"); // Abre la URL en una nueva pestaña
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <Card className="mx-3 mb-6 mt-8 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="ml-5 font-body"
                >
                  Nombre:{" "}
                  <span className="text-blue-gray-300">{sede.nombre}</span>
                </Typography>
              </div>
            </div>
            <div className="block w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app" onClick={(e) => setValueProfile(1)}>
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Inicio
                  </Tab>
                  <Tab value="message" onClick={(e) => setValueProfile(2)}>
                    <CalendarDaysIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Clases
                  </Tab>
                  <Tab value="settings" onClick={(e) => setValueProfile(3)}>
                    <UserGroupIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Alumnos
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          {valueProfile == 1 ? (
            <>
              <div className="mb-12 grid grid-cols-2 justify-between gap-28 px-4 lg:grid-cols-2 xl:grid-cols-2">
                <div>
                  <ProfileInfoCard
                    title="Informacion"
                    details={{
                      Nombre: `${sede.nombre}`,
                      Direccion: `${sede.direccion ? sede.direccion : ""}`,
                      Localidad: `${sede.localidad}`,

                      // "Fecha de Vencimiento": `${formatearFecha(
                      //   editarCliente.fechaVencimiento
                      // )}`,
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center text-right">
                  <div className="mb-2">
                    <Button
                      className={`w-full bg-blue-gray-300`}
                      onClick={(e) => handleModalNuevaClaseSede()}
                    >
                      Nueva Clase
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      className={`w-full bg-blue-gray-400`}
                      // onClick={(e) => handleClickEditar()}
                    >
                      Editar Sede
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      className={`w-full bg-blue-gray-400`}
                      onClick={(e) => handleCompartir(e)}
                    >
                      Compartir Disponibilidad
                    </Button>
                  </div>
                </div>
              </div>
              {clasesSede.length > 3 ? (
                <ProximaClaseSede />
              ) : (
                <>
                  <ProximaClaseSede />
                  <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

                  <div className="mt-4">
                    <ClasesManana />
                  </div>
                </>
              )}
            </>
          ) : valueProfile == 2 ? (
            <>
              <ClasesSedes />
            </>
          ) : valueProfile == 3 ? (
            <>
              <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4 ">
                <Card>
                  <Button
                    variant="gradient"
                    color="pink"
                    className="absolute -mt-4 grid h-16 w-16 place-items-center"
                    // onClick={(e) => handleAdicional()}
                  >
                    <BanknotesIcon />
                  </Button>
                  <CardBody className="p-4 text-right">
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      Nuevo Adicional
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Fecha", "Concepto", "Importe", "Notas", "Accion"].map(
                        (el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 px-6 py-3 text-left"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                </table>
              </CardBody>
            </>
          ) : (
            ""
          )}
          {modalNuevaClaseSede ? <ModalNuevaClaseSede /> : ""}
          {modalVerClase ? <ModalClaseSede /> : ""}
          <Cargando />
        </CardBody>
      </Card>
    </>
  );
}

export default ProfileSede;
