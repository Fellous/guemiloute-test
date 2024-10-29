import React from "react";
import "../assets/styles/HomePage.css";
const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue sur Guemiloute</h1>
      <p className="intro">
        Guemiloute est une plateforme de prêt et d'emprunt d'objets entre
        familles d'accueil et emprunteurs. Rejoignez notre communauté pour
        partager et trouver des objets tout en facilitant l'entraide.
      </p>

      <div className="rules-section">
        <h2>Règles de fonctionnement</h2>
        <ul>
          <li>
            Les familles d'accueil peuvent prêter des objets à des emprunteurs.
          </li>
          <li>
            Les emprunteurs peuvent emprunter des objets disponibles sans
            validation.
          </li>
          <li>
            Les demandes d'inscription en tant que famille d'accueil nécessitent
            une validation de la part d'un administrateur.
          </li>
          <li>
            Les utilisateurs doivent respecter les objets prêtés et les
            retourner en bon état.
          </li>
        </ul>
      </div>

      <div className="features-section">
        <h2>Fonctionnalités de la plateforme</h2>
        <p>Notre plateforme permet :</p>
        <ul>
          <li>Inscription et connexion sécurisées.</li>
          <li>
            Gestion de profil avec rôles distincts pour les emprunteurs,
            familles d'accueil, et administrateurs.
          </li>
          <li>Visualisation des objets disponibles et demandes de prêt.</li>
          <li>
            Validation des demandes des familles d'accueil par les
            administrateurs.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
