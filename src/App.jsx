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

//TODO:FALTA AGREGAR EL BAR AL MENU
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route path="registrar" element={<SignUp />} /> */}
      <Route path="crear-password/:token" element={<PrimerPassword />} />
      <Route path="olvide-password" element={<OlvidePassword />} />
      <Route path="olvide-password/:token" element={<NuevoPassword />} />
      {/* <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}

      {/* Inicio Rouotes */}
      <Route path="/inicio" element={<RutaProtegida />}>
        <Route index element={<Home />} />
      </Route>
      {/* Clientes Routes */}
      <Route path="/clientes" element={<RutaProtegida />}>
        <Route index element={<Clientes />} />
        <Route path="activos" element={<ListadodeClientes />} />
      </Route>
      {/* Profesores Routes */}
      <Route path="/profesores" element={<RutaProtegida />}>
        <Route index element={<Profesores />} />
        <Route path="activos" element={<ListadoProfesoresActivos />} />
      </Route>
      {/* Sedes Routes */}
      <Route path="/sedes" element={<RutaProtegida />}>
        <Route index element={<Sedes />} />
        <Route path="activas" element={<ListadoDeSedes />} />
      </Route>
      {/* Clases Routes */}
      <Route path="/clases" element={<RutaProtegida />}>
        <Route index element={<Clases />} />
      </Route>
    </Routes>
  );
}

export default App;
