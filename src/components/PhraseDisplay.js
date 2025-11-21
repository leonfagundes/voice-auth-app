import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';

/**
 * Componente para exibir a frase de desafio
 * @param {string} phrase - Frase a ser exibida
 * @param {boolean} loading - Se está carregando
 */
const PhraseDisplay = ({ phrase, loading = false }) => {
  const copyToClipboard = () => {
    if (phrase) {
      Clipboard.setString(phrase);
      alert('Frase copiada!');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando frase...</Text>
      </View>
    );
  }

  if (!phrase) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Frase de Desafio:</Text>
      <View style={styles.phraseContainer}>
        <Text style={styles.phrase}>{phrase}</Text>
      </View>
      <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
        <Text style={styles.copyButtonText}>📋 Copiar Frase</Text>
      </TouchableOpacity>
      <Text style={styles.instruction}>
        ⚠️ Leia a frase acima em voz alta quando gravar
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  phraseContainer: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  phrase: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    lineHeight: 28,
  },
  copyButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  copyButtonText: {
    color: '#666',
    fontSize: 14,
  },
  instruction: {
    fontSize: 12,
    color: '#FF9800',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PhraseDisplay;
