import api from "./api";
axios.get(`${process.env.REACT_APP_API_URL}/users`);

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
