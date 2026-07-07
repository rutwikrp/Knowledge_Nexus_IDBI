import axios from "axios";

const API = "http://localhost:8000";

export async function fetchGraph() {
  const response = await axios.get(`${API}/graph`);
  return response.data;
}