import axios from "axios";

const API = "/api";

export async function getDashboardStats() {
    const response = await axios.get(`${API}/dashboard`);
    return response.data;
}