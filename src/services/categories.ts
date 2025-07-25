import api from '@/lib/api';

const API_CATEGORIES_PATH = '/products/categories';

export class CategoriesService {
  static async getCategories(): Promise<string[]> {
    const { data } = await api.get(API_CATEGORIES_PATH);
    return data;
  }
}

export const getCategories = CategoriesService.getCategories;
