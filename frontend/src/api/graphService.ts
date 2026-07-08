import axios from "axios";

const API = "http://localhost:8000";

export async function fetchGraph(query = "") {
  const response = await axios.get(`${API}/graph`, {
        params: { query }
    });
  return response.data;
}