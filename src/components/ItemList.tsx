import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  title: string;
  url: string;
  status: "available" | "lent";
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Récupérer les données de l'API JSONPlaceholder
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_limit=10"
        );
        const data = await response.json();

        // Transformer les données pour ajouter un statut aléatoire
        const formattedData = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          status: Math.random() > 0.5 ? "available" : "lent",
        }));

        setItems(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchItems();
  }, []);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://via.placeholder.com/150";
  };

  return (
    <div>
      <h2>Liste des Objets</h2>
      <div className="grid-container">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img
              src={item.url}
              alt={item.title}
              onError={handleImageError}
              className="item-image"
            />
            <div className="item-info">
              <h4>{item.title}</h4>
              <span className={`status ${item.status}`}>
                {item.status === "available" ? "Disponible" : "Prêté"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
