# 🔌 Documentação da API - Voice Auth App

## 📋 Visão Geral

Este documento detalha a integração com a API de autenticação por voz, incluindo endpoints, fluxo de dados, estrutura de requisições e respostas.

---

## 🌐 Configuração Base

### URL Base
```javascript
// src/config/api.js
export const API_BASE_URL = 'http://10.1.4.224:8000';
```

### Timeout
```javascript
export const API_TIMEOUT = 30000; // 30 segundos
```

### Endpoints
```javascript
export const API_ENDPOINTS = {
  HEALTH: '/health',
  CHALLENGE: '/voice/challenge',
  ENROLL: '/voice/enroll',
  VERIFY: '/voice/verify',
};
```

---

## 📡 Endpoints

### 1. Health Check

**Propósito:** Verificar se a API está funcionando

**Endpoint:** `GET /health`

**Request:**
```javascript
// Sem parâmetros
```

**Response:**
```typescript
{
  status: string;        // "ok"
  message: string;       // "Voice Authentication API is running"
}
```

**Exemplo de Uso:**
```javascript
import { checkHealth } from '../services/voiceService';

const result = await checkHealth();
if (result.success) {
  console.log(result.data.status);    // "ok"
  console.log(result.data.message);   // "Voice Authentication API is running"
}
```

**Código:**
```javascript
// src/services/voiceService.js
export const checkHealth = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Erro ao conectar com a API',
    };
  }
};
```

---

### 2. Obter Frase de Desafio

**Propósito:** Obter uma frase aleatória para o usuário pronunciar

**Endpoint:** `GET /voice/challenge`

**Request:**
```javascript
// Sem parâmetros
```

**Response:**
```typescript
{
  phrase: string;  // "Minha voz é minha identidade"
}
```

**Exemplo de Uso:**
```javascript
import { getChallengePhrase } from '../services/voiceService';

const result = await getChallengePhrase();
if (result.success) {
  console.log(result.phrase);  // "Minha voz é minha identidade"
}
```

**Código:**
```javascript
// src/services/voiceService.js
export const getChallengePhrase = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.CHALLENGE);
    return {
      success: true,
      phrase: response.data.phrase,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Erro ao obter frase de desafio',
    };
  }
};
```

---

### 3. Cadastrar Voz (Enrollment)

**Propósito:** Registrar a voz de um novo usuário no sistema

**Endpoint:** `POST /voice/enroll`

**Content-Type:** `multipart/form-data`

**Request Parameters:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `user_id` | string | ✅ | ID único do usuário |
| `phrase_expected` | string | ✅ | Frase que o usuário pronunciou |
| `audio_file` | File | ✅ | Arquivo de áudio (WAV/MP3) |

**Request Body (FormData):**
```javascript
const formData = new FormData();
formData.append('user_id', 'user123');
formData.append('phrase_expected', 'Minha voz é minha identidade');
formData.append('audio_file', {
  uri: 'file:///path/to/recording.wav',
  type: 'audio/wav',
  name: 'recording.wav',
});
```

**Response (Sucesso):**
```typescript
{
  success: true;
  message: string;      // "Voice profile created successfully"
  user_id: string;      // "user123"
}
```

**Response (Erro):**
```typescript
{
  success: false;
  error: string;  // "User already exists" | "Text validation failed" | "Audio processing error"
}
```

**Exemplo de Uso:**
```javascript
import { enrollVoice } from '../services/voiceService';

const audioFile = {
  uri: recording.getURI(),
  type: 'audio/wav',
  name: 'recording.wav',
};

const result = await enrollVoice('user123', 'Minha voz é minha identidade', audioFile);

if (result.success) {
  console.log('Cadastro bem-sucedido!');
  console.log(result.data.user_id);
} else {
  console.error('Erro:', result.error);
}
```

**Código:**
```javascript
// src/services/voiceService.js
export const enrollVoice = async (userId, phraseExpected, audioFile) => {
  try {
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

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
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
```

---

### 4. Verificar Voz (Verification)

**Propósito:** Verificar a identidade de um usuário comparando sua voz com o perfil cadastrado

**Endpoint:** `POST /voice/verify`

**Content-Type:** `multipart/form-data`

**Request Parameters:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `user_id` | string | ✅ | ID do usuário a verificar |
| `phrase_expected` | string | ✅ | Frase que o usuário pronunciou |
| `audio_file` | File | ✅ | Arquivo de áudio (WAV/MP3) |

**Request Body (FormData):**
```javascript
const formData = new FormData();
formData.append('user_id', 'user123');
formData.append('phrase_expected', 'A segurança é fundamental');
formData.append('audio_file', {
  uri: 'file:///path/to/recording.wav',
  type: 'audio/wav',
  name: 'recording.wav',
});
```

**Response (Autenticado):**
```typescript
{
  authenticated: true;
  similarity: number;    // 0.87 (87%)
  user_id: string;       // "user123"
}
```

**Response (Não Autenticado):**
```typescript
{
  authenticated: false;
  similarity: number;    // 0.42 (42%)
  user_id: string;       // "user123"
}
```

**Response (Erro):**
```typescript
{
  success: false;
  error: string;  // "User not found" | "Text validation failed"
}
```

**Exemplo de Uso:**
```javascript
import { verifyVoice } from '../services/voiceService';

const audioFile = {
  uri: recording.getURI(),
  type: 'audio/wav',
  name: 'recording.wav',
};

const result = await verifyVoice('user123', 'A segurança é fundamental', audioFile);

if (result.success) {
  if (result.data.authenticated) {
    console.log('✅ Autenticado!');
    console.log('Score:', result.data.similarity);
  } else {
    console.log('❌ Não autenticado');
  }
}
```

**Código:**
```javascript
// src/services/voiceService.js
export const verifyVoice = async (userId, phraseExpected, audioFile) => {
  try {
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

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
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
```

---

## 🎵 Especificações de Áudio

### Formato Aceito

| Propriedade | Valor |
|-------------|-------|
| **Formato** | WAV ou MP3 |
| **Taxa de Amostragem** | 16000 Hz (preferencial) ou 44100 Hz |
| **Canais** | 1 (Mono) |
| **Duração** | 2-10 segundos |
| **Bit Rate** | 128000 |

### Configuração de Gravação

```javascript
// src/utils/audioUtils.js
export const getRecordingOptions = () => {
  return {
    android: {
      extension: '.wav',
      outputFormat: Audio.AndroidOutputFormat.DEFAULT,
      audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: 'audio/webm',
      bitsPerSecond: 128000,
    },
  };
};
```

---

## 📊 Fluxo de Dados

### Enrollment (Cadastro)

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │
       │ 1. Solicita frase
       ├──────────────────────────────────────────┐
       │                                          │
       │                                    ┌─────▼──────┐
       │                                    │ GET /voice/│
       │                                    │  challenge │
       │                                    └─────┬──────┘
       │                                          │
       │ 2. Retorna frase                        │
       │◄─────────────────────────────────────────┤
       │  { phrase: "..." }                       │
       │                                          │
       │ 3. Grava áudio                           │
       │    pronunciando a frase                  │
       │                                          │
       │ 4. Envia cadastro                        │
       ├──────────────────────────────────────────┤
       │  FormData:                               │
       │  - user_id                         ┌─────▼──────┐
       │  - phrase_expected                 │ POST /voice│
       │  - audio_file                      │   /enroll  │
       │                                    └─────┬──────┘
       │                                          │
       │ 5. Retorna sucesso                      │
       │◄─────────────────────────────────────────┤
       │  { success: true, ... }                  │
       │                                          │
       ▼                                          ▼
```

### Verification (Verificação)

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │
       │ 1. Solicita frase
       ├──────────────────────────────────────────┐
       │                                          │
       │                                    ┌─────▼──────┐
       │                                    │ GET /voice/│
       │                                    │  challenge │
       │                                    └─────┬──────┘
       │                                          │
       │ 2. Retorna frase                        │
       │◄─────────────────────────────────────────┤
       │  { phrase: "..." }                       │
       │                                          │
       │ 3. Grava áudio                           │
       │    pronunciando a frase                  │
       │                                          │
       │ 4. Envia verificação                     │
       ├──────────────────────────────────────────┤
       │  FormData:                               │
       │  - user_id                         ┌─────▼──────┐
       │  - phrase_expected                 │ POST /voice│
       │  - audio_file                      │   /verify  │
       │                                    └─────┬──────┘
       │                                          │
       │ 5. Retorna resultado                    │
       │◄─────────────────────────────────────────┤
       │  {                                       │
       │    authenticated: true/false,            │
       │    similarity: 0.87,                     │
       │    user_id: "..."                        │
       │  }                                       │
       │                                          │
       ▼                                          ▼
```

---

## 🔄 Tratamento de Erros

### Estrutura de Resposta de Erro

Todos os serviços retornam objetos com a seguinte estrutura:

```typescript
{
  success: false;
  error: string;  // Mensagem de erro descritiva
}
```

### Tipos de Erro

#### Erros de Rede
```javascript
{
  success: false,
  error: "Network request failed"  // Sem conexão
}
```

#### Erros da API
```javascript
{
  success: false,
  error: "User already exists"     // Enrollment duplicado
}

{
  success: false,
  error: "User not found"          // Usuário não cadastrado
}

{
  success: false,
  error: "Text validation failed"  // Frase incorreta
}

{
  success: false,
  error: "Audio processing error"  // Áudio inválido
}
```

#### Timeout
```javascript
{
  success: false,
  error: "timeout of 30000ms exceeded"
}
```

### Exemplo de Tratamento

```javascript
const result = await enrollVoice(userId, phrase, audioFile);

if (result.success) {
  // Sucesso
  Alert.alert('✅ Sucesso', result.data.message);
} else {
  // Erro
  if (result.error.includes('already exists')) {
    Alert.alert('Atenção', 'Este usuário já está cadastrado. Use outro ID.');
  } else if (result.error.includes('validation failed')) {
    Alert.alert('Erro', 'Você não pronunciou a frase corretamente. Tente novamente.');
  } else {
    Alert.alert('Erro', result.error);
  }
}
```

---

## 🔐 Segurança

### Headers
```javascript
{
  'Content-Type': 'multipart/form-data'
}
```

### Timeout
- Todas as requisições têm timeout de 30 segundos
- Previne travamentos em caso de servidor lento

### Validações
- User ID não vazio
- Frase obrigatória
- Arquivo de áudio obrigatório
- Validação de formato de áudio no servidor

---

## 📝 Logs e Debug

Todos os serviços incluem logs detalhados:

```javascript
console.log('📤 Enviando enrollment...');
console.log('User ID:', userId);
console.log('Phrase:', phraseExpected);
console.log('Audio File:', audioFile);
console.log('✅ Enrollment bem-sucedido:', response.data);
console.error('❌ Erro no enrollment:', error);
```

Para habilitar logs mais detalhados, consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-debug-avançado).

---

## 🧪 Testes

Para testar os endpoints, veja:
- [TEST_CASES.md](TEST_CASES.md) - Casos de teste detalhados
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - Exemplos de uso

---

## 🔗 Links Relacionados

- [Documentação Principal](../README.md)
- [Guia de Uso](USAGE_GUIDE.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [Arquitetura](ARCHITECTURE.md)
