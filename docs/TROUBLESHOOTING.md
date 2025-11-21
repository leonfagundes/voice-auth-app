# 🔧 Guia de Troubleshooting - Voice Auth App

## 📱 Problemas de Instalação

### Erro: "expo: command not found"
```bash
# Instalar Expo CLI globalmente
npm install -g expo-cli

# Ou usar npx (sem instalação global)
npx expo start
```

### Erro: "Module not found" ou dependências faltando
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# No Windows PowerShell:
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Erro: "Metro Bundler failed to start"
```bash
# Limpar cache do Metro
expo start -c

# Ou
npx expo start --clear
```

---

## 🎤 Problemas de Permissão

### "Permissão de microfone negada"

**Android:**
1. Abra Configurações do Android
2. Apps → Voice Auth App → Permissões
3. Habilite "Microfone"

**iOS:**
1. Configurações → Privacidade → Microfone
2. Habilite para "Voice Auth App"

### "Permission permanently denied"
```javascript
// Solução: Desinstalar e reinstalar o app
// Android: Limpar dados do app nas configurações
```

---

## 🌐 Problemas de Conexão com API

### Erro: "Network request failed" ou "ECONNREFUSED"

**Checklist:**
1. ✅ API está rodando?
   ```bash
   # Testar no navegador ou curl
   curl http://10.1.4.224:8000/health
   ```

2. ✅ Dispositivo está na mesma rede Wi-Fi?
   - Celular e computador devem estar na mesma rede
   - Evite usar VPN

3. ✅ Firewall está bloqueando?
   ```bash
   # Windows: Adicionar exceção na porta 8000
   # Painel de Controle → Firewall → Regras de Entrada
   ```

4. ✅ IP correto?
   ```bash
   # Windows: Descobrir seu IP local
   ipconfig
   # Procure por "IPv4 Address" da sua rede Wi-Fi
   
   # Linux/Mac:
   ifconfig
   # ou
   ip addr show
   ```

### Erro: "Timeout of 30000ms exceeded"

**Causas comuns:**
- API está processando muito lentamente
- Arquivo de áudio muito grande
- Conexão instável

**Soluções:**
```javascript
// Aumentar timeout em: src/config/api.js
export const API_TIMEOUT = 60000; // 60 segundos
```

---

## 🎙️ Problemas de Gravação de Áudio

### "Erro ao iniciar gravação"

**Checklist:**
1. Permissão de microfone concedida?
2. Outro app está usando o microfone?
3. Fechar outros apps de áudio/chamada

### Áudio não é enviado corretamente

**Verificar formato:**
```javascript
// Em AudioRecorder.js, adicionar log:
console.log('Audio URI:', uri);
console.log('Audio File:', {
  uri: audioFile.uri,
  type: audioFile.type,
  name: audioFile.name
});
```

### "Audio processing error" na API

**Soluções:**
- Gravar em ambiente mais silencioso
- Falar mais próximo ao microfone
- Aumentar volume da voz
- Gravar por pelo menos 3 segundos

---

## ❌ Erros Específicos da API

### "User already exists"

**Solução:**
- Use um `user_id` diferente
- Ou implemente endpoint de DELETE na API para remover usuário existente

### "User not found"

**Solução:**
- Faça o enrollment (cadastro) antes de verificar
- Verifique se digitou o `user_id` corretamente (case-sensitive)

### "Text validation failed"

**Causas:**
- Você não falou a frase correta
- Frase estava incompleta ou com muito ruído
- Velocidade da fala muito rápida/lenta

**Soluções:**
- Leia a frase exatamente como exibida
- Fale claramente e em ritmo normal
- Grave em local silencioso
- Tente novamente com nova gravação

---

## 📊 Problemas de Verificação

### Score muito baixo (< 0.6)

**Possíveis causas:**
- Voz diferente do enrollment (resfriado, cansaço)
- Ruído de fundo
- Microfone de qualidade diferente
- Frase pronunciada de forma muito diferente

**Dicas para melhorar:**
- Gravar em ambiente silencioso
- Usar mesmo dispositivo do enrollment
- Falar com tom e velocidade similar
- Manter distância similar do microfone

### "authenticated: false" mesmo sendo o usuário correto

**Debug:**
1. Verificar similaridade retornada
2. Se > 0.5 mas < threshold da API, ajustar threshold
3. Refazer enrollment com áudio de melhor qualidade

---

## 🐛 Debug Avançado

### Habilitar logs detalhados

**No console do navegador:**
1. Execute app com `expo start`
2. Pressione `d` para abrir Developer Tools
3. Abra Chrome DevTools (F12)
4. Veja logs no Console

**Adicionar mais logs:**
```javascript
// Em qualquer arquivo .js, adicionar:
console.log('DEBUG:', variavel);
console.error('ERRO:', erro);
console.warn('AVISO:', mensagem);
```

### Inspecionar requisições HTTP

```javascript
// Em voiceService.js, adicionar interceptor:
import axios from 'axios';

axios.interceptors.request.use(request => {
  console.log('📤 REQUEST:', request);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('📥 RESPONSE:', response);
    return response;
  },
  error => {
    console.error('❌ ERROR:', error.response || error);
    return Promise.reject(error);
  }
);
```

### Verificar arquivo de áudio gravado

```javascript
// Adicionar em AudioRecorder.js após gravação:
const fileInfo = await FileSystem.getInfoAsync(uri);
console.log('File size:', fileInfo.size, 'bytes');
```

---

## 🔄 Resetar App Completamente

```bash
# 1. Parar servidor
Ctrl+C

# 2. Limpar cache
expo start -c

# 3. Limpar node_modules (se necessário)
rm -rf node_modules
npm install

# 4. Limpar cache do dispositivo
# Desinstalar e reinstalar o app no celular
```

---

## 📱 Problemas por Plataforma

### Android

**Erro: "Unable to load script from assets"**
```bash
# Solução:
expo start --clear
# Ou
adb reverse tcp:8081 tcp:8081
```

**Áudio não grava:**
- Verificar permissão de RECORD_AUDIO no AndroidManifest
- Testar em dispositivo físico (emulador pode ter problemas)

### iOS

**Erro: "CocoaPods not installed"**
```bash
cd ios
pod install
cd ..
```

**Áudio não reproduz:**
- Verificar se modo silencioso está desativado
- Configurar AVAudioSession corretamente

---

## 🆘 Precisa de Mais Ajuda?

### Verificar logs da API
```bash
# No servidor onde a API está rodando:
# Verificar logs do FastAPI/uvicorn
```

### Testar API diretamente (sem app)
```bash
# Usar curl ou Postman:
curl http://10.1.4.224:8000/health

curl http://10.1.4.224:8000/voice/challenge
```

### Recursos Úteis
- [Documentação Expo](https://docs.expo.dev/)
- [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/)
- [React Navigation](https://reactnavigation.org/)

---

## 📋 Checklist de Diagnóstico Rápido

Antes de reportar um problema, verifique:

- [ ] Dependências instaladas (`npm install`)
- [ ] Expo CLI atualizado
- [ ] API está rodando e acessível
- [ ] Dispositivo na mesma rede Wi-Fi
- [ ] Permissão de microfone concedida
- [ ] Cache limpo (`expo start -c`)
- [ ] Logs do console verificados
- [ ] IP da API está correto em `src/config/api.js`
- [ ] Firewall permite conexões na porta 8000
- [ ] Áudio está sendo gravado corretamente

---

Se o problema persistir, copie os logs completos e a mensagem de erro específica!
