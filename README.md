# 🎤 Voice Auth App

Aplicativo React Native (Expo) completo e funcional para testar uma API de Autenticação por Voz com cadastro (enrollment) e verificação de identidade.

## ✨ Funcionalidades

- 🔊 **Gravação de Áudio** - Captura de voz com validação de qualidade
- 👤 **Cadastro de Voz (Enrollment)** - Registro biométrico de voz
- 🔐 **Verificação de Identidade** - Autenticação por reconhecimento vocal
- 📝 **Frases Dinâmicas** - Desafios gerados pela API
- 📊 **Score de Similaridade** - Feedback visual do nível de autenticação
- 🎨 **Interface Intuitiva** - UX otimizada para fluxo de autenticação

## 📚 Documentação

### Guias Principais
- **[📖 Início Rápido](docs/QUICK_START.md)** - Primeiros passos em 5 minutos
- **[📘 Guia de Uso Completo](docs/USAGE_GUIDE.md)** - Como usar todas as funcionalidades
- **[🏗️ Arquitetura](docs/ARCHITECTURE.md)** - Estrutura técnica, padrões e fluxos de dados

### Referência Técnica
- **[🔌 API](docs/API.md)** - Documentação completa dos endpoints, tipos e exemplos
- **[🎨 Referência de UI](docs/UI_REFERENCE.md)** - Guia visual dos componentes
- **[🧪 Casos de Teste](docs/TEST_CASES.md)** - Cenários de teste e validação

### Solução de Problemas
- **[🔧 Troubleshooting](docs/TROUBLESHOOTING.md)** - Problemas comuns e soluções
- **[🪟 Instalação Windows](docs/WINDOWS_INSTALL.md)** - Guia específico para Windows

### Outros
- **[📋 Resumo do Projeto](docs/PROJECT_SUMMARY.md)** - Visão geral técnica
- **[📑 Índice Completo](docs/INDEX.md)** - Navegação por toda documentação
- **[🎯 Resumo Executivo](docs/EXECUTIVE_SUMMARY.md)** - Overview para stakeholders

## 📋 Requisitos

- **Node.js** 16 ou superior
- **npm** ou **yarn**
- **Expo CLI** (instalado automaticamente)
- **Dispositivo físico** ou emulador Android/iOS
- **API de Voz** rodando e acessível na rede

## 🚀 Instalação e Execução

### Instalação Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm start
```

### Comandos Disponíveis

```bash
npm start          # Inicia Expo DevTools
npm run android    # Executa no emulador Android
npm run ios        # Executa no simulador iOS (somente macOS)
npm run web        # Executa no navegador
```

> 💡 **Para instruções detalhadas**, veja [Início Rápido](docs/QUICK_START.md) ou [Instalação Windows](docs/WINDOWS_INSTALL.md)

## 📱 Testando no Celular

### Método 1: Expo Go (Recomendado)

1. Instale o **Expo Go** no seu dispositivo:
   - [📥 Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [📥 iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Execute `npm start` no terminal

3. **Escaneie o QR Code**:
   - **Android**: Abra o Expo Go e clique em "Scan QR Code"
   - **iOS**: Use a câmera nativa do iPhone

4. Aguarde o carregamento do app

### Método 2: Build Nativo

Consulte o [Guia de Uso](docs/USAGE_GUIDE.md) para builds standalone.

> ⚠️ **Importante**: Certifique-se de que seu dispositivo está na mesma rede Wi-Fi do computador.

## ⚙️ Configuração da API

### Endereço Padrão

O app está configurado para se conectar com:

```
http://10.1.4.224:8000
```

### Alterando o Endereço

Edite o arquivo de configuração:

```javascript
// src/config/api.js
export const API_BASE_URL = 'http://SEU_IP:PORTA';
```

### Testando a Conexão

1. Abra o app
2. Na tela inicial, clique em **"🔍 Testar Conexão"**
3. Verifique se aparece "✅ API Conectada"

> 📘 **Mais detalhes**: Consulte a [Documentação da API](docs/API.md) para informações sobre endpoints e formatos de dados.

## 🎯 Guia Rápido de Uso

### 1️⃣ Testar Conexão com API
```
Tela Inicial → "🔍 Testar Conexão"
```
Certifique-se de que a API está acessível antes de prosseguir.

### 2️⃣ Cadastrar Voz (Enrollment)
```
Tela Inicial → "👤 Cadastrar Voz"
```

1. Digite um **User ID** único (ex: `joao123`)
2. Clique em **"📝 Obter Frase"**
3. Leia a frase exibida
4. Clique em **"🎤 Gravar Áudio"**
5. Fale a frase claramente
6. Clique em **"⏹️ Parar Gravação"**
7. Clique em **"🚀 Cadastrar Voz"**

### 3️⃣ Verificar Identidade
```
Tela Inicial → "🔐 Verificar Voz"
```

1. Digite o **mesmo User ID** usado no cadastro
2. Repita o processo de obtenção de frase e gravação
3. Clique em **"🔍 Verificar Identidade"**
4. Veja o resultado:
   - ✅ **Autenticado** (similaridade ≥ 0.7)
   - ❌ **Não Autenticado** (similaridade < 0.7)

> 📘 **Mais detalhes**: Consulte o [Guia de Uso Completo](docs/USAGE_GUIDE.md) para dicas e melhores práticas.

## 📁 Estrutura do Projeto

```
auth-voice-app/
├── App.js                          # Ponto de entrada e navegação
├── package.json                    # Dependências e scripts
├── app.json                        # Configuração Expo
├── babel.config.js                 # Configuração Babel
│
├── docs/                           # 📚 Documentação completa
│   ├── API.md                     # Documentação da API
│   ├── ARCHITECTURE.md            # Arquitetura técnica
│   ├── QUICK_START.md             # Início rápido
│   ├── USAGE_GUIDE.md             # Guia de uso
│   ├── TROUBLESHOOTING.md         # Solução de problemas
│   └── ...                        # Outras documentações
│
└── src/
    ├── config/
    │   └── api.js                 # ⚙️ Configuração da API
    │
    ├── services/
    │   └── voiceService.js        # 🔌 Chamadas HTTP
    │
    ├── components/
    │   ├── AudioRecorder.js       # 🎤 Gravação de áudio
    │   ├── PhraseDisplay.js       # 📝 Exibição de frases
    │   └── ResultDisplay.js       # 📊 Resultado da verificação
    │
    ├── screens/
    │   ├── HomeScreen.js          # 🏠 Tela inicial
    │   ├── EnrollmentScreen.js    # 👤 Cadastro de voz
    │   └── VerificationScreen.js  # 🔐 Verificação
    │
    └── utils/
        └── audioUtils.js          # 🛠️ Helpers de áudio
```

> 🏗️ **Arquitetura detalhada**: Veja [ARCHITECTURE.md](docs/ARCHITECTURE.md) para fluxos de dados, padrões e integrações.

## 🔧 Solução de Problemas

### ❌ "Permissão de microfone negada"
```
Configurações do App → Permissões → Habilitar Microfone
```

### ❌ "Erro ao conectar com API"
1. Verifique se a API está rodando: `http://10.1.4.224:8000/health`
2. Confirme que está na mesma rede Wi-Fi
3. Verifique firewall (porta 8000)
4. Windows: `netstat -an | findstr :8000`

### ❌ "Erro ao enviar áudio"
- Grave novamente com voz clara
- Fale exatamente a frase exibida
- Teste em ambiente mais silencioso
- Aumente o volume de gravação

### ❌ App não inicia
```bash
# Limpar cache e reinstalar
npm start -- --clear
rm -rf node_modules
npm install
```

> 🔧 **Mais soluções**: Consulte [Troubleshooting](docs/TROUBLESHOOTING.md) para problemas específicos.

## 🌐 API Reference

### Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/health` | Status da API |
| `GET` | `/voice/challenge` | Obter frase de desafio |
| `POST` | `/voice/enroll` | Cadastrar voz do usuário |
| `POST` | `/voice/verify` | Verificar identidade |

### Formato de Áudio

| Propriedade | Valor |
|-------------|-------|
| **Formato** | WAV |
| **Taxa de Amostragem** | 16000 Hz |
| **Canais** | Mono (1) |
| **Duração** | 2-10 segundos |
| **Codificação** | Linear PCM |

> 🔌 **Documentação completa da API**: Veja [API.md](docs/API.md) para detalhes de request/response, tipos TypeScript, data flows e exemplos de código.

## 🧪 Testes e Debug

### Executar Testes

```bash
npm test
```

### Debug Remoto

1. Execute o app (`npm start`)
2. Abra o menu de desenvolvedor:
   - **Android**: Shake o dispositivo ou `Ctrl+M` (emulador)
   - **iOS**: Shake o dispositivo ou `Cmd+D` (simulador)
3. Selecione **"Debug Remote JS"**
4. Abra o Console do navegador (`F12`)

### Casos de Teste

Consulte [TEST_CASES.md](docs/TEST_CASES.md) para cenários de teste detalhados:
- ✅ Enrollment com sucesso
- ✅ Verificação autenticada
- ❌ Verificação não autenticada
- ⚠️ Erros de rede
- ⚠️ Permissões negadas

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Expo** | ~54.0.0 | Framework principal |
| **React Native** | 0.81.5 | UI framework |
| **React** | 19.1.0 | Biblioteca de componentes |
| **expo-av** | ~16.0.7 | Gravação/reprodução de áudio |
| **Axios** | ^1.7.0 | Cliente HTTP |
| **React Navigation** | ^7.0.0 | Navegação entre telas |

> 🏗️ **Mais detalhes**: Veja [ARCHITECTURE.md](docs/ARCHITECTURE.md) para dependências completas e padrões de design.

## 📝 Melhores Práticas

### Durante o Cadastro (Enrollment)
- ✅ Use IDs únicos e descritivos
- ✅ Fale claramente e com volume adequado
- ✅ Grave em ambiente silencioso
- ✅ Repita se a qualidade estiver ruim

### Durante a Verificação
- ✅ Use o mesmo User ID do cadastro
- ✅ Fale com tom e velocidade normais
- ✅ Evite ruídos de fundo
- ✅ Mantenha distância consistente do microfone

### Dicas Gerais
- 🔍 Sempre teste a conexão antes de usar
- 📱 Mantenha a API rodando durante os testes
- 🔊 Use fones de ouvido para evitar eco
- 📊 Score ≥ 0.7 = Autenticado

> 📘 **Mais dicas**: Veja [USAGE_GUIDE.md](docs/USAGE_GUIDE.md) para guia completo.

## 🤝 Contribuindo

Este é um projeto de teste para validação de API. Para sugestões ou melhorias:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Leon Fagundes**
- GitHub: [@leonfagundes](https://github.com/leonfagundes)
- Projeto: [voice-auth-app](https://github.com/leonfagundes/voice-auth-app)

## 🙏 Agradecimentos

Desenvolvido para testes e validação da API de Autenticação por Voz.

---

**💡 Precisa de ajuda?** Consulte a [documentação completa](docs/INDEX.md) ou abra uma issue no GitHub.
