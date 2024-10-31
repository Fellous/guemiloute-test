import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/UserManagement.css";

interface User {
  id: number;
  username: string;
  password: string; // pour illustration, mais il serait préférable de ne pas afficher le mot de passe
  role: "borrower" | "host" | "admin";
  created_at: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users from API:", error);
      });
  }, []);

  return (
    <div className="user-management-container">
      <h2>Gestion des Utilisateurs</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Rôle</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role === "host" ? "Famille d'accueil" : user.role}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
