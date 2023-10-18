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

export function ProfileSede() {
  const { idVerSede, obtenerSede, sede } = useSedes();
  const [valueProfile, setValueProfile] = useState(1);
  const {
    obtenerClasesSede,
    clasesSede,
    modalNuevaClaseSede,
    handleModalNuevaClaseSede,
  } = useClases();

  useEffect(() => {
    const traerData = async () => {
      await obtenerSede(idVerSede);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerClasesSede(idVerSede);
    };
    traerData();
  }, []);

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

                  {/* <tbody>
                            {adicional.map(
                              (
                                { _id, fecha, detalle, importe, notas },
                                key
                              ) => {
                                const className = `py-3 px-5 ${
                                  key === projectsTableData.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                                }`;

                                return (
                                  <tr key={_id}>
                                    <td className={className}>
                                      <div className="flex items-center gap-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-bold"
                                        >
                                          {formatearFecha(fecha)}
                                        </Typography>
                                      </div>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="text-xs font-medium text-blue-gray-600"
                                      >
                                        {detalle}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="text-xs font-medium text-blue-gray-600"
                                      >
                                        $ {importe}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="text-xs font-medium text-blue-gray-600"
                                      >
                                        {notas}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="mx-2 flex text-xs font-medium text-blue-gray-600"
                                      >
                                        <Button
                                          className="items-center gap-4 px-6 capitalize"
                                          fullWidth
                                          onClick={(e) =>
                                            handleModificarAdicional(
                                              _id,
                                              detalle,
                                              importe,
                                              notas
                                            )
                                          }
                                        >
                                          <Typography
                                            color="inherit"
                                            className="mr-5 font-medium capitalize"
                                          >
                                            editar
                                          </Typography>
                                        </Button>
                                      </Typography>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody> */}
                </table>
              </CardBody>
            </>
          ) : (
            ""
          )}
          {modalNuevaClaseSede ? <ModalNuevaClaseSede /> : ""}
          <Cargando />
        </CardBody>
      </Card>
    </>
  );
}

export default ProfileSede;