import { StrictMode } from "react";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
