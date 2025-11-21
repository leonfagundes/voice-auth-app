import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { checkHealth } from '../services/voiceService';
import { API_BASE_URL } from '../config/api';

const HomeScreen = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    const result = await checkHealth();
    setLoading(false);

    if (result.success) {
      setIsConnected(true);
      Alert.alert(
        '✅ Conectado!',
        `API está funcionando!\n\nStatus: ${result.data.status}\nMensagem: ${result.data.message}`,
        [{ text: 'OK' }]
      );
    } else {
      setIsConnected(false);
      Alert.alert(
        '❌ Erro de Conexão',
        `Não foi possível conectar com a API.\n\nErro: ${result.error}\n\nVerifique se a API está rodando em:\n${API_BASE_URL}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎤 Voice Auth App</Text>
          <Text style={styles.subtitle}>
            Teste de Autenticação por Voz
          </Text>
        </View>

        {/* Status da Conexão */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Status da API</Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusIndicator,
                isConnected === true && styles.statusConnected,
                isConnected === false && styles.statusDisconnected,
              ]}
            />
            <Text style={styles.statusText}>
              {isConnected === null
                ? 'Não testado'
                : isConnected
                ? 'Conectado'
                : 'Desconectado'}
            </Text>
          </View>
          <Text style={styles.apiUrl}>{API_BASE_URL}</Text>
        </View>

        {/* Botão de Teste */}
        <TouchableOpacity
          style={[styles.button, styles.testButton]}
          onPress={testConnection}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>🔍 Testar Conexão</Text>
          )}
        </TouchableOpacity>

        {/* Botões de Navegação */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Escolha uma opção:</Text>

          <TouchableOpacity
            style={[styles.button, styles.enrollButton]}
            onPress={() => navigation.navigate('Enrollment')}
          >
            <Text style={styles.buttonText}>👤 Cadastrar Voz</Text>
            <Text style={styles.buttonSubtext}>
              Registre sua voz no sistema
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.verifyButton]}
            onPress={() => navigation.navigate('Verification')}
          >
            <Text style={styles.buttonText}>🔐 Verificar Voz</Text>
            <Text style={styles.buttonSubtext}>
              Autentique-se com sua voz
            </Text>
          </TouchableOpacity>
        </View>

        {/* Instruções */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>📋 Como usar:</Text>
          <Text style={styles.instructionText}>
            1️⃣ Primeiro, teste a conexão com a API
          </Text>
          <Text style={styles.instructionText}>
            2️⃣ Cadastre sua voz (Enrollment)
          </Text>
          <Text style={styles.instructionText}>
            3️⃣ Depois, verifique sua identidade
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#999',
    marginRight: 10,
  },
  statusConnected: {
    backgroundColor: '#4CAF50',
  },
  statusDisconnected: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  apiUrl: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  testButton: {
    backgroundColor: '#9C27B0',
    marginBottom: 30,
  },
  enrollButton: {
    backgroundColor: '#2196F3',
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSubtext: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },
  navigationSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  instructionsCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default HomeScreen;
