import axios from "axios";

const API = "/api";

export async function fetchGraph(query = "") {
  const response = await axios.get(`${API}/graph`, {
        params: { query }
    });
  return response.data;
}