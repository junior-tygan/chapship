// src/App.tsx
import React from "react";
import AppRouter from "./router/routes";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;