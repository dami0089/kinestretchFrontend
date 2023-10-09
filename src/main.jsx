import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { AuthProvider } from "./context/AuthProvider";
import { ClientesProvider } from "./context/ClientesProvider";

import { SalasProvider } from "./context/SalasProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <AuthProvider>
            <ClientesProvider>
              <SalasProvider>
                <App />
              </SalasProvider>
            </ClientesProvider>
          </AuthProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
);
