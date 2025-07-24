
import axios from 'axios';
import { Product } from './types';

const API_URL = 'https://fakestoreapi.com/products';

export class ProductsService {
  static async getProducts(): Promise<Product[]> {
    const { data } = await axios.get(API_URL);
    return data;
  }

  static async getProduct(id: string | number): Promise<Product> {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  }

  static async createProduct(product: Product): Promise<Product> {
    const { data } = await axios.post(API_URL, product);
    return data;
  }

  static async updateProduct(id: string | number, product: Product): Promise<Product> {
    const { data } = await axios.put(`${API_URL}/${id}`, product);
    return data;
  }

  static async deleteProduct(id: string | number): Promise<Product> {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
  }
}

export const getProducts = ProductsService.getProducts;
export const getProduct = ProductsService.getProduct;
export const createProduct = ProductsService.createProduct;
export const updateProduct = ProductsService.updateProduct;
export const deleteProduct = ProductsService.deleteProduct;
