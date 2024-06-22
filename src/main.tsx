import React from "react";
import ReactDOM from "react-dom/client";
import { OverlaysProvider, HotkeysProvider } from "@blueprintjs/core";
import App from "./App.tsx";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OverlaysProvider>
      <HotkeysProvider>
        <App />
      </HotkeysProvider>
    </OverlaysProvider>
  </React.StrictMode>
);
