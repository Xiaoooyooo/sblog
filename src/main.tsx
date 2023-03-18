import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "@/assets/style/variables.scss";
import "@/assets/style/main.scss";
// import "@/assets/style/md.scss";
import "@/utils/mathjax";
import "@/webComponents";
import App from "@/App";

createRoot(document.getElementById("app") as Element).render(
  <StrictMode>
    <App />
  </StrictMode>
);
