import React from "react";
import ReactDOM from "react-dom/client";

import "@rainbow-me/rainbowkit/styles.css";
import SeiChain from "./sei-chain";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <Demo /> */}
    <SeiChain />
  </React.StrictMode>
);
