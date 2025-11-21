# 🏗️ Arquitetura - Voice Auth App

## 📋 Visão Geral da Arquitetura

O Voice Auth App segue uma arquitetura modular baseada em componentes React Native com separação clara de responsabilidades.

```
┌─────────────────────────────────────────────────────┐
│                   Presentation Layer                 │
│              (Screens & Components)                  │
├─────────────────────────────────────────────────────┤
│                   Business Logic                     │
│              (Services & Utils)                      │
├─────────────────────────────────────────────────────┤
│                   Configuration                      │
│              (API Config & Constants)                │
├─────────────────────────────────────────────────────┤
│                   External Services                  │
│              (Voice Auth API & Expo AV)              │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Pastas

```
auth-voice-app/
├── App.js                          # Ponto de entrada & Navegação
├── package.json                    # Dependências
├── app.json                        # Configuração Expo
├── babel.config.js                 # Configuração Babel
│
├── docs/                           # Documentação
│   ├── API.md                     # Documentação da API
│   ├── ARCHITECTURE.md            # Este arquivo
│   ├── QUICK_START.md             # Início rápido
│   ├── USAGE_GUIDE.md             # Guia de uso
│   ├── TROUBLESHOOTING.md         # Solução de problemas
│   ├── TEST_CASES.md              # Casos de teste
│   └── ...
│
└── src/
    ├── config/
    │   └── api.js                 # Configurações da API
    │
    ├── services/
    │   └── voiceService.js        # Lógica de integração API
    │
    ├── components/
    │   ├── AudioRecorder.js       # Gravação de áudio
    │   ├── PhraseDisplay.js       # Exibição de frases
    │   └── ResultDisplay.js       # Resultado da verificação
    │
    ├── screens/
    │   ├── HomeScreen.js          # Tela inicial
    │   ├── EnrollmentScreen.js    # Cadastro de voz
    │   └── VerificationScreen.js  # Verificação
    │
    └── utils/
        └── audioUtils.js          # Helpers de áudio
```

---

## 🎯 Camadas da Aplicação

### 1. **Presentation Layer (Apresentação)**

Responsável pela interface do usuário e interação.

#### **Screens (Telas)**

**HomeScreen.js**
- Tela inicial do aplicativo
- Teste de conexão com API
- Navegação para Enrollment/Verification

```typescript
type HomeScreenProps = {
  navigation: NavigationProp;
};

type State = {
  isConnected: boolean | null;
  loading: boolean;
};
```

**EnrollmentScreen.js**
- Fluxo de cadastro de voz
- 4 passos: ID → Frase → Gravação → Envio

```typescript
type EnrollmentState = {
  userId: string;
  phrase: string;
  audioFile: AudioFile | null;
  loading: boolean;
  loadingPhrase: boolean;
  enrollmentSuccess: boolean;
};
```

**VerificationScreen.js**
- Fluxo de verificação de identidade
- Exibição de resultados

```typescript
type VerificationState = {
  userId: string;
  phrase: string;
  audioFile: AudioFile | null;
  loading: boolean;
  loadingPhrase: boolean;
  verificationResult: VerificationResult | null;
};

type VerificationResult = {
  authenticated: boolean;
  similarity: number;
  userId: string;
};
```

#### **Components (Componentes)**

**AudioRecorder.js**
```typescript
type AudioRecorderProps = {
  onRecordingComplete: (file: AudioFile) => void;
  maxDuration?: number;  // Padrão: 10 segundos
};

type AudioFile = {
  uri: string;
  duration: number;
  type: string;
  name: string;
};

type RecorderState = {
  recording: Audio.Recording | null;
  isRecording: boolean;
  duration: number;
  sound: Audio.Sound | null;
};
```

**PhraseDisplay.js**
```typescript
type PhraseDisplayProps = {
  phrase: string;
  loading?: boolean;
};
```

**ResultDisplay.js**
```typescript
type ResultDisplayProps = {
  authenticated: boolean | null;
  similarity: number;
  userId: string;
};
```

---

### 2. **Business Logic Layer (Lógica de Negócio)**

#### **Services**

**voiceService.js**

Responsável por toda comunicação com a API.

```typescript
// Estrutura de retorno padrão
type ServiceResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Health Check
function checkHealth(): Promise<ServiceResponse<{
  status: string;
  message: string;
}>>;

// Obter Frase
function getChallengePhrase(): Promise<ServiceResponse<{
  phrase: string;
}>>;

// Cadastrar Voz
function enrollVoice(
  userId: string,
  phraseExpected: string,
  audioFile: AudioFile
): Promise<ServiceResponse<{
  success: boolean;
  message: string;
  user_id: string;
}>>;

// Verificar Voz
function verifyVoice(
  userId: string,
  phraseExpected: string,
  audioFile: AudioFile
): Promise<ServiceResponse<{
  authenticated: boolean;
  similarity: number;
  user_id: string;
}>>;
```

#### **Utils**

**audioUtils.js**

```typescript
// Solicitar permissões
function requestAudioPermissions(): Promise<boolean>;

// Configurações de gravação
function getRecordingOptions(): RecordingOptions;

// Formatar duração
function formatDuration(seconds: number): string;

type RecordingOptions = {
  android: AndroidOptions;
  ios: IOSOptions;
  web: WebOptions;
};
```

---

### 3. **Configuration Layer (Configuração)**

**config/api.js**

```typescript
export const API_BASE_URL: string = 'http://10.1.4.224:8000';

export const API_ENDPOINTS: {
  HEALTH: '/health';
  CHALLENGE: '/voice/challenge';
  ENROLL: '/voice/enroll';
  VERIFY: '/voice/verify';
};

export const API_TIMEOUT: number = 30000;
```

---

## 🔄 Fluxo de Dados

### Enrollment (Cadastro)

```
┌─────────────────┐
│ EnrollmentScreen│
└────────┬────────┘
         │
         │ 1. Usuário digita User ID
         │
         ├─────────────────────────────────┐
         │                                 │
         │ 2. Clica "Obter Frase"         │
         │                                 │
         │                           ┌─────▼────────┐
         │                           │ voiceService │
         │                           │.getChallenge │
         │                           │   Phrase()   │
         │                           └─────┬────────┘
         │                                 │
         │                                 │ HTTP GET
         │                                 │
         │                           ┌─────▼────────┐
         │                           │  Voice Auth  │
         │                           │     API      │
         │                           └─────┬────────┘
         │                                 │
         │ 3. Recebe frase                │
         │◄────────────────────────────────┤
         │
         │ 4. Exibe frase via PhraseDisplay
         │
         │ 5. Usuário clica "Gravar"
         │
         ├─────────────────────────────────┐
         │                                 │
         │                           ┌─────▼────────┐
         │                           │AudioRecorder │
         │                           │  Component   │
         │                           └─────┬────────┘
         │                                 │
         │                                 │ Grava áudio
         │                                 │ usando expo-av
         │                                 │
         │ 6. Recebe arquivo de áudio     │
         │◄────────────────────────────────┤
         │    (via onRecordingComplete)    │
         │
         │ 7. Clica "Cadastrar Voz"
         │
         ├─────────────────────────────────┐
         │                                 │
         │                           ┌─────▼────────┐
         │                           │ voiceService │
         │                           │.enrollVoice()│
         │                           └─────┬────────┘
         │                                 │
         │                                 │ HTTP POST
         │                                 │ FormData
         │                                 │
         │                           ┌─────▼────────┐
         │                           │  Voice Auth  │
         │                           │     API      │
         │                           └─────┬────────┘
         │                                 │
         │ 8. Recebe resultado            │
         │◄────────────────────────────────┤
         │    {success, message, user_id}  │
         │
         │ 9. Exibe feedback
         │    (Alert ou UI)
         │
         ▼
```

### Verification (Verificação)

```
┌──────────────────┐
│VerificationScreen│
└────────┬─────────┘
         │
         │ (Passos 1-6 iguais ao Enrollment)
         │
         │ 7. Clica "Verificar Identidade"
         │
         ├─────────────────────────────────┐
         │                                 │
         │                           ┌─────▼────────┐
         │                           │ voiceService │
         │                           │.verifyVoice()│
         │                           └─────┬────────┘
         │                                 │
         │                                 │ HTTP POST
         │                                 │ FormData
         │                                 │
         │                           ┌─────▼────────┐
         │                           │  Voice Auth  │
         │                           │     API      │
         │                           └─────┬────────┘
         │                                 │
         │ 8. Recebe resultado            │
         │◄────────────────────────────────┤
         │    {                            │
         │      authenticated: bool,       │
         │      similarity: number,        │
         │      user_id: string            │
         │    }                            │
         │
         │ 9. Exibe resultado via
         │    ResultDisplay component
         │    - ✅/❌
         │    - Score
         │    - Barra de progresso
         │
         ▼
```

---

## 🧩 Padrões de Design

### 1. **Container/Presentational Pattern**

**Containers (Screens):**
- Gerenciam estado
- Fazem chamadas de API
- Contêm lógica de negócio

**Presentational (Components):**
- Recebem props
- Sem lógica de negócio
- Focados em UI

Exemplo:
```javascript
// Container (Screen)
const EnrollmentScreen = () => {
  const [userId, setUserId] = useState('');
  
  const handleEnroll = async () => {
    const result = await enrollVoice(userId, phrase, audioFile);
    // Lógica de negócio
  };
  
  return (
    <View>
      <AudioRecorder onRecordingComplete={handleRecordingComplete} />
    </View>
  );
};

// Presentational (Component)
const AudioRecorder = ({ onRecordingComplete }) => {
  // Apenas UI e interação
  return <TouchableOpacity>...</TouchableOpacity>;
};
```

### 2. **Service Layer Pattern**

Toda comunicação com API centralizada em `voiceService.js`:

```javascript
// ❌ Ruim: Chamar API diretamente no componente
const EnrollmentScreen = () => {
  const handleEnroll = async () => {
    const response = await axios.post(...);
  };
};

// ✅ Bom: Usar service layer
const EnrollmentScreen = () => {
  const handleEnroll = async () => {
    const result = await enrollVoice(userId, phrase, audioFile);
  };
};
```

### 3. **Error Handling Pattern**

Estrutura consistente de resposta:

```javascript
// Todos os services retornam:
{
  success: boolean,
  data?: any,
  error?: string
}

// Permite tratamento uniforme:
if (result.success) {
  // Sucesso
} else {
  // Erro com result.error
}
```

---

## 🔌 Integrações Externas

### 1. **Expo AV (expo-av)**

Usado para gravação e reprodução de áudio.

```javascript
import { Audio } from 'expo-av';

// Configurar modo de áudio
await Audio.setAudioModeAsync({
  allowsRecordingIOS: true,
  playsInSilentModeIOS: true,
});

// Criar gravação
const { recording } = await Audio.Recording.createAsync(
  getRecordingOptions()
);

// Parar e obter URI
await recording.stopAndUnloadAsync();
const uri = recording.getURI();
```

### 2. **Axios**

Cliente HTTP para comunicação com API.

```javascript
import axios from 'axios';

// Cliente configurado
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

// Upload de arquivo
const formData = new FormData();
formData.append('audio_file', {
  uri,
  type: 'audio/wav',
  name: 'recording.wav',
});

await axios.post(url, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

### 3. **React Navigation**

Navegação entre telas.

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Enrollment" component={EnrollmentScreen} />
    <Stack.Screen name="Verification" component={VerificationScreen} />
  </Stack.Navigator>
</NavigationContainer>
```

---

## 📊 Gerenciamento de Estado

### Estado Local (useState)

Cada tela gerencia seu próprio estado:

```javascript
const EnrollmentScreen = () => {
  const [userId, setUserId] = useState('');
  const [phrase, setPhrase] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // ...
};
```

### Estado de Componente

Componentes gerenciam estado interno:

```javascript
const AudioRecorder = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  
  // ...
};
```

**Não há estado global** (Redux/Context) pois:
- App simples com poucas telas
- Sem necessidade de compartilhar estado
- Mantém arquitetura simples

---

## 🎨 Estilização

### StyleSheet API

Todos os estilos usando `StyleSheet.create()`:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#2196F3',
  },
});
```

### Organização

- Estilos co-localizados com componentes
- Um objeto `styles` por arquivo
- Reutilização via spread `...styles.base`

---

## 🔐 Segurança

### Validações

```javascript
// Validação de entrada
if (!userId.trim()) {
  Alert.alert('Atenção', 'Por favor, insira um User ID.');
  return;
}

// Validação de requisitos
if (!phrase || !audioFile) {
  return;
}
```

### Timeout

```javascript
// Previne requisições infinitas
const API_TIMEOUT = 30000;
```

### Error Handling

```javascript
try {
  const response = await axios.post(...);
  return { success: true, data: response.data };
} catch (error) {
  return {
    success: false,
    error: error.response?.data?.error || error.message
  };
}
```

---

## 🧪 Testabilidade

### Separação de Responsabilidades

```javascript
// ✅ Fácil de testar
export const enrollVoice = async (userId, phrase, audioFile) => {
  // Lógica isolada
};

// Teste:
test('enrollVoice retorna sucesso', async () => {
  const result = await enrollVoice('user123', 'frase', mockAudio);
  expect(result.success).toBe(true);
});
```

### Componentes Puros

```javascript
// ✅ Componente testável (props → UI)
const PhraseDisplay = ({ phrase, loading }) => {
  if (loading) return <Text>Loading...</Text>;
  return <Text>{phrase}</Text>;
};
```

---

## 📈 Performance

### Otimizações

1. **Lazy Loading**
   - Componentes carregados sob demanda via navegação

2. **Memoização (quando necessário)**
   ```javascript
   const expensiveValue = useMemo(() => {
     return complexCalculation(data);
   }, [data]);
   ```

3. **Callbacks Otimizados**
   ```javascript
   const handlePress = useCallback(() => {
     // Handler
   }, [dependencies]);
   ```

4. **Imagens Otimizadas**
   - Uso de ícones emoji (sem assets)
   - Reduz tamanho do bundle

---

## 🔄 Ciclo de Vida

### Telas

```javascript
useEffect(() => {
  // Mount: inicialização
  
  return () => {
    // Unmount: cleanup
    if (recording) {
      recording.stopAndUnloadAsync();
    }
  };
}, []);
```

### Componentes

```javascript
useEffect(() => {
  let interval;
  if (isRecording) {
    interval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [isRecording]);
```

---

## 🔗 Dependências

### Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| expo | ~54.0.0 | Framework principal |
| react | 19.1.0 | UI library |
| react-native | 0.81.5 | Mobile framework |
| expo-av | ~16.0.7 | Áudio |
| axios | ^1.7.0 | HTTP client |
| @react-navigation/native | ^7.0.0 | Navegação |
| @react-navigation/stack | ^7.0.0 | Stack navigator |

---

## 📚 Próximos Passos

Para mais detalhes:
- [API.md](API.md) - Documentação da API
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - Guia de uso
- [TEST_CASES.md](TEST_CASES.md) - Casos de teste
