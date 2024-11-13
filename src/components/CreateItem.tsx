import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/CreateItem.css";

const CreateItem: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("available");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("category", category);
    formData.append("quantity", quantity.toString());
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/items`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Item créé :", response.data);
    } catch (error) {
      console.error("Erreur lors de la création de l'item :", error);
    }
  };

  return (
    <div className="create-item-container">
      <h2>Créer un Nouvel Item</h2>
      <form onSubmit={handleSubmit} className="create-item-form">
        <div className="form-group">
          <label>Titre :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Statut :</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="available">Disponible</option>
            <option value="lent">Prêté</option>
          </select>
        </div>
        <div className="form-group">
          <label>Catégorie :</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Quantité :</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Image :</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <button type="submit" className="submit-button">
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
