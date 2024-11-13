import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/ItemList.css";

interface Item {
  id: number;
  title: string;
  image_url: string;
  status: "available" | "lent";
  quantity: number;
  category: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "available" | "lent"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="item-list-container">
      <h2>Catalogue des Objets</h2>

      <input
        type="text"
        placeholder="Rechercher un objet..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="filters">
        <label>Filtrer par statut :</label>
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as "all" | "available" | "lent")
          }
        >
          <option value="all">Tous</option>
          <option value="available">Disponible</option>
          <option value="lent">Prêté</option>
        </select>

        <label>Filtrer par catégorie :</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Toutes</option>
          {[...new Set(items.map((item) => item.category))].map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid-container">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-card">
            <Link
              to={`/item/${encodeURIComponent(item.title)}`}
              state={{
                title: item.title,
                url: item.image_url,
                quantity: item.quantity,
                category: item.category,
                addedDate: "2024-10-20",
              }}
            >
              <img
                src={item.image_url}
                alt={item.title}
                onError={(e) => (e.currentTarget.src = "/img/placeholder.jpg")}
                className="item-image2"
              />
              <div className="item-info">
                <h4>{item.title}</h4>
                <p>Catégorie : {item.category}</p>
                <p>Quantité disponible : {item.quantity}</p>
                <span className={`status ${item.status}`}>
                  {item.status === "available" ? "Disponible" : "Prêté"}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
