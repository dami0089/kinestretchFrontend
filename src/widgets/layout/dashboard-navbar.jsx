import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useEffect } from "react";
import logo from "/img/Logo-en-Blanco.png";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const {
    cerrarSesionAuth,
    auth,
    handleModalQr,
    autenticado,
    setAutenticado,
    consultarAutenticacion,
    setUsuarioAutenticado,
    handleCargando,
  } = useAuth();

  const navigate = useNavigate();

  const handleclose = (e) => {
    e.preventDefault();
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
        navigate("/");
        handleCargando();
      }
    });
  };

  const handleAbrirModal = () => {
    if (autenticado == "2") {
      handleModalQr();
    }
  };

  useEffect(() => {
    if (autenticado !== "1") {
      const consultarBase = async () => {
        await consultarAutenticacion();
      };
      consultarBase();
    }
  }, [autenticado]);

  return (
    <Navbar
      color={"white"}
      className={`"sticky shadow-blue-gray-500/5" 
         z-100 top-4 rounded-xl py-3 shadow-md transition-all
    `}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-center gap-6 md:flex-row md:items-center md:justify-between">
        <div className="items-center text-center capitalize">
          {auth.rol === "socio" || auth.rol === "secretaria" ? (
            <div className="mr-auto md:mr-4 md:w-56">
              <Avatar src={logo} className="h-25 w-20 text-center" />
            </div>
          ) : null}
        </div>
        <div className="flex items-center text-center">
          {/* <QrCodeIcon
            className={`h-8 w-8 text-black hover:cursor-pointer ${
              autenticado == "1"
                ? "text-green-300"
                : autenticado == "2"
                ? "text-red-300"
                : autenticado == "0"
                ? "text-gray-300"
                : ""
            }`}
            onClick={(e) => handleAbrirModal()}
          /> */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              {auth.nombre} {auth.apellido}
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>

          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <ArrowLeftOnRectangleIcon
                  className="h-5 w-5 text-blue-gray-500"
                  onClick={(e) => handleclose(e)}
                />
              </IconButton>
            </MenuHandler>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
