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
import ModalEnviarMensajeSede from "./ModalEnviarMensajeSede";
import ListadoCobrosSede from "./ListadoCobrosSede";
import ListadoDeCajasSede from "./ListadoDeCajasSede";
import ListadoDeAsistenciasSede from "./ListadoDeAsistenciasSede";
import ListadoDeInasistencias from "./ListadoDeInasistencias";
import ListadoClientesSede from "./ListadoClientesSede";

export function ProfileSede() {
  const {
    idVerSede,
    obtenerSede,
    sede,
    modalVerClase,
    handleModalEnviarMensajeSede,
    modalEnviarMensajeSede,
    asistInasist,
    setAsistInasist,
  } = useSedes();
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
            <div className="block w-full">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app" onClick={(e) => setValueProfile(1)}>
                    <div className="flex items-center">
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Inicio
                    </div>
                  </Tab>
                  <Tab value="message" onClick={(e) => setValueProfile(2)}>
                    <div className="flex items-center">
                      <CalendarDaysIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                      Clases
                    </div>
                  </Tab>
                  <Tab value="cobros" onClick={(e) => setValueProfile(3)}>
                    <div className="flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 48 48"
                      >
                        <defs>
                          <mask id="IconifyId1907f552e5d7db7171">
                            <g
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="4"
                              className="-mt-0.5 mr-2  inline-block h-5 w-5"
                            >
                              <path
                                fill="#fff"
                                stroke="#fff"
                                d="M10 6a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v38l-7-5l-7 5l-7-5l-7 5z"
                              />
                              <path
                                stroke="#000"
                                d="M18 22h12m-12 8h12M18 14h12"
                              />
                            </g>
                          </mask>
                        </defs>
                        <path
                          fill="currentColor"
                          d="M0 0h48v48H0z"
                          mask="url(#IconifyId1907f552e5d7db7171)"
                        />
                      </svg>
                      <p>Cobros</p>
                    </div>
                  </Tab>
                  <Tab value="cajas" onClick={(e) => setValueProfile(4)}>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="-mt-0.5 mr-2  inline-block h-5 w-5"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12.052 1.25h-.104c-.899 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.725c-.456.456-.642 1.023-.726 1.65c-.057.427-.074 1.446-.078 2.32c-2.022.067-3.237.303-4.08 1.147C2 8.343 2 10.229 2 14c0 3.771 0 5.657 1.172 6.828C4.343 22 6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172C22 19.657 22 17.771 22 14c0-3.771 0-5.657-1.172-6.828c-.843-.844-2.058-1.08-4.08-1.146c-.004-.875-.02-1.894-.078-2.32c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.344-.08-2.242-.08m3.196 4.752c-.005-.847-.019-1.758-.064-2.097c-.063-.461-.17-.659-.3-.789c-.13-.13-.328-.237-.79-.3c-.482-.064-1.13-.066-2.094-.066s-1.612.002-2.095.067c-.461.062-.659.169-.789.3c-.13.13-.237.327-.3.788c-.045.34-.06 1.25-.064 2.097C9.143 6 9.56 6 10 6h4c.441 0 .857 0 1.248.002M12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 0 1-1.5 0c0-.384-.426-.916-1.25-.916c-.824 0-1.25.532-1.25.916s.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417c0 1.19-.911 2.048-2 2.323V18a.75.75 0 0 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 0 1 1.5 0c0 .384.426.916 1.25.916c.824 0 1.25-.532 1.25-.916s-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417c0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>Cajas</p>
                    </div>
                  </Tab>
                  <Tab value="asistencias" onClick={(e) => setValueProfile(5)}>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="-mt-0.5 mr-2  inline-block h-5 w-5"
                      >
                        <path
                          fill="currentColor"
                          d="M12 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1m-5 4a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1M7 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM7 18a1 1 0 1 0-1-1a1 1 0 0 0 1 1"
                        />
                      </svg>
                      <p>Asistencias</p>
                    </div>
                  </Tab>
                  <Tab value="clientes" onClick={(e) => setValueProfile(6)}>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="-mt-0.5 mr-2  inline-block h-5 w-5"
                      >
                        <path
                          fill="currentColor"
                          d="M14.366 6.73v-1h7v1zm0 3.77v-1h7v1zm0 3.77v-1h7v1zm-6.496-.654q-.928 0-1.581-.65q-.654-.65-.654-1.577t.649-1.581t1.577-.654t1.581.65t.654 1.576t-.65 1.582q-.648.654-1.576.654m-5.235 5.23v-1.13q0-.327.163-.622t.44-.475q1.049-.598 2.2-.916q1.15-.318 2.428-.318q1.276 0 2.427.318t2.2.916q.276.179.44.475t.163.622v1.13zm1.034-1.307v.307h8.393v-.307q-.99-.558-2.052-.856t-2.144-.298t-2.145.298q-1.061.298-2.052.856m4.197-4.923q.501 0 .866-.365t.364-.866t-.364-.867t-.866-.364t-.867.364t-.364.867t.364.866t.867.365m0 5.23"
                        />
                      </svg>
                      <p>Clientes</p>
                    </div>
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
                  <div className="mb-2">
                    <Button
                      className={`w-full bg-blue-gray-300`}
                      onClick={(e) => handleModalEnviarMensajeSede()}
                    >
                      Comunicar Sede
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
              <ListadoCobrosSede />
            </>
          ) : valueProfile == 4 ? (
            <>
              <ListadoDeCajasSede />
            </>
          ) : valueProfile == 5 ? (
            <>
              {asistInasist === "a" ? (
                <ListadoDeAsistenciasSede />
              ) : asistInasist === "b" ? (
                <ListadoDeInasistencias />
              ) : null}
            </>
          ) : valueProfile == 6 ? (
            <ListadoClientesSede />
          ) : (
            ""
          )}
          {modalNuevaClaseSede ? <ModalNuevaClaseSede /> : ""}
          {modalVerClase ? <ModalClaseSede /> : ""}
          {modalEnviarMensajeSede ? <ModalEnviarMensajeSede /> : null}
          <Cargando />
        </CardBody>
      </Card>
    </>
  );
}

export default ProfileSede;
