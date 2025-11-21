# ⚡ Instalação Rápida - Voice Auth App

## 📋 Pré-requisitos

- ✅ Node.js 16+ ([Download](https://nodejs.org/))
- ✅ npm ou yarn
- ✅ Smartphone com Expo Go instalado

---

## 🚀 Instalação em 3 Passos

### 1. Instalar Dependências

```bash
npm install
```

⏱️ Aguarde 2-3 minutos...

---

### 2. Configurar IP da API

Edite o arquivo: `src/config/api.js`

```javascript
// Altere para o IP do seu servidor
export const API_BASE_URL = 'http://10.1.4.224:8000';
```

**Como descobrir o IP do servidor:**

**Windows:**
```bash
ipconfig
# Procure: "Endereço IPv4" da sua rede Wi-Fi
```

**Linux/Mac:**
```bash
ifconfig
# ou
ip addr show
```

---

### 3. Iniciar o App

```bash
npm start
```

Isso irá:
1. ✅ Iniciar o Metro Bundler
2. ✅ Exibir um QR Code
3. ✅ Abrir página no navegador

---

## 📱 Executar no Celular

### Android

1. Instale **Expo Go** na Play Store
2. Abra o app Expo Go
3. Toque em "Scan QR Code"
4. Escaneie o QR Code exibido no terminal

### iOS

1. Instale **Expo Go** na App Store
2. Abra o app Câmera nativo
3. Aponte para o QR Code
4. Toque na notificação que aparecer

---

## ⚙️ Executar no Emulador/Simulador

### Android (Emulador)

```bash
npm run android
```

**Requisitos:**
- Android Studio instalado
- AVD (Android Virtual Device) configurado

### iOS (Simulador - apenas macOS)

```bash
npm run ios
```

**Requisitos:**
- Xcode instalado
- Simulador iOS configurado

---

## 🌐 Testar no Navegador (Limitado)

```bash
npm run web
```

⚠️ **Nota:** Gravação de áudio pode não funcionar perfeitamente no navegador.

---

## ✅ Verificar se está Funcionando

### 1. App abriu no celular?
- ✅ Deve aparecer a tela "🎤 Voice Auth App"

### 2. Teste a conexão com API:
- Toque em "🔍 Testar Conexão"
- Deve mostrar: "✅ Conectado!"

### 3. Se houver erro de conexão:
- ❌ Verifique se API está rodando
- ❌ Celular e servidor estão na mesma rede Wi-Fi?
- ❌ IP está correto em `src/config/api.js`?

---

## 🆘 Problemas Comuns

### "expo: command not found"

**Solução 1:** Usar npx (sem instalar globalmente)
```bash
npx expo start
```

**Solução 2:** Instalar Expo CLI globalmente
```bash
npm install -g expo-cli
expo start
```

---

### "Unable to resolve module"

```bash
# Limpar cache
rm -rf node_modules
npm install
npx expo start --clear
```

**Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force node_modules
npm install
npx expo start --clear
```

---

### "Network request failed" no app

**Checklist:**
1. ✅ API está rodando? Teste: `http://10.1.4.224:8000/health`
2. ✅ Celular na mesma rede Wi-Fi do servidor?
3. ✅ IP correto em `src/config/api.js`?
4. ✅ Firewall bloqueando porta 8000?

---

### "Permissão de microfone negada"

**Android:**
```
Configurações → Apps → Voice Auth App → Permissões → Microfone → Permitir
```

**iOS:**
```
Configurações → Privacidade → Microfone → Voice Auth App → Ativar
```

---

## 📖 Próximos Passos

1. ✅ App instalado e funcionando
2. ✅ Conexão com API testada
3. ➡️ Leia [USAGE_GUIDE.md](USAGE_GUIDE.md) para aprender a usar
4. ➡️ Veja [TROUBLESHOOTING.md](TROUBLESHOOTING.md) se tiver problemas

---

## 🎯 Resumo dos Comandos

```bash
# Instalar dependências
npm install

# Iniciar app (com cache limpo)
npm start

# Ou limpar cache antes
npx expo start --clear

# Android
npm run android

# iOS (macOS apenas)
npm run ios

# Web
npm run web
```

---

## 🔗 Links Úteis

- [Expo Go - Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [Expo Go - iOS](https://apps.apple.com/app/expo-go/id982107779)
- [Node.js Download](https://nodejs.org/)
- [Documentação Expo](https://docs.expo.dev/)

---

## ✨ Pronto!

Se tudo funcionou:
- ✅ App está rodando no celular
- ✅ Conexão com API está OK
- ✅ Pode começar a testar!

**➡️ Próximo passo:** Cadastre sua primeira voz! 🎤
