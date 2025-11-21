# 📚 Voice Auth App - Índice da Documentação

## 🎯 Começando Rápido

### Para Iniciantes
1. **[QUICK_START.md](QUICK_START.md)** ⚡
   - Instalação em 3 passos
   - Comandos essenciais
   - Primeiros testes

### Para Usuários Windows
2. **[WINDOWS_INSTALL.md](WINDOWS_INSTALL.md)** 🪟
   - Guia específico para PowerShell
   - Solução de problemas do Windows
   - Configuração de firewall

---

## 📖 Documentação Completa

### Visão Geral
3. **[README.md](README.md)** 📄
   - Descrição do projeto
   - Estrutura de arquivos
   - Como executar
   - Troubleshooting básico

4. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** 📊
   - Resumo executivo
   - Funcionalidades implementadas
   - Tecnologias utilizadas
   - Métricas do projeto

### Guias de Uso
5. **[USAGE_GUIDE.md](USAGE_GUIDE.md)** 📖
   - Tutorial passo a passo
   - Fluxo de enrollment
   - Fluxo de verificação
   - Interpretação de resultados
   - Boas práticas
   - Exemplos de console logs

### Testes
6. **[TEST_CASES.md](TEST_CASES.md)** 🧪
   - 10 casos de teste detalhados
   - Template de relatório
   - Métricas de sucesso
   - Checklist de aceitação

### Design
7. **[UI_REFERENCE.md](UI_REFERENCE.md)** 🎨
   - Wireframes das telas
   - Paleta de cores
   - Componentes visuais
   - Estados e animações

### Troubleshooting
8. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** 🔧
   - Solução de problemas por categoria
   - Debug avançado
   - Problemas por plataforma
   - Checklist de diagnóstico

---

## 🗂️ Estrutura do Código

### Arquivos Principais

#### Configuração
- **package.json** - Dependências do projeto
- **app.json** - Configuração do Expo
- **babel.config.js** - Configuração do Babel
- **.gitignore** - Arquivos ignorados

#### Código-Fonte
- **App.js** - Navegação principal

#### `src/config/`
- **api.js** - URL base e endpoints da API

#### `src/services/`
- **voiceService.js** - Chamadas HTTP (Axios)
  - `checkHealth()` - Testa conexão
  - `getChallengePhrase()` - Obtém frase
  - `enrollVoice()` - Cadastra voz
  - `verifyVoice()` - Verifica identidade

#### `src/utils/`
- **audioUtils.js** - Helpers de áudio
  - `requestAudioPermissions()` - Solicita permissões
  - `getRecordingOptions()` - Configurações de gravação
  - `formatDuration()` - Formata tempo

#### `src/components/`
- **AudioRecorder.js** - Componente de gravação
  - Timer visual
  - Controles de gravação
  - Reprodução de áudio
  
- **PhraseDisplay.js** - Exibição de frases
  - Formatação da frase
  - Botão copiar
  - Instruções
  
- **ResultDisplay.js** - Resultado da verificação
  - ✅/❌ Visual
  - Score com barra de progresso
  - Interpretação do resultado

#### `src/screens/`
- **HomeScreen.js** - Tela inicial
  - Status da API
  - Navegação
  - Instruções
  
- **EnrollmentScreen.js** - Cadastro de voz
  - Fluxo de 4 passos
  - Validações
  - Feedback
  
- **VerificationScreen.js** - Verificação
  - Fluxo de 4 passos
  - Resultado visual
  - Nova tentativa

---

## 🎯 Guias por Objetivo

### "Quero instalar o app"
1. Leia [QUICK_START.md](QUICK_START.md)
2. Se Windows, veja [WINDOWS_INSTALL.md](WINDOWS_INSTALL.md)
3. Execute: `npm install` → `npm start`

### "Como uso o app?"
1. Leia [USAGE_GUIDE.md](USAGE_GUIDE.md)
2. Siga o fluxo passo a passo
3. Veja exemplos de uso

### "Está dando erro!"
1. Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Verifique checklist de diagnóstico
3. Veja soluções específicas

### "Preciso testar o app"
1. Leia [TEST_CASES.md](TEST_CASES.md)
2. Execute os 10 casos de teste
3. Preencha relatório

### "Quero entender o design"
1. Veja [UI_REFERENCE.md](UI_REFERENCE.md)
2. Confira wireframes
3. Entenda paleta de cores

### "Preciso de uma visão geral"
1. Leia [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Veja funcionalidades implementadas
3. Confira tecnologias usadas

---

## 🔗 Links Rápidos

### Instalação
- [Guia Rápido](QUICK_START.md#-instalação-em-3-passos)
- [Windows PowerShell](WINDOWS_INSTALL.md#-passo-a-passo)
- [Dependências](README.md#-instalação)

### Uso
- [Primeiro Uso](USAGE_GUIDE.md#️⃣-primeira-execução)
- [Cadastrar Voz](USAGE_GUIDE.md#️⃣-cadastrar-voz-enrollment)
- [Verificar Identidade](USAGE_GUIDE.md#️⃣-verificar-identidade)
- [Entender Scores](USAGE_GUIDE.md#-entendendo-os-scores)

### Problemas
- [Instalação](TROUBLESHOOTING.md#-problemas-de-instalação)
- [Permissões](TROUBLESHOOTING.md#-problemas-de-permissão)
- [Conexão API](TROUBLESHOOTING.md#-problemas-de-conexão-com-api)
- [Gravação](TROUBLESHOOTING.md#️-problemas-de-gravação-de-áudio)

### Testes
- [Fluxo Completo](TEST_CASES.md#caso-1-fluxo-completo-de-sucesso)
- [Usuário Impostor](TEST_CASES.md#caso-3-voz-diferente-impostor)
- [Template Relatório](TEST_CASES.md#-template-de-relatório-de-testes)

---

## 📊 Fluxograma de Uso

```
Início
  │
  ├─→ Instalação
  │   ├─ QUICK_START.md (Geral)
  │   └─ WINDOWS_INSTALL.md (Windows)
  │
  ├─→ Configuração
  │   ├─ IP da API (src/config/api.js)
  │   └─ Permissões (microfone)
  │
  ├─→ Teste de Conexão
  │   └─ Home → "Testar Conexão"
  │
  ├─→ Cadastro (Enrollment)
  │   ├─ User ID
  │   ├─ Obter Frase
  │   ├─ Gravar Áudio
  │   └─ Enviar Cadastro
  │
  ├─→ Verificação
  │   ├─ User ID
  │   ├─ Obter Frase
  │   ├─ Gravar Áudio
  │   └─ Ver Resultado
  │
  └─→ Problemas?
      └─ TROUBLESHOOTING.md
```

---

## 🎓 Recursos por Nível

### Iniciante
1. [QUICK_START.md](QUICK_START.md) - Instalação básica
2. [USAGE_GUIDE.md](USAGE_GUIDE.md) - Como usar
3. [UI_REFERENCE.md](UI_REFERENCE.md) - Entender interface

### Intermediário
1. [README.md](README.md) - Documentação completa
2. [TEST_CASES.md](TEST_CASES.md) - Testar funcionalidades
3. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Resolver problemas

### Avançado
1. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Arquitetura
2. Código-fonte (src/)
3. [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-debug-avançado) - Debug

---

## 🔍 Busca Rápida

### Instalação
- `npm install` → [QUICK_START.md](QUICK_START.md)
- PowerShell → [WINDOWS_INSTALL.md](WINDOWS_INSTALL.md)
- Dependências → [README.md](README.md#-requisitos)

### Configuração
- IP da API → [QUICK_START.md](QUICK_START.md#2-configurar-ip-da-api)
- Permissões → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-problemas-de-permissão)
- Firewall → [WINDOWS_INSTALL.md](WINDOWS_INSTALL.md#4-firewall-bloqueando-porta-8000)

### Uso
- Cadastrar → [USAGE_GUIDE.md](USAGE_GUIDE.md#️⃣-cadastrar-voz-enrollment)
- Verificar → [USAGE_GUIDE.md](USAGE_GUIDE.md#️⃣-verificar-identidade)
- Scores → [USAGE_GUIDE.md](USAGE_GUIDE.md#-entendendo-os-scores)

### Erros
- "expo not found" → [WINDOWS_INSTALL.md](WINDOWS_INSTALL.md#1-expo--o-arquivo--não-pode-ser-carregado)
- "Network failed" → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#erro-network-request-failed-ou-econnrefused)
- "Permission denied" → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#permissão-de-microfone-negada)

---

## 📞 Suporte

### Antes de pedir ajuda:
1. ✅ Leu [QUICK_START.md](QUICK_START.md)?
2. ✅ Consultou [TROUBLESHOOTING.md](TROUBLESHOOTING.md)?
3. ✅ Verificou checklist de diagnóstico?
4. ✅ Testou conexão com API?

### Informações úteis para reportar:
- Sistema operacional
- Versão do Node.js (`node --version`)
- Mensagem de erro completa
- Console logs
- Passos para reproduzir

---

## 📈 Progresso Sugerido

### Dia 1: Setup
- [ ] Instalar dependências
- [ ] Configurar IP da API
- [ ] Testar conexão
- [ ] App rodando no celular

### Dia 2: Uso Básico
- [ ] Cadastrar primeira voz
- [ ] Verificar identidade
- [ ] Entender scores
- [ ] Testar diferentes condições

### Dia 3: Testes Avançados
- [ ] Executar 10 casos de teste
- [ ] Testar com diferentes usuários
- [ ] Documentar resultados
- [ ] Identificar melhorias

---

## 🎯 Objetivo Final

Após ler esta documentação, você deve ser capaz de:

✅ Instalar o app sem erros  
✅ Configurar conexão com API  
✅ Cadastrar vozes no sistema  
✅ Verificar identidades  
✅ Interpretar resultados  
✅ Resolver problemas comuns  
✅ Testar diferentes cenários  
✅ Entender o código-fonte  

---

## 📚 Documentos por Tamanho

- **Leitura rápida** (5 min):
  - [QUICK_START.md](QUICK_START.md)
  - [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

- **Leitura média** (15 min):
  - [README.md](README.md)
  - [USAGE_GUIDE.md](USAGE_GUIDE.md)
  - [UI_REFERENCE.md](UI_REFERENCE.md)

- **Leitura completa** (30+ min):
  - [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
  - [TEST_CASES.md](TEST_CASES.md)
  - [WINDOWS_INSTALL.md](WINDOWS_INSTALL.md)

---

## 🎨 Documentos por Tipo

### 📘 Tutoriais
- [QUICK_START.md](QUICK_START.md)
- [WINDOWS_INSTALL.md](WINDOWS_INSTALL.md)
- [USAGE_GUIDE.md](USAGE_GUIDE.md)

### 📗 Referências
- [README.md](README.md)
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- [UI_REFERENCE.md](UI_REFERENCE.md)

### 📙 Solução de Problemas
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### 📕 Testes
- [TEST_CASES.md](TEST_CASES.md)

---

**Desenvolvido com ❤️ para testar Voice Authentication API**

**Versão da Documentação:** 1.0.0  
**Última Atualização:** 19 de novembro de 2025
