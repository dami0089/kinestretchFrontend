import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import routes from "@/routes";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import DashboardNavbarClientes from "@/widgets/layout/navBarClientes";
import DashboardNavbarProfesores from "@/widgets/layout/navBarProfesores";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  if (cargando) return "Cargando...";

  return (
    <>
      {(auth._id && auth.rol === "admin") || auth.rol === "secretaria" ? (
        <div className="flex min-h-screen flex-col bg-blue-gray-50/50">
          <Sidenav
            routes={routes}
            brandImg={
              sidenavType === "dark"
                ? "/img/logo-en-blanco.png"
                : "/img/logo-en-blanco.png"
            }
          />
          <div className="flex flex-1 flex-col p-4 xl:ml-80">
            <DashboardNavbar />
            {/* <Configurator /> */}
            {/* <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton> */}
            <div className="flex-1">
              <Outlet />
            </div>
            <div className="mt-auto text-blue-gray-600">
              <Footer />
            </div>
          </div>
        </div>
      ) : auth._id && auth.rol === "cliente" ? (
        <div className="flex min-h-screen flex-col bg-blue-gray-50/50">
          <DashboardNavbarClientes />
          {/* <Configurator /> */}
          {/* <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton> */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      ) : auth._id && auth.rol === "profesor" ? (
        <div className="flex min-h-screen flex-col bg-blue-gray-50/50">
          <DashboardNavbarProfesores />
          {/* <Configurator /> */}
          {/* <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton> */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
