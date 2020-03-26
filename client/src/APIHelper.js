import axios from "axios";

const API_URL = "/api/groceries";

async function createGrocery(item) {
  const { data: newGrocery } = await axios.post(API_URL, {item});
  return newGrocery
};

async function deleteGrocery(id) {
  const message = await axios.delete(`${API_URL}/${id}`);
  return message
};

async function updateGrocery(id, payload) {
  const { data: newGrocery } = await axios.put(`${API_URL}/${id}`, payload);
  return newGrocery
};

async function getAllGroceries() {
  const { data: groceries } = await axios.get(API_URL);
  return groceries
};