import React from "react";
import Header from "./Components/Header.jsx";
import "./css/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { GlobalStorage } from "./GlobalContext.jsx";
import Gamedetails from "./Pages/Gamedetails.jsx";

const App = () => {
  return (
    <GlobalStorage>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogo/:id" element={<Gamedetails />} />
          <Route path="login/*" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalStorage>
  );
};

export default App;
