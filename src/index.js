import React from "react";
import ReactDOM from "react-dom/client";
import "@layouts/style.scss";
import App from "@app/App";
import reportWebVitals from "@app/reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
