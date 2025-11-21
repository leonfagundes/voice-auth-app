# 📖 Guia de Uso - Voice Auth App

## 🎯 Fluxo Completo de Teste

### 1️⃣ Primeira Execução

#### Passo 1: Instalar e Executar
```bash
# Instalar dependências
npm install

# Iniciar app
npm start
```

#### Passo 2: Abrir no Dispositivo
- Escaneie o QR Code com Expo Go (Android) ou Camera (iOS)
- Aguarde o app carregar

---

### 2️⃣ Testar Conexão com API

#### Na Tela Inicial:
1. Clique em **"🔍 Testar Conexão"**
2. Aguarde a resposta

**✅ Sucesso:**
```
Conectado!
Status: ok
Message: Voice Authentication API is running
```

**❌ Erro:**
```
Não foi possível conectar com a API
Erro: Network request failed
```

➡️ **Se houver erro:** Veja [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

### 3️⃣ Cadastrar Voz (Enrollment)

#### Passo 1: Navegar
- Na tela inicial, clique em **"👤 Cadastrar Voz"**

#### Passo 2: Identificação
- Digite um User ID único (ex: `joao123`)
- Não use espaços ou caracteres especiais

#### Passo 3: Obter Frase
- Clique em **"📝 Obter Frase"**
- Uma frase será exibida, exemplo:
  ```
  "Minha voz é minha identidade"
  ```
- **IMPORTANTE:** Memorize ou leia a frase

#### Passo 4: Gravar Áudio
1. Clique em **"🎤 Gravar Áudio"**
2. Botão ficará vermelho (gravando)
3. **Fale a frase claramente**
4. Clique em **"⏹️ Parar Gravação"**

**Dicas de Gravação:**
- 🔇 Ambiente silencioso
- 🎤 Fale próximo ao microfone
- 🗣️ Voz clara e natural
- ⏱️ 3-5 segundos de duração ideal

#### Passo 5: Enviar Cadastro
- Clique em **"🚀 Cadastrar Voz"**
- Aguarde o processamento (pode levar 5-15 segundos)

**Resposta de Sucesso:**
```
✅ Sucesso!
Voz cadastrada com sucesso!
Usuário: joao123
```

**Possíveis Erros:**
- `User already exists` → Use outro ID
- `Text validation failed` → Frase incorreta, tente novamente
- `Audio processing error` → Áudio com muito ruído

---

### 4️⃣ Verificar Identidade

#### Passo 1: Navegar
- Volte para tela inicial
- Clique em **"🔐 Verificar Voz"**

#### Passo 2: Identificação
- Digite o **MESMO User ID** usado no cadastro
- Ex: `joao123`

#### Passo 3: Obter Frase
- Clique em **"📝 Obter Frase"**
- Nova frase será exibida (pode ser diferente)

#### Passo 4: Gravar Áudio
- Mesmo processo do enrollment
- **Fale com a mesma voz/tom do cadastro**

#### Passo 5: Verificar
- Clique em **"🔍 Verificar Identidade"**
- Aguarde o resultado

**Resultado Positivo:**
```
✅ Autenticado com Sucesso!
Usuário: joao123
Score de Similaridade: 87.3%
🎉 Excelente correspondência!
```

**Resultado Negativo:**
```
❌ Autenticação Falhou
Usuário: joao123
Score de Similaridade: 42.1%
❌ Correspondência baixa
```

---

## 📊 Entendendo os Scores

### Score de Similaridade

| Score | Interpretação | Status |
|-------|---------------|--------|
| 80% - 100% | 🎉 Excelente correspondência | ✅ Autenticado |
| 60% - 79% | ✔️ Boa correspondência | ✅ Autenticado |
| 40% - 59% | ⚠️ Correspondência moderada | ❌ Não autenticado |
| 0% - 39% | ❌ Correspondência baixa | ❌ Não autenticado |

**Nota:** O threshold exato é configurado na API (geralmente 60%)

---

## 🧪 Cenários de Teste

### Teste 1: Usuário Legítimo
```
1. Cadastrar: user_id = "alice"
2. Verificar: user_id = "alice" (mesma voz)
✅ Esperado: authenticated = true, similarity > 0.7
```

### Teste 2: Voz Diferente
```
1. Cadastrar: user_id = "bob" (Pessoa A grava)
2. Verificar: user_id = "bob" (Pessoa B tenta)
❌ Esperado: authenticated = false, similarity < 0.5
```

### Teste 3: Usuário Não Cadastrado
```
1. Verificar: user_id = "charlie" (sem enrollment)
❌ Esperado: Erro "User not found"
```

### Teste 4: Frase Incorreta
```
1. Cadastrar: Fala "Minha voz é minha identidade"
2. Verificar: Fala "Olá mundo"
❌ Esperado: Erro "Text validation failed"
```

### Teste 5: Ruído de Fundo
```
1. Cadastrar: Ambiente silencioso
2. Verificar: Ambiente barulhento
❌ Esperado: Similarity baixa
```

---

## 💡 Boas Práticas

### ✅ DO (Faça)

1. **Ambiente Silencioso**
   - Grave em local sem ruídos
   - Evite música, TV, conversas ao fundo

2. **Consistência**
   - Use mesmo dispositivo para enrollment e verificação
   - Mantenha distância similar do microfone
   - Fale com tom e velocidade similar

3. **Qualidade do Áudio**
   - Fale claramente
   - Não sussurre ou grite
   - Evite interferências

4. **Testes Sistemáticos**
   - Teste conexão antes de iniciar
   - Anote os User IDs usados
   - Compare scores de diferentes condições

### ❌ DON'T (Não Faça)

1. **Não use caracteres especiais em User ID**
   - ✅ Bom: `user123`, `alice`, `test_01`
   - ❌ Ruim: `user@123`, `joão`, `test#1`

2. **Não fale frase diferente da exibida**
   - API valida o texto falado

3. **Não grave áudio muito curto (< 2s)**
   - Áudio muito curto tem baixa precisão

4. **Não tente cadastrar mesmo User ID duas vezes**
   - API retorna erro "User already exists"

---

## 🔍 Exemplos de Console Logs

### Enrollment Bem-Sucedido
```
🔍 Obtendo frase de desafio...
✅ Frase obtida: { phrase: "Minha voz é minha identidade" }
🎤 Iniciando gravação...
✅ Gravação iniciada
⏹️ Parando gravação...
✅ Gravação salva em: file:///path/to/recording.wav
📤 Enviando enrollment...
User ID: alice
Phrase: Minha voz é minha identidade
Audio File: { uri: "...", type: "audio/wav", name: "recording_1234.wav" }
✅ Enrollment bem-sucedido: { success: true, message: "...", user_id: "alice" }
```

### Verificação com Sucesso
```
🔍 Obtendo frase de desafio...
✅ Frase obtida: { phrase: "A segurança é fundamental" }
📤 Enviando verificação...
✅ Verificação concluída: { 
  authenticated: true, 
  similarity: 0.873,
  user_id: "alice"
}
```

### Erro de Validação
```
📤 Enviando enrollment...
❌ Erro no enrollment: {
  error: "Text validation failed",
  details: "Spoken text does not match expected phrase"
}
```

---

## 📝 Checklist de Teste Completo

### Setup Inicial
- [ ] API está rodando
- [ ] App instalado no dispositivo
- [ ] Permissões concedidas
- [ ] Conexão testada com sucesso

### Teste de Enrollment
- [ ] User ID inserido
- [ ] Frase obtida
- [ ] Áudio gravado (3-5s)
- [ ] Frase pronunciada corretamente
- [ ] Cadastro enviado com sucesso

### Teste de Verificação
- [ ] Mesmo User ID do enrollment
- [ ] Nova frase obtida
- [ ] Áudio gravado com mesma qualidade
- [ ] Verificação bem-sucedida
- [ ] Score > 60%

### Testes Negativos
- [ ] Tentativa com User ID inexistente
- [ ] Tentativa com voz diferente
- [ ] Tentativa com frase incorreta
- [ ] Cadastro duplicado (mesmo User ID)

---

## 🎓 Dicas Avançadas

### Melhorar Precisão
```
1. Cadastre 2-3 amostras do mesmo usuário (se API suportar)
2. Grave em horário similar do dia (voz pode mudar)
3. Use fone de ouvido com microfone (mais consistente)
4. Fale em ritmo natural, não robotizado
```

### Comparar Diferentes Condições
```
Teste A: Ambiente silencioso
Teste B: Com ruído moderado
Teste C: Dispositivo diferente
Teste D: Após 1 hora (voz cansada)

→ Compare os scores de similaridade
```

### Debug de Problemas
```
1. Ative logs detalhados (console.log)
2. Teste frase por frase
3. Verifique formato do áudio
4. Compare URIs dos arquivos gerados
```

---

## 📞 Suporte

Se encontrar problemas:
1. Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Verifique logs do console
3. Teste endpoints da API diretamente (curl/Postman)
4. Verifique se todos os requisitos estão atendidos

---

**Bons testes! 🎤🔐**
