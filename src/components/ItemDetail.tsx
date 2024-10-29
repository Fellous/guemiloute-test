import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../assets/styles/ItemDetail.css";
import { toast } from "react-toastify";

const ItemDetail: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const location = useLocation();
  const [quantityToBorrow, setQuantityToBorrow] = useState(1);

  const item = location.state as {
    title: string;
    url: string;
    quantity: number;
    category: string;
    addedDate: string;
  };

  const handleBorrowRequest = () => {
    if (quantityToBorrow > item.quantity) {
      toast.error("Quantité demandée non disponible.");
    } else {
      toast.success(`Vous avez demandé ${quantityToBorrow} de ${item.title}`);
    }
  };

  return (
    <div className="item-detail-container">
      <h2>{item.title}</h2>
      <img src={item.url} alt={item.title} className="item-image" />
      <p className="item-info">Catégorie : {item.category}</p>
      <p className="item-info">
        Description : Une description détaillée de l'objet.
      </p>
      <p className="item-info">Quantité disponible : {item.quantity}</p>
      <p className="item-info">Date d'ajout : {item.addedDate}</p>
      <label className="quantity-section">
        Quantité à emprunter:
        <input
          type="number"
          min="1"
          max={item.quantity}
          value={quantityToBorrow}
          onChange={(e) => setQuantityToBorrow(Number(e.target.value))}
        />
      </label>
      <button className="borrow-button" onClick={handleBorrowRequest}>
        Demander un emprunt
      </button>
    </div>
  );
};

export default ItemDetail;
