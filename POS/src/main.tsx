import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import { ToastProvider } from "./contexts/TostContext.tsx";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ToastProvider>
    <App />
     </ToastProvider>
  </HashRouter>
);
