import React, { useState } from "react";

const CreateItem: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      name: itemName,
      description: itemDescription,
    };

    console.log("Objet créé:", newItem);

    setConfirmationMessage("Objet créé avec succès !");

    setTimeout(() => setConfirmationMessage(""), 3000);
    setItemName("");
    setItemDescription("");
  };

  return (
    <div className="create-item-container">
      <h2>Créer un nouvel objet à prêter</h2>
      <form onSubmit={handleSubmit} className="create-item-form">
        <div className="form-group">
          <label>Nom de l'objet</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Description de l'objet</label>
          <textarea
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Créer l'objet
        </button>
      </form>
      {confirmationMessage && (
        <p className="confirmation-message">{confirmationMessage}</p>
      )}
    </div>
  );
};

export default CreateItem;
