import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "./pages/auth";
import PrimerPassword from "./pages/auth/PrimerPassword";
import OlvidePassword from "./pages/auth/OlvidePassword";
import NuevoPassword from "./pages/auth/NuevoPassword";
import RutaProtegida from "./layouts/RutaProtegida";
import { Home } from "./pages/inicio";

import { Clientes } from "./pages/inicio/clientes";

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

      <Route path="/inicio" element={<RutaProtegida />}>
        <Route index element={<Home />} />

        <Route path="clientes" element={<Clientes />} />
      </Route>
    </Routes>
  );
}

export default App;
