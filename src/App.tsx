import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Bienvenue sur Guemiloute</h1>
          <nav>
            <Link to="/">Accueil</Link> |<Link to="/login">Connexion</Link> |
            <Link to="/create-item">Créer un objet</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-item" element={<CreateItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
