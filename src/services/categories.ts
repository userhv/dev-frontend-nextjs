import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products/categories';

export class CategoriesService {
  static async getCategories(): Promise<string[]> {
    const { data } = await axios.get(API_URL);
    return data;
  }
}

export const getCategories = CategoriesService.getCategories;
