# 🪟 Instalação no Windows - Voice Auth App

## ⚡ Guia Rápido para Windows PowerShell

### ✅ Pré-requisitos

1. **Node.js instalado?**
   ```powershell
   node --version
   # Deve mostrar v16.0.0 ou superior
   ```
   
   Se não tiver, baixe em: https://nodejs.org/

2. **npm instalado?**
   ```powershell
   npm --version
   ```

---

## 🚀 Passo a Passo

### 1. Navegar para a pasta do projeto

```powershell
cd "C:\Users\leonf\OneDrive\Desktop\-\repositorios\auth-voice-app"
```

### 2. Instalar dependências

```powershell
npm install
```

⏱️ Aguarde 2-5 minutos...

**Possíveis avisos (normais):**
```
npm WARN deprecated ...
```
✅ Pode ignorar warnings

---

### 3. Descobrir o IP do seu computador

```powershell
ipconfig
```

Procure por **"Endereço IPv4"** da sua rede Wi-Fi:
```
Adaptador de Rede sem Fio Wi-Fi:
   Endereço IPv4. . . . . . . . : 10.1.4.224    ← ESTE IP
```

📝 **Anote o IP:** `10.1.4.224`

---

### 4. Configurar IP da API

Abra o arquivo: `src\config\api.js`

```javascript
// Altere para o IP do SEU computador
export const API_BASE_URL = 'http://10.1.4.224:8000';
```

Se a API está em outro computador, use o IP dele.

---

### 5. Iniciar o app

```powershell
npm start
```

Ou se der erro:

```powershell
npx expo start
```

**O que vai acontecer:**
1. ✅ Metro Bundler vai iniciar
2. ✅ Um QR Code aparecerá no terminal
3. ✅ Página web abrirá no navegador

---

### 6. Abrir no celular

#### Android:
1. Instale **Expo Go** da Play Store
2. Abra o app
3. Toque em "Scan QR Code"
4. Escaneie o QR Code do terminal

#### iOS:
1. Instale **Expo Go** da App Store
2. Abra o app Câmera
3. Aponte para o QR Code
4. Toque na notificação

---

## 🔧 Comandos Úteis

### Limpar cache e reiniciar
```powershell
npx expo start --clear
```

### Parar o servidor
```
Ctrl + C
```

### Reinstalar dependências
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Ver logs detalhados
```powershell
npm start -- --verbose
```

---

## ⚠️ Problemas Comuns no Windows

### 1. "expo : O arquivo ... não pode ser carregado..."

**Erro completo:**
```
expo : O arquivo C:\Users\...\npm\expo.ps1 não pode ser carregado porque a 
execução de scripts foi desabilitada neste sistema.
```

**Solução:**
```powershell
# Execute PowerShell como Administrador
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Confirme com: S (Sim)
```

Depois tente novamente:
```powershell
npm start
```

---

### 2. "EACCES: permission denied"

**Solução:**
```powershell
# Execute PowerShell como Administrador
# Ou use:
npx expo start
```

---

### 3. "Module not found"

**Solução:**
```powershell
Remove-Item -Recurse -Force node_modules
npm install
npx expo start --clear
```

---

### 4. Firewall bloqueando porta 8000

**Solução:**

1. Abra **Firewall do Windows Defender**
2. Clique em **Configurações Avançadas**
3. Clique em **Regras de Entrada** → **Nova Regra**
4. Selecione **Porta** → Avançar
5. **TCP** → Portas específicas: `8000`
6. **Permitir conexão**
7. Marque todas as opções (Domínio, Privado, Público)
8. Nome: `API Voice Auth`

Ou execute no PowerShell como Admin:
```powershell
New-NetFirewallRule -DisplayName "API Voice Auth" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
```

---

### 5. "Cannot find module 'metro-config'"

**Solução:**
```powershell
npm install --save-dev metro-config
npx expo start --clear
```

---

## 🌐 Testar API no Windows

### Verificar se porta 8000 está aberta:
```powershell
Test-NetConnection -ComputerName 10.1.4.224 -Port 8000
```

### Testar endpoint com PowerShell:
```powershell
Invoke-WebRequest -Uri "http://10.1.4.224:8000/health"
```

### Ou no navegador:
```
http://10.1.4.224:8000/health
http://10.1.4.224:8000/docs
```

---

## 📱 Emulador Android no Windows

### Pré-requisitos:
- Android Studio instalado
- AVD (Android Virtual Device) configurado

### Executar:
```powershell
npm run android
```

**Primeira vez vai demorar ~5-10 minutos**

---

## 🔍 Debug no Windows

### Ver processos na porta 8081 (Metro):
```powershell
netstat -ano | findstr :8081
```

### Matar processo (se necessário):
```powershell
# Anote o PID da saída acima
taskkill /PID <numero_pid> /F
```

### Ver processos Expo:
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*expo*"}
```

---

## 📋 Checklist de Instalação

- [ ] Node.js instalado (v16+)
- [ ] npm funcionando
- [ ] Navegou para pasta do projeto
- [ ] Executou `npm install` com sucesso
- [ ] Descobriu IP do computador
- [ ] Configurou IP em `src\config\api.js`
- [ ] Executou `npm start` ou `npx expo start`
- [ ] QR Code apareceu
- [ ] Expo Go instalado no celular
- [ ] App abriu no celular
- [ ] API está rodando e acessível
- [ ] Firewall configurado (se necessário)

---

## 🆘 Ainda com problemas?

### 1. Limpar tudo e recomeçar:
```powershell
# Parar servidor (Ctrl+C)

# Limpar cache do npm
npm cache clean --force

# Remover node_modules
Remove-Item -Recurse -Force node_modules

# Remover lock file
Remove-Item package-lock.json

# Reinstalar
npm install

# Iniciar com cache limpo
npx expo start --clear
```

### 2. Verificar versões:
```powershell
node --version    # v16.0.0 ou superior
npm --version     # 8.0.0 ou superior
```

### 3. Atualizar npm:
```powershell
npm install -g npm@latest
```

---

## 💡 Dicas Específicas do Windows

1. **Use PowerShell ou CMD, não Git Bash** (pode ter problemas)

2. **Caminhos com espaços:**
   ```powershell
   cd "C:\Users\Nome Com Espaço\projeto"
   ```

3. **Verificar antivírus:**
   - Às vezes antivírus bloqueia Node.js
   - Adicione exceção para pasta do projeto

4. **Rede Wi-Fi:**
   - Celular e PC devem estar na MESMA rede
   - Evite usar VPN

5. **WSL (Windows Subsystem for Linux):**
   - Pode usar, mas configure corretamente o networking
   - Ou prefira PowerShell nativo

---

## ✅ Instalação Bem-Sucedida!

Se você viu:
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

✅ **Está funcionando!**

**Próximo passo:** Escaneie o QR Code e teste o app! 🎤

---

## 🔗 Links Úteis

- [Node.js Download](https://nodejs.org/en/download/)
- [Android Studio](https://developer.android.com/studio)
- [Expo Go - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [Expo Go - App Store](https://apps.apple.com/app/expo-go/id982107779)
- [Documentação Expo](https://docs.expo.dev/)

---

**Desenvolvido e testado no Windows 11 com PowerShell 7** ✨
