// HomePage.res
// Importer le fichier CSS associé
  %raw("require('../../assets/styles/HomePage.css')")
@react.component
let make = () => {
  // Ouvrir le module React
  open React

  

  // Rendu du composant
  <div className="home-container">
    <h1> { React.string("Bienvenue sur Guemiloute") } </h1>

    <p className="intro">
      {
        React.string(
          "Guemiloute est une plateforme de prêt et d'emprunt d'objets entre \
           familles d'accueil et emprunteurs. Rejoignez notre communauté pour \
           partager et trouver des objets tout en facilitant l'entraide."
        )
      }
    </p>

    <div className="rules-section">
      <h2> { React.string("Règles de fonctionnement") } </h2>
      <ul>
        <li>
          { React.string("Les familles d'accueil peuvent prêter des objets à des emprunteurs.") }
        </li>
        <li>
          { React.string("Les emprunteurs peuvent emprunter des objets disponibles sans validation.") }
        </li>
        <li>
          {
            React.string(
              "Les demandes d'inscription en tant que famille d'accueil nécessitent \
               une validation de la part d'un administrateur."
            )
          }
        </li>
        <li>
          {
            React.string(
              "Les utilisateurs doivent respecter les objets prêtés et les \
               retourner en bon état."
            )
          }
        </li>
      </ul>
    </div>

    <div className="features-section">
      <h2> { React.string("Fonctionnalités de la plateforme") } </h2>
      <p> { React.string("Notre plateforme permet :") } </p>
      <ul>
        <li> { React.string("Inscription et connexion sécurisées.") } </li>
        <li>
          {
            React.string(
              "Gestion de profil avec rôles distincts pour les emprunteurs, \
               familles d'accueil, et administrateurs."
            )
          }
        </li>
        <li> { React.string("Visualisation des objets disponibles et demandes de prêt.") } </li>
        <li>
          {
            React.string(
              "Validation des demandes des familles d'accueil par les administrateurs."
            )
          }
        </li>
      </ul>
    </div>
  </div>
}
