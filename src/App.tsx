import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import "./assets/styles/App.css";
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserManagement from "./components/UserManagement";
import { make as RescriptApp } from "./App.bs"; // Nouveau composant en ReScript
import { make as UserForm } from "./components/rescript/UserForm.bs"; // Composant UserForm en ReScript
import ItemDetail from "./components/ItemDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
      <div className="animated-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
        <header className="App-header">
          <h1>Bienvenue sur Guemiloute</h1>
          <nav>
            <Link to="/login">Connexion</Link> |
            <Link to="/signup">Inscription</Link> |
            <Link to="/items">Liste des objets disponibles</Link> |
            <Link to="/create-item">Créer un objet</Link> |
            <Link to="/user-management">Gestion des utilisateurs</Link> |
            <Link to="/rescript-app">App ReScript</Link> |
            <Link to="/user-form">Formulaire Utilisateur ReScript</Link>
          </nav>
        </header>
        <Routes>
          {/* Redirige vers la page de connexion par défaut */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Pages principales */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/create-item" element={<CreateItem />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/item/:title" element={<ItemDetail />} />

          {/* Pages ReScript */}
          <Route path="/rescript-app" element={<RescriptApp />} />
          <Route path="/user-form" element={<UserForm />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
