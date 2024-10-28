import React, { useState } from "react";

const CreateItem: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Logique pour créer un nouvel objet
    const newItem = {
      name: itemName,
      description: itemDescription,
    };

    console.log("Objet créé:", newItem);

    // Afficher un message de confirmation
    setConfirmationMessage("Objet créé avec succès !");

    // Réinitialiser le formulaire et masquer le message après quelques secondes
    setTimeout(() => setConfirmationMessage(""), 3000);
    setItemName("");
    setItemDescription("");
  };

  return (
    <div>
      <h2>Créer un nouvel objet à prêter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de l'objet</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description de l'objet</label>
          <input
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer l'objet</button>
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
};

export default CreateItem;
