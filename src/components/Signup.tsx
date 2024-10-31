import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/Signup.css";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("borrower");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      role: category, // Utilisation de `role` ici pour correspondre avec le backend
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        newUser
      );
      setConfirmationMessage(
        category === "host"
          ? "Votre demande d'inscription en tant que famille d'accueil est en attente de validation."
          : "Inscription réussie en tant qu'emprunteur !"
      );
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setConfirmationMessage(
        "Erreur lors de l'inscription. Veuillez réessayer."
      );
    }

    setTimeout(() => setConfirmationMessage(""), 5000);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setCategory("borrower");
  };

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          >
            <option value="borrower">Emprunteur</option>
            <option value="host">Famille d'accueil</option>
          </select>
        </div>
        {confirmationMessage && (
          <p className="confirmation-message">{confirmationMessage}</p>
        )}
        <button type="submit" className="signup-button">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Signup;
