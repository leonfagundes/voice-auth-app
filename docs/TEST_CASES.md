# 🧪 Exemplos de Testes - Voice Auth App

## 📊 Dados de Teste Recomendados

### User IDs para Testes
```
✅ Bons exemplos:
- user123
- alice
- bob_test
- maria01
- teste_voz

❌ Evite:
- user@123 (caracteres especiais)
- João Silva (espaços e acentos)
- test#1 (símbolos)
```

---

## 🎯 Casos de Teste Detalhados

### Caso 1: Fluxo Completo de Sucesso

**Objetivo:** Verificar que um usuário legítimo é autenticado

**Passos:**
1. **Enrollment**
   - User ID: `alice_test`
   - Obter frase: "Minha voz é minha identidade"
   - Gravar áudio em ambiente silencioso
   - Falar claramente, 3-5 segundos
   - Enviar cadastro

2. **Verificação**
   - User ID: `alice_test` (mesmo do enrollment)
   - Obter nova frase
   - Gravar com mesma voz e condições
   - Enviar verificação

**Resultado Esperado:**
```javascript
{
  authenticated: true,
  similarity: 0.75 - 0.95,
  user_id: "alice_test"
}
```

**Status:** ✅ PASSOU / ❌ FALHOU

**Observações:**
```
Score obtido: _______
Tempo de processamento: _______
Qualidade do áudio: _______
```

---

### Caso 2: Usuário Não Cadastrado

**Objetivo:** Verificar que sistema rejeita usuário sem enrollment

**Passos:**
1. **Pular Enrollment**
2. **Verificação**
   - User ID: `usuario_nao_existe`
   - Tentar verificar

**Resultado Esperado:**
```javascript
{
  success: false,
  error: "User not found"
}
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

### Caso 3: Voz Diferente (Impostor)

**Objetivo:** Verificar que sistema detecta voz diferente

**Passos:**
1. **Enrollment**
   - User ID: `bob_original`
   - Pessoa A grava a voz

2. **Verificação**
   - User ID: `bob_original`
   - Pessoa B (diferente) tenta se autenticar

**Resultado Esperado:**
```javascript
{
  authenticated: false,
  similarity: < 0.5,
  user_id: "bob_original"
}
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

### Caso 4: Frase Incorreta

**Objetivo:** Verificar validação de texto falado

**Passos:**
1. **Enrollment**
   - User ID: `teste_frase`
   - Frase obtida: "Minha voz é minha identidade"
   - Gravar dizendo: "Olá, bom dia" (ERRADO)

**Resultado Esperado:**
```javascript
{
  success: false,
  error: "Text validation failed"
}
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

### Caso 5: Áudio com Ruído

**Objetivo:** Testar robustez em condições adversas

**Passos:**
1. **Enrollment**
   - User ID: `teste_ruido`
   - Gravar em ambiente silencioso
   - Cadastrar com sucesso

2. **Verificação**
   - User ID: `teste_ruido`
   - Gravar com música/TV ao fundo (ruído moderado)

**Resultado Esperado:**
```javascript
{
  authenticated: false ou true (depende do ruído),
  similarity: reduzida (0.4 - 0.7)
}
```

**Observações:**
```
Score sem ruído: _______
Score com ruído: _______
Diferença: _______
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

### Caso 6: Cadastro Duplicado

**Objetivo:** Verificar que não permite duplicar user_id

**Passos:**
1. **Enrollment 1**
   - User ID: `usuario_duplicado`
   - Cadastrar com sucesso

2. **Enrollment 2**
   - User ID: `usuario_duplicado` (mesmo)
   - Tentar cadastrar novamente

**Resultado Esperado:**
```javascript
{
  success: false,
  error: "User already exists"
}
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

### Caso 7: Múltiplas Verificações

**Objetivo:** Testar consistência em verificações sucessivas

**Passos:**
1. **Enrollment**
   - User ID: `teste_multiplo`
   - Cadastrar

2. **Verificação 1**
   - Mesmo user_id
   - Anotar score

3. **Verificação 2**
   - Mesmo user_id
   - Anotar score

4. **Verificação 3**
   - Mesmo user_id
   - Anotar score

**Resultado Esperado:**
```
Scores devem ser similares (± 0.1 de variação)
```

**Observações:**
```
Score 1: _______
Score 2: _______
Score 3: _______
Média: _______
Desvio: _______
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

### Caso 8: Áudio Muito Curto

**Objetivo:** Testar validação de duração mínima

**Passos:**
1. **Enrollment**
   - User ID: `teste_curto`
   - Gravar áudio de apenas 1 segundo
   - Falar apenas "Minha voz"

**Resultado Esperado:**
```javascript
{
  success: false,
  error: "Audio too short" ou "Text validation failed"
}
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

### Caso 9: Áudio Muito Longo

**Objetivo:** Verificar limite máximo (10s no app)

**Passos:**
1. **Enrollment**
   - User ID: `teste_longo`
   - Gravar por 10+ segundos (app deve cortar)
   - Verificar se processa corretamente

**Resultado Esperado:**
```
Áudio cortado em 10s automaticamente
Enrollment bem-sucedido
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

### Caso 10: Diferentes Dispositivos

**Objetivo:** Testar compatibilidade entre dispositivos

**Passos:**
1. **Enrollment**
   - User ID: `teste_dispositivo`
   - Dispositivo A (ex: iPhone)
   - Cadastrar

2. **Verificação**
   - User ID: `teste_dispositivo`
   - Dispositivo B (ex: Android)
   - Mesma pessoa, dispositivo diferente

**Resultado Esperado:**
```
Similarity pode ser um pouco menor, mas ainda > 0.6
```

**Observações:**
```
Dispositivo A: _______
Dispositivo B: _______
Score obtido: _______
```

**Status:** ✅ PASSOU / ❌ FALHOU

---

## 📊 Template de Relatório de Testes

```markdown
# Relatório de Testes - Voice Auth App

**Data:** ___/___/______
**Testador:** _______________
**Versão do App:** _______________
**IP da API:** _______________

## Ambiente de Teste
- Dispositivo: _______________
- Sistema Operacional: _______________
- Rede Wi-Fi: _______________
- Condições de ruído: _______________

## Resultados

| Caso | Descrição | Status | Score | Observações |
|------|-----------|--------|-------|-------------|
| 1 | Fluxo completo | ✅/❌ | ____ | |
| 2 | Usuário não cadastrado | ✅/❌ | N/A | |
| 3 | Voz diferente | ✅/❌ | ____ | |
| 4 | Frase incorreta | ✅/❌ | N/A | |
| 5 | Áudio com ruído | ✅/❌ | ____ | |
| 6 | Cadastro duplicado | ✅/❌ | N/A | |
| 7 | Múltiplas verificações | ✅/❌ | ____ | |
| 8 | Áudio muito curto | ✅/❌ | N/A | |
| 9 | Áudio muito longo | ✅/❌ | ____ | |
| 10 | Diferentes dispositivos | ✅/❌ | ____ | |

## Resumo
- Total de casos: 10
- Passou: _____
- Falhou: _____
- Taxa de sucesso: _____%

## Problemas Encontrados
1. _______________
2. _______________
3. _______________

## Observações Gerais
_______________________________________________
_______________________________________________
_______________________________________________
```

---

## 🎯 Métricas de Sucesso

### Enrollment
- ✅ Tempo de processamento: < 15 segundos
- ✅ Taxa de sucesso: > 95%
- ✅ Erros de validação claros

### Verificação
- ✅ Tempo de processamento: < 10 segundos
- ✅ Taxa de acerto (usuário legítimo): > 90%
- ✅ Taxa de rejeição (impostor): > 85%
- ✅ Similarity score consistente (± 0.1)

---

## 🔍 Checklist de Testes de Aceitação

### Funcionalidade Básica
- [ ] App abre sem erros
- [ ] Conexão com API funciona
- [ ] Permissão de microfone solicitada
- [ ] Navegação entre telas funciona
- [ ] Botões respondem aos toques

### Enrollment
- [ ] Campo User ID aceita entrada
- [ ] Botão "Obter Frase" retorna frase
- [ ] Frase é exibida corretamente
- [ ] Gravação de áudio funciona
- [ ] Indicador visual de gravação aparece
- [ ] Botão para/pausar funciona
- [ ] Áudio pode ser reproduzido (opcional)
- [ ] Envio de cadastro funciona
- [ ] Mensagem de sucesso/erro é clara

### Verificação
- [ ] Fluxo similar ao enrollment funciona
- [ ] Resultado é exibido claramente
- [ ] Score de similaridade aparece
- [ ] Barra de progresso funciona
- [ ] Mensagem de autenticado/não autenticado clara
- [ ] Botão "Nova Verificação" limpa formulário

### Validações
- [ ] User ID vazio é rejeitado
- [ ] Frase obrigatória antes de gravar
- [ ] Áudio obrigatório antes de enviar
- [ ] Erros da API são tratados
- [ ] Loading indicators aparecem

### UI/UX
- [ ] Interface é intuitiva
- [ ] Textos são legíveis
- [ ] Cores adequadas (azul/verde/vermelho)
- [ ] Feedback visual claro
- [ ] Responsivo em diferentes telas

---

## 💾 Salvar Resultados

Após executar os testes, salve:
1. Screenshots de sucessos e erros
2. Logs do console
3. Scores obtidos
4. Relatório preenchido
5. Observações de comportamento

---

**Bons testes! 🧪**
