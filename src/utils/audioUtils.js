import { Audio } from 'expo-av';

/**
 * Solicita permissões de áudio
 * @returns {Promise<boolean>} True se permissão concedida
 */
export const requestAudioPermissions = async () => {
  try {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de microfone negada. Habilite nas configurações do app.');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Erro ao solicitar permissão:', error);
    return false;
  }
};

/**
 * Configurações de gravação de áudio
 * Configuração para garantir compatibilidade entre iOS e Android
 * Ambos usarão Linear PCM em formato WAV
 */
export const getRecordingOptions = () => {
  return {
    android: {
      extension: '.wav',
      // Usar MPEG_4 permite configuração de encoder específico
      outputFormat: Audio.AndroidOutputFormat.MPEG_4,
      // AAC é mais compatível que DEFAULT para conversão posterior
      audioEncoder: Audio.AndroidAudioEncoder.AAC,
      sampleRate: 16000, // Mesma taxa do iOS
      numberOfChannels: 1, // Mono, igual ao iOS
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: 'audio/webm',
      bitsPerSecond: 128000,
    },
  };
};

/**
 * Formata duração em segundos para mm:ss
 * @param {number} seconds - Segundos
 * @returns {string} Tempo formatado
 */
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
