// src/App.tsx
import React from "react";
import AppRouter from "./router/routes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
      <ToastContainer />
    </div>
  );
};

export default App;