import axios from "axios";

const apiClient = (baseURL) =>
  axios.create({
    baseURL,
    headers: {"Content-Type": "application/json"},
  });

export const getItems = async (apiUrl, filters) => {
  const response = await apiClient(apiUrl).get("/api/items", { params: filters });
  return response.data;
};

export const getItem = async (apiUrl, id) => {
  const response = await apiClient(apiUrl).get(`/api/items/${id}`);
  return response.data;
};

export const createItem = async (apiUrl, payload) => {
  const response = await apiClient(apiUrl).post("/api/items", payload);
  return response.data;
};

export const updateItem = async (apiUrl, id, payload) => {
  const response = await apiClient(apiUrl).patch(`/api/items/${id}`, payload);
  return response.data;
};

export const deleteItem = async (apiUrl, id) => {
  await apiClient(apiUrl).delete(`/api/items/${id}`);
};

export const toggleArchive = async (apiUrl, id) => {
  const response = await apiClient(apiUrl).patch(`/api/items/${id}/archive`);
  return response.data;
};

export const getStats = async (apiUrl) => {
  const response = await apiClient(apiUrl).get("/api/stats");
  return response.data;
};
