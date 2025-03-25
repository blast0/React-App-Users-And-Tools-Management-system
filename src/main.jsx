import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="78363658756-7gchqmk12tflbb7i8akfo1d9feepi5lg.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
