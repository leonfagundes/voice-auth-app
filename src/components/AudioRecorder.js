import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { requestAudioPermissions, getRecordingOptions, formatDuration } from '../utils/audioUtils';

/**
 * Componente para gravação de áudio
 * @param {Function} onRecordingComplete - Callback quando gravação terminar
 * @param {number} maxDuration - Duração máxima em segundos (padrão: 10)
 */
const AudioRecorder = ({ onRecordingComplete, maxDuration = 10 }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    return () => {
      // Cleanup ao desmontar
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Atualiza duração durante gravação
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => {
          const newDuration = prev + 1;
          if (newDuration >= maxDuration) {
            stopRecording();
          }
          return newDuration;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      // Solicitar permissões
      const hasPermission = await requestAudioPermissions();
      if (!hasPermission) {
        return;
      }

      // Configurar modo de áudio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('🎤 Iniciando gravação...');
      const { recording } = await Audio.Recording.createAsync(
        getRecordingOptions()
      );

      setRecording(recording);
      setIsRecording(true);
      setDuration(0);
      console.log('✅ Gravação iniciada');
    } catch (error) {
      console.error('❌ Erro ao iniciar gravação:', error);
      Alert.alert('Erro', 'Não foi possível iniciar a gravação.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      console.log('⏹️ Parando gravação...');
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      
      const uri = recording.getURI();
      console.log('✅ Gravação salva em:', uri);

      // Callback com informações do arquivo
      if (onRecordingComplete) {
        onRecordingComplete({
          uri,
          duration,
          type: 'audio/wav',
          name: `recording_${Date.now()}.wav`,
        });
      }

      setRecording(null);
      setDuration(0);
    } catch (error) {
      console.error('❌ Erro ao parar gravação:', error);
      Alert.alert('Erro', 'Não foi possível parar a gravação.');
    }
  };

  const playRecording = async () => {
    if (!recording) return;

    try {
      const uri = recording.getURI();
      console.log('▶️ Reproduzindo áudio...');
      
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      await sound.playAsync();
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
          setSound(null);
        }
      });
    } catch (error) {
      console.error('❌ Erro ao reproduzir:', error);
      Alert.alert('Erro', 'Não foi possível reproduzir o áudio.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, isRecording && styles.statusRecording]} />
        <Text style={styles.statusText}>
          {isRecording ? 'Gravando...' : 'Pronto para gravar'}
        </Text>
      </View>

      {isRecording && (
        <Text style={styles.durationText}>
          {formatDuration(duration)} / {formatDuration(maxDuration)}
        </Text>
      )}

      {!isRecording && duration > 0 && (
        <Text style={styles.infoText}>
          Gravação concluída: {formatDuration(duration)}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        {!isRecording ? (
          <TouchableOpacity
            style={[styles.button, styles.recordButton]}
            onPress={startRecording}
          >
            <Text style={styles.buttonText}>🎤 Gravar Áudio</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={stopRecording}
          >
            <Text style={styles.buttonText}>⏹️ Parar Gravação</Text>
          </TouchableOpacity>
        )}
      </View>

      {duration > 0 && !isRecording && recording && (
        <TouchableOpacity
          style={[styles.button, styles.playButton]}
          onPress={playRecording}
        >
          <Text style={styles.buttonText}>▶️ Ouvir Gravação</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  statusRecording: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  durationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  recordButton: {
    backgroundColor: '#2196F3',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  playButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AudioRecorder;
