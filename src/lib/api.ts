import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Erro de timeout
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout: A requisição demorou muito para responder');
    }
    
    // Erro de rede (sem resposta do servidor)
    if (!error.response) {
      throw new Error('Erro de rede: Verifique sua conexão com a internet');
    }
    
    // Tratamento baseado no status code
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

// Interceptor para requisições (pode ser usado para adicionar auth tokens no futuro)
api.interceptors.request.use(
  (config) => {
    // Aqui podemos adicionar headers de autenticação quando necessário
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
