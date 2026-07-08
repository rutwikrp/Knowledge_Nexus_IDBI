import axios from "axios";

const API = "http://localhost:8000";

export async function getDashboardStats() {
    const response = await axios.get(`${API}/dashboard`);
    return response.data;
}