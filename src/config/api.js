// Configuração da API
export const API_BASE_URL = 'http://10.1.4.224:8000';

export const API_ENDPOINTS = {
  HEALTH: '/health',
  CHALLENGE: '/voice/challenge',
  ENROLL: '/voice/enroll',
  VERIFY: '/voice/verify',
};

// Timeout padrão para requisições (30 segundos)
export const API_TIMEOUT = 30000;
