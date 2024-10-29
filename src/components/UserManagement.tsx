import React, { useState } from "react";
import "../UserManagement.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "borrower" | "hostFamily" | "admin";
  status: "pending" | "approved";
}

const initialUsers: User[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Doe",
    email: "alice@example.com",
    role: "hostFamily",
    status: "pending",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@example.com",
    role: "borrower",
    status: "approved",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie@example.com",
    role: "hostFamily",
    status: "approved",
  },
  {
    id: 4,
    firstName: "Diana",
    lastName: "Prince",
    email: "diana@example.com",
    role: "admin",
    status: "approved",
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const approveUser = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "approved" } : user
      )
    );
  };

  return (
    <div className="user-management-container">
      <h2>Gestion des Utilisateurs</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>
                {user.role === "hostFamily" ? "Famille d'accueil" : user.role}
              </td>
              <td>{user.status === "pending" ? "En attente" : "Approuvé"}</td>
              <td>
                {user.role === "hostFamily" && user.status === "pending" && (
                  <button
                    onClick={() => approveUser(user.id)}
                    className="approve-button"
                  >
                    Valider
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
