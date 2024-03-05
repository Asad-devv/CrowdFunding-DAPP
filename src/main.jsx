import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";


import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";
import toast from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  (! window.ethereum) ? 
  
  alert("Please Install Meta Mask")
  :
  <ThirdwebProvider>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);



