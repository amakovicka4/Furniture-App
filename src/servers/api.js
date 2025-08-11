import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
});

export const getFurnitureItems = async () => {
  try {
    const response = await api.get('/furniture');
    return response.data;
  } catch (error) {
    console.error('Error fetching furniture:', error);
    throw error;
  }
};

export const getFurnitureItemById = async (id) => {
  try {
    const response = await api.get(`/furniture/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching furniture item:', error);
    throw error;
  }
};