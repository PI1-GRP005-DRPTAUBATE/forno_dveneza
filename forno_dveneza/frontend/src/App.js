import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./paginas/home/Home";
import Cardapio from "./paginas/cardapio/Cardapio";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Cardapio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
