import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../ItemDetail.css";
import { toast } from "react-toastify";


const ItemDetail: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [quantityToBorrow, setQuantityToBorrow] = useState(1);

  const item = {
    title: decodeURIComponent(title || ""),
    description: "Une description détaillée de l'objet.",
    url: "https://via.placeholder.com/150",
    quantity: 5,
  };

  const handleBorrowRequest = () => {
    toast.success(`Vous avez demandé ${quantityToBorrow} de ${item.title}`);
  };


  return (
    <div className="item-detail-container">
      <h2>{item.title}</h2>
      <img src={item.url} alt={item.title} className="item-image"/>
      <p className="item-info">{item.description}</p>
      <p className="item-info">Quantité disponible : {item.quantity}</p>
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
      <button className="borrow-button" onClick={handleBorrowRequest}>Demander un emprunt</button>
    </div>
  );
};

export default ItemDetail;
