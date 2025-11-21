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
import { getChallengePhrase, enrollVoice } from '../services/voiceService';

const EnrollmentScreen = () => {
  const [userId, setUserId] = useState('');
  const [phrase, setPhrase] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  const handleGetPhrase = async () => {
    setLoadingPhrase(true);
    setEnrollmentSuccess(false);
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

  const handleEnroll = async () => {
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
      Alert.alert('Atenção', 'Por favor, grave seu áudio antes de enviar.');
      return;
    }

    setLoading(true);
    const result = await enrollVoice(userId.trim(), phrase, audioFile);
    setLoading(false);

    if (result.success) {
      setEnrollmentSuccess(true);
      Alert.alert(
        '✅ Sucesso!',
        `Voz cadastrada com sucesso!\n\nUsuário: ${result.data.user_id}\n\n${result.data.message}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpar formulário
              setUserId('');
              setPhrase('');
              setAudioFile(null);
              setEnrollmentSuccess(false);
            },
          },
        ]
      );
    } else {
      Alert.alert(
        '❌ Erro no Cadastro',
        result.error,
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpar apenas o áudio para tentar novamente
              setAudioFile(null);
            },
          },
        ]
      );
    }
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
            <Text style={styles.title}>👤 Cadastrar Voz</Text>
            <Text style={styles.subtitle}>
              Registre sua voz no sistema de autenticação
            </Text>
          </View>

          {/* Passo 1: User ID */}
          <View style={styles.section}>
            <Text style={styles.stepNumber}>1️⃣ Passo 1</Text>
            <Text style={styles.sectionTitle}>Identificação</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu User ID (ex: user123)"
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

          {/* Passo 4: Enviar */}
          {phrase && audioFile && (
            <View style={styles.section}>
              <Text style={styles.stepNumber}>4️⃣ Passo 4</Text>
              <Text style={styles.sectionTitle}>Enviar Cadastro</Text>
              <TouchableOpacity
                style={[styles.button, styles.enrollButton]}
                onPress={handleEnroll}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>🚀 Cadastrar Voz</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Mensagem de Sucesso */}
          {enrollmentSuccess && (
            <View style={styles.successCard}>
              <Text style={styles.successIcon}>✅</Text>
              <Text style={styles.successText}>
                Voz cadastrada com sucesso!
              </Text>
              <Text style={styles.successSubtext}>
                Agora você pode verificar sua identidade
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
    color: '#2196F3',
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
  enrollButton: {
    backgroundColor: '#4CAF50',
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
  successCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 14,
    color: '#666',
  },
});

export default EnrollmentScreen;
