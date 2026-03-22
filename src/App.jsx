import React from "react";
import Header from "./Components/Header.jsx";
import "./css/app.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { GlobalStorage } from "./GlobalContext.jsx";
import Gamedetails from "./Pages/Gamedetails.jsx";
import Mygames from "./Pages/Mygames.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import { HashRouter } from "react-router-dom";
const App = () => {
  return (
    <GlobalStorage>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogo/:id" element={<Gamedetails />} />
          <Route path="login/*" element={<Login />} />
          <Route
            path="meus-jogos"
            element={
              <ProtectedRoute>
                <Mygames />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </GlobalStorage>
  );
};

export default App;
