import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <Router hook={useHashLocation}>
    <App />
  </Router>,
);
