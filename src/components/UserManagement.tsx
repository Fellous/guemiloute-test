import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "../assets/styles/UserManagement.css";

interface User {
  id: number;
  username: string;
  password: string;
  role: "borrower" | "host" | "admin";
  created_at: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [newUserRow, setNewUserRow] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Erreur lors du chargement des utilisateurs");
      });
  };

  const handleEditUserChange = (id: number, field: keyof User, value: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, [field]: value } : user)));
  };

  const saveUser = (user: User) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, user)
      .then(() => {
        fetchUsers();
        setEditingUserId(null);
        toast.success("Utilisateur modifié avec succès !");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Erreur lors de la modification de l'utilisateur");
      });
  };

  const addUserRow = () => {
    setNewUserRow({
      id: Date.now(),
      username: "",
      password: "",
      role: "borrower",
      created_at: new Date().toISOString(),
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  const handleNewUserChange = (field: keyof User, value: string) => {
    if (newUserRow) {
      setNewUserRow({ ...newUserRow, [field]: value });
    }
  };

  const saveNewUser = () => {
    if (newUserRow) {
      const { username, firstName, lastName, email, role } = newUserRow;
      if (!username || !firstName || !lastName || !email || !role) {
        toast.error("Veuillez remplir tous les champs requis.");
        return;
      }  
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/register`, newUserRow)
        .then(() => {
          fetchUsers();
          setNewUserRow(null);
          toast.success("Nouvel utilisateur ajouté !");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          toast.error("Erreur lors de l'ajout de l'utilisateur");
        });
    }
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/users/${userToDelete.id}`)
        .then(() => {
          fetchUsers();
          closeDeleteModal();
          toast.success("Utilisateur supprimé avec succès !");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Erreur lors de la suppression de l'utilisateur");
        });
    }
  };

  return (
    <div className="user-management-container">
      <h2>Gestion des Utilisateurs</h2>
      <button onClick={addUserRow} className="add-user-button">
        Ajouter un utilisateur
      </button>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newUserRow && (
            <tr>
              {["username", "firstName", "lastName", "email"].map((field) => (
                <td key={field}>
                  <input
                  className="editable-input"
                    type="text"
                    value={(newUserRow as any)[field]}
                    onChange={(e) => handleNewUserChange(field as keyof User, e.target.value)}
                  />
                </td>
              ))}
              <td>
                <select
                  value={newUserRow.role}
                  onChange={(e) => handleNewUserChange("role", e.target.value)}
                >
                  <option value="borrower">Emprunteur</option>
                  <option value="host">Famille d'accueil</option>
                  <option value="admin">Administrateur</option>
                </select>
              </td>
              <td>
                <button onClick={saveNewUser} className="save-button">
                  Enregistrer
                </button>
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              {["username", "firstName", "lastName", "email"].map((field) => (
                <td key={field}>
                  {editingUserId === user.id ? (
                    <input
                    className="editable-input"
                      type="text"
                      value={(user as any)[field]}
                      onChange={(e) => handleEditUserChange(user.id, field as keyof User, e.target.value)}
                    />
                  ) : (
                    (user as any)[field]
                  )}
                </td>
              ))}
              <td>
                {editingUserId === user.id ? (
                  <select
                    value={user.role}
                    onChange={(e) => handleEditUserChange(user.id, "role", e.target.value)}
                  >
                    <option value="borrower">Emprunteur</option>
                    <option value="host">Famille d'accueil</option>
                    <option value="admin">Administrateur</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="action-buttons">
                {editingUserId === user.id ? (
                  <button onClick={() => saveUser(user)} className="save-button">
                    Sauvegarder
                  </button>
                ) : (
                  <button onClick={() => setEditingUserId(user.id)} className="edit-button">
                    Modifier
                  </button>
                )}
                <button onClick={() => openDeleteModal(user)} className="delete-button">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirmation de suppression"
        className="delete-modal"
        overlayClassName="delete-modal-overlay"
      >
        <h3>Êtes-vous sûr de vouloir supprimer {userToDelete?.username} ?</h3>
        <div className="modal-buttons">
          <button onClick={confirmDelete} className="confirm-button">
            Oui, supprimer
          </button>
          <button onClick={closeDeleteModal} className="cancel-button">
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
