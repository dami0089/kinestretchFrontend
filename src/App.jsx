import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "./pages/auth";
import PrimerPassword from "./pages/auth/PrimerPassword";
import OlvidePassword from "./pages/auth/OlvidePassword";
import NuevoPassword from "./pages/auth/NuevoPassword";
import RutaProtegida from "./layouts/RutaProtegida";
import { Home } from "./pages/inicio";
import { Clientes } from "./pages/inicio/clientes";
import ListadodeClientes from "./components/clientes/ListadodeClientes";
import Profesores from "./pages/inicio/profesores";
import Sedes from "./pages/inicio/sedes";
import Clases from "./pages/inicio/clases";
import ListadoProfesoresActivos from "./components/profesores/ListadoProfesoresActivos";
import ListadoDeSedes from "./components/sedes/ListadoDeSedes";
import ProfileCliente from "./components/clientes/ProfileCliente";
import ProfileSede from "./components/sedes/ProfileSede";
import useAuth from "./hooks/useAuth";
import PaginaClientes from "./pages/inicio/PaginaClientes";
import PaginaProfesores from "./pages/inicio/PaginaProfesores";
import ListadoClientesInactivos from "./components/clientes/ListadoClientesInactivos";
import ContableProfesores from "./components/paginaProfesores/ContableProfesores";
import PerfilCliente from "./components/paginaClientes/PerfilCliente";
import PagosCliente from "./components/paginaClientes/PagosCliente";
import PerfilProfesor from "./components/profesores/PerfilProfesor";
import ListadoProfesoresInactivos from "./components/profesores/ListadoProfesoresInactivos";
import ListadoSecretarias from "./components/sedes/ListadoSecretarias";
import ClasesSedesPublica from "./components/clases/ClasesSedesPublica";
import ListadoDeClases from "./components/clases/ListadoDeClases";
import PerfilProfesorPagina from "./components/paginaProfesores/PerfilProfesor";
import ClasesProfe from "./pages/inicio/clasesProfesor";
import Encuesta from "./components/clientes/Encuesta";
import ListadoDeFeriados from "./components/clases/ListadoDeFeriados";
import Terminos from "./pages/inicio/terminos";
import Configuracion from "./pages/inicio/configuracion";
import ListadoDeUsuariosApp from "./components/configuracion/ListadoDeUsuariosApp";
import ProfileSedeSecretariaSocio from "./components/secretariasSocios/ProfileSedeSecretariaSocio";

function App() {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route path="registrar" element={<SignUp />} /> */}
      <Route path="crear-password/:token" element={<PrimerPassword />} />
      <Route path="olvide-password" element={<OlvidePassword />} />
      <Route path="olvide-password/:token" element={<NuevoPassword />} />
      <Route path="/disponibilidad-sede/:id" element={<ClasesSedesPublica />} />
      <Route path="/encuesta/:id/:kind" element={<Encuesta />} />

      {/* Inicio Rouotes */}
      {auth.rol === "admin" ? (
        <>
          <Route path="/inicio" element={<RutaProtegida />}>
            <Route index element={<Home />} />
          </Route>
          {/* Clientes Routes */}
          <Route path="/clientes" element={<RutaProtegida />}>
            <Route index element={<Clientes />} />
            <Route path="activos" element={<ListadodeClientes />} />
            <Route path="inactivos" element={<ListadoClientesInactivos />} />
            <Route path="perfil" element={<ProfileCliente />} />
          </Route>
          {/* Profesores Routes */}
          <Route path="/profesores" element={<RutaProtegida />}>
            <Route index element={<Profesores />} />
            <Route path="activos" element={<ListadoProfesoresActivos />} />
            <Route path="perfil-profesor" element={<PerfilProfesor />} />
            <Route path="inactivos" element={<ListadoProfesoresInactivos />} />
          </Route>
          {/* Sedes Routes */}
          <Route path="/sedes" element={<RutaProtegida />}>
            <Route index element={<Sedes />} />
            <Route path="activas" element={<ListadoDeSedes />} />
            <Route path="profile-sede" element={<ProfileSede />} />
            <Route
              path="listado-secretarias"
              element={<ListadoSecretarias />}
            />
          </Route>
          {/* Clases Routes */}
          <Route path="/clases" element={<RutaProtegida />}>
            <Route index element={<Clases />} />
            <Route path="listado-clases" element={<ListadoDeClases />} />
            <Route path="listado-feriados" element={<ListadoDeFeriados />} />
            <Route path="listado-alumnos-clase/:id" element={<ClasesProfe />} />
          </Route>

          {/* Configuracion Routes */}
          <Route path="/configuracion" element={<RutaProtegida />}>
            <Route index element={<Configuracion />} />
            <Route path="terminos-condiciones" element={<Terminos />} />
            <Route
              path="listado-usuarios-app"
              element={<ListadoDeUsuariosApp />}
            />
          </Route>
        </>
      ) : auth.rol === "cliente" ? (
        <>
          {/* Usuario Cliente Routes */}
          <Route path="/inicio" element={<RutaProtegida />}>
            <Route index element={<PaginaClientes />} />
          </Route>
          <Route path="/perfil" element={<RutaProtegida />}>
            <Route index element={<PerfilCliente />} />
          </Route>
          <Route path="/pagos" element={<RutaProtegida />}>
            <Route index element={<PagosCliente />} />
          </Route>
        </>
      ) : auth.rol === "profesor" ? (
        <>
          {/* Usuario Profesores Routes */}
          <Route path="/inicio" element={<RutaProtegida />}>
            <Route index element={<PaginaProfesores />} />
          </Route>
          <Route path="/contable" element={<RutaProtegida />}>
            <Route path="contable-profe" element={<ContableProfesores />} />
          </Route>
          <Route path="/perfil" element={<RutaProtegida />}>
            <Route path="perfil-profe" element={<PerfilProfesorPagina />} />
          </Route>
          <Route path="/clase/:id" element={<RutaProtegida />}>
            <Route index element={<ClasesProfe />} />
          </Route>
        </>
      ) : auth.rol === "secretaria" || auth.rol === "socio" ? (
        <>
          <Route path="/inicio" element={<RutaProtegida />}>
            <Route index element={<ProfileSedeSecretariaSocio />} />
          </Route>
        </>
      ) : (
        ""
      )}
    </Routes>
  );
}

export default App;
