import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  QrCodeIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export function DashboardNavbarProfesores() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cerrarSesionAuth, auth, handleCargando, setUsuarioAutenticado } =
    useAuth();

  const handleclose = () => {
    cerrarSesionAuth();
    setUsuarioAutenticado("");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleContable = (e) => {
    e.preventDefault();
    handleCargando();
    navigate("/contable/contable-profe");
    handleCargando();
  };

  return (
    <>
      <Navbar
        color={"transparent"}
        className={`fixed left-0 top-0 z-50 w-full py-3 transition-all`}
        fullWidth
        blurred={fixedNavbar}
      >
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div></div>
          {/* Secciones del medio */}
          <div className="hidden justify-center space-x-4 md:flex md:space-x-6">
            <Link to="/inicio" className="text-white hover:text-gray-300">
              Inicio
            </Link>
            <Link to="/seccion2" className="text-white hover:text-gray-300">
              Mi perfil
            </Link>
            <Link
              onClick={(e) => handleContable(e)}
              className="text-white hover:text-gray-300"
            >
              Contable
            </Link>
          </div>

          {/* Botón Hamburguesa y Botón de Salir */}
          <div className="flex items-center text-center">
            {/* Botón Hamburguesa */}
            <IconButton
              variant="text"
              color="blue-gray"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <Bars3Icon className="h-5 w-5 text-white" />
              ) : (
                <Bars3Icon className="h-5 w-5 text-white" />
              )}
            </IconButton>

            {/* Botón de Salir */}
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <ArrowLeftOnRectangleIcon
                    className="h-5 w-5 text-white"
                    onClick={handleclose}
                  />
                </IconButton>
              </MenuHandler>
            </Menu>
          </div>
        </div>

        {/* Menú desplegable para móviles */}
        {isMenuOpen && (
          <div className="mt-2 flex flex-col items-start space-y-2 md:hidden">
            <Link to="/inicio" className="text-white hover:text-gray-300">
              Inicio
            </Link>
            <Link to="/seccion2" className="text-white hover:text-gray-300">
              Mi perfil
            </Link>
            <Link
              onClick={(e) => handleContable(e)}
              className="text-white hover:text-gray-300"
            >
              Contable
            </Link>
          </div>
        )}
      </Navbar>
    </>
  );
}

DashboardNavbarProfesores.displayName =
  "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbarProfesores;
