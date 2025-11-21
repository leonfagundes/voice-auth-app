import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import PhraseDisplay from '../components/PhraseDisplay';
import ResultDisplay from '../components/ResultDisplay';
import { getChallengePhrase, verifyVoice } from '../services/voiceService';

const VerificationScreen = () => {
  const [userId, setUserId] = useState('');
  const [phrase, setPhrase] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleGetPhrase = async () => {
    setLoadingPhrase(true);
    setVerificationResult(null);
    const result = await getChallengePhrase();
    setLoadingPhrase(false);

    if (result.success) {
      setPhrase(result.phrase);
    } else {
      Alert.alert('Erro', result.error);
    }
  };

  const handleRecordingComplete = (file) => {
    console.log('Gravação completa:', file);
    setAudioFile(file);
  };

  const handleVerify = async () => {
    // Validações
    if (!userId.trim()) {
      Alert.alert('Atenção', 'Por favor, insira um User ID.');
      return;
    }

    if (!phrase) {
      Alert.alert('Atenção', 'Por favor, obtenha uma frase de desafio primeiro.');
      return;
    }

    if (!audioFile) {
      Alert.alert('Atenção', 'Por favor, grave seu áudio antes de verificar.');
      return;
    }

    setLoading(true);
    setVerificationResult(null);
    const result = await verifyVoice(userId.trim(), phrase, audioFile);
    setLoading(false);

    if (result.success) {
      setVerificationResult({
        authenticated: result.data.authenticated,
        similarity: result.data.similarity,
        userId: result.data.user_id,
      });

      // Limpar áudio para nova tentativa
      setAudioFile(null);
    } else {
      Alert.alert('❌ Erro na Verificação', result.error, [
        {
          text: 'OK',
          onPress: () => {
            setAudioFile(null);
          },
        },
      ]);
    }
  };

  const resetForm = () => {
    setUserId('');
    setPhrase('');
    setAudioFile(null);
    setVerificationResult(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🔐 Verificar Voz</Text>
            <Text style={styles.subtitle}>
              Autentique-se usando sua voz
            </Text>
          </View>

          {/* Passo 1: User ID */}
          <View style={styles.section}>
            <Text style={styles.stepNumber}>1️⃣ Passo 1</Text>
            <Text style={styles.sectionTitle}>Identificação</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu User ID"
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Passo 2: Obter Frase */}
          <View style={styles.section}>
            <Text style={styles.stepNumber}>2️⃣ Passo 2</Text>
            <Text style={styles.sectionTitle}>Obter Frase de Desafio</Text>
            <TouchableOpacity
              style={[styles.button, styles.phraseButton]}
              onPress={handleGetPhrase}
              disabled={loadingPhrase}
            >
              {loadingPhrase ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>📝 Obter Frase</Text>
              )}
            </TouchableOpacity>

            <PhraseDisplay phrase={phrase} loading={loadingPhrase} />
          </View>

          {/* Passo 3: Gravar Áudio */}
          {phrase && (
            <View style={styles.section}>
              <Text style={styles.stepNumber}>3️⃣ Passo 3</Text>
              <Text style={styles.sectionTitle}>Gravar sua Voz</Text>
              <AudioRecorder
                onRecordingComplete={handleRecordingComplete}
                maxDuration={10}
              />
              {audioFile && (
                <View style={styles.audioInfo}>
                  <Text style={styles.audioInfoText}>
                    ✅ Áudio gravado ({audioFile.duration}s)
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Passo 4: Verificar */}
          {phrase && audioFile && (
            <View style={styles.section}>
              <Text style={styles.stepNumber}>4️⃣ Passo 4</Text>
              <Text style={styles.sectionTitle}>Verificar Identidade</Text>
              <TouchableOpacity
                style={[styles.button, styles.verifyButton]}
                onPress={handleVerify}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>🔍 Verificar Identidade</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Resultado da Verificação */}
          {verificationResult && (
            <View style={styles.section}>
              <Text style={styles.stepNumber}>📊 Resultado</Text>
              <ResultDisplay
                authenticated={verificationResult.authenticated}
                similarity={verificationResult.similarity}
                userId={verificationResult.userId}
              />

              <TouchableOpacity
                style={[styles.button, styles.resetButton]}
                onPress={resetForm}
              >
                <Text style={styles.buttonText}>🔄 Nova Verificação</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Dica */}
          {!verificationResult && (
            <View style={styles.tipCard}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipTitle}>Dica:</Text>
              <Text style={styles.tipText}>
                Certifique-se de que sua voz já foi cadastrada antes de tentar
                a verificação.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  phraseButton: {
    backgroundColor: '#2196F3',
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#9C27B0',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  audioInfo: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  audioInfoText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
});

export default VerificationScreen;
