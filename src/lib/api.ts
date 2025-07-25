import axios from 'axios';
import { logger } from './logger';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.apiError('API Error', error, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
    });
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout: A requisição demorou muito para responder');
    }
    
    if (!error.response) {
      throw new Error('Erro de rede: Verifique sua conexão com a internet');
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data?.message || 'Dados inválidos enviados');
      case 401:
        throw new Error('Não autorizado: Faça login novamente');
      case 403:
        throw new Error('Acesso negado: Você não tem permissão');
      case 404:
        throw new Error('Recurso não encontrado');
      case 422:
        throw new Error(data?.message || 'Dados de entrada inválidos');
      case 429:
        throw new Error('Muitas requisições: Tente novamente em alguns instantes');
      case 500:
        throw new Error('Erro interno do servidor: Tente novamente mais tarde');
      case 503:
        throw new Error('Serviço indisponível: Tente novamente mais tarde');
      default:
        throw new Error(data?.message || 'Erro inesperado no servidor');
    }
  }
);

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
