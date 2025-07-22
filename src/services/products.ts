import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getProduct = async (id: string | number) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createProduct = async (product: any) => {
  const { data } = await axios.post(API_URL, product);
  return data;
};

export const updateProduct = async (id: string | number, product: any) => {
  const { data } = await axios.put(`${API_URL}/${id}`, product);
  return data;
};

export const deleteProduct = async (id: string | number) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
