import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, API_TIMEOUT } from '../config/api';

// Criar instância do axios com configurações padrão
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Testa a conexão com a API
 * @returns {Promise<Object>} Status da API
 */
export const checkHealth = async () => {
  try {
    console.log('🔍 Testando conexão com API...');
    const response = await apiClient.get(API_ENDPOINTS.HEALTH);
    console.log('✅ API Response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('❌ Erro ao conectar com API:', error.message);
    return {
      success: false,
      error: error.message || 'Erro ao conectar com a API',
    };
  }
};

/**
 * Obtém uma frase de desafio
 * @returns {Promise<Object>} Frase para o usuário pronunciar
 */
export const getChallengePhrase = async () => {
  try {
    console.log('🔍 Obtendo frase de desafio...');
    const response = await apiClient.get(API_ENDPOINTS.CHALLENGE);
    console.log('✅ Frase obtida:', response.data);
    return {
      success: true,
      phrase: response.data.phrase,
    };
  } catch (error) {
    console.error('❌ Erro ao obter frase:', error.message);
    return {
      success: false,
      error: error.message || 'Erro ao obter frase de desafio',
    };
  }
};

/**
 * Cadastra a voz do usuário (Enrollment)
 * @param {string} userId - ID único do usuário
 * @param {string} phraseExpected - Frase que o usuário pronunciou
 * @param {Object} audioFile - Arquivo de áudio {uri, type, name}
 * @returns {Promise<Object>} Resultado do cadastro
 */
export const enrollVoice = async (userId, phraseExpected, audioFile) => {
  try {
    console.log('📤 Enviando enrollment...');
    console.log('User ID:', userId);
    console.log('Phrase:', phraseExpected);
    console.log('Audio File:', audioFile);

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('phrase_expected', phraseExpected);
    formData.append('audio_file', {
      uri: audioFile.uri,
      type: audioFile.type || 'audio/wav',
      name: audioFile.name || 'recording.wav',
    });

    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.ENROLL}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: API_TIMEOUT,
      }
    );

    console.log('✅ Enrollment bem-sucedido:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('❌ Erro no enrollment:', error.response?.data || error.message);
    
    // Extrair mensagem de erro da resposta
    const errorMessage = error.response?.data?.error 
      || error.response?.data?.message 
      || error.message 
      || 'Erro ao cadastrar voz';

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Verifica a identidade do usuário por voz
 * @param {string} userId - ID do usuário a ser verificado
 * @param {string} phraseExpected - Frase que o usuário pronunciou
 * @param {Object} audioFile - Arquivo de áudio {uri, type, name}
 * @returns {Promise<Object>} Resultado da verificação
 */
export const verifyVoice = async (userId, phraseExpected, audioFile) => {
  try {
    console.log('📤 Enviando verificação...');
    console.log('User ID:', userId);
    console.log('Phrase:', phraseExpected);
    console.log('Audio File:', audioFile);

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('phrase_expected', phraseExpected);
    formData.append('audio_file', {
      uri: audioFile.uri,
      type: audioFile.type || 'audio/wav',
      name: audioFile.name || 'recording.wav',
    });

    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.VERIFY}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: API_TIMEOUT,
      }
    );

    console.log('✅ Verificação concluída:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('❌ Erro na verificação:', error.response?.data || error.message);
    
    // Extrair mensagem de erro da resposta
    const errorMessage = error.response?.data?.error 
      || error.response?.data?.message 
      || error.message 
      || 'Erro ao verificar voz';

    return {
      success: false,
      error: errorMessage,
    };
  }
};
