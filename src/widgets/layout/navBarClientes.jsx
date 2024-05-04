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
import Swal from "sweetalert2";

export function DashboardNavbarClientes() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {
    cerrarSesionAuth,
    auth,

    setUsuarioAutenticado,
    handleCargando,
  } = useAuth();

  const handleclose = () => {
    Swal.fire({
      title: "Cerrar Sesion?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        cerrarSesionAuth();
        setUsuarioAutenticado("");
        localStorage.removeItem("token");
        navigate("/");
        handleCargando();
      }
    });
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
            <Link to="/perfil" className="text-white hover:text-gray-300">
              Mi perfil
            </Link>
            {/* <Link to="/pagos" className="text-white hover:text-gray-300">
              Pagos
            </Link> */}
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
            <Link to="/perfil" className="text-white hover:text-gray-300">
              Mi perfil
            </Link>
            {/* <Link to="/pagos" className="text-white hover:text-gray-300">
              Pagos
            </Link> */}
          </div>
        )}
      </Navbar>
    </>
  );
}

DashboardNavbarClientes.displayName =
  "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbarClientes;
