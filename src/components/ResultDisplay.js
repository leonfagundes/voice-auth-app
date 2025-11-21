import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Componente para exibir resultado da verificação
 * @param {boolean} authenticated - Se foi autenticado
 * @param {number} similarity - Score de similaridade (0-1)
 * @param {string} userId - ID do usuário
 */
const ResultDisplay = ({ authenticated, similarity, userId }) => {
  if (authenticated === null || authenticated === undefined) {
    return null;
  }

  const similarityPercentage = (similarity * 100).toFixed(1);
  const progressWidth = `${similarityPercentage}%`;

  return (
    <View style={[styles.container, authenticated ? styles.success : styles.failure]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{authenticated ? '✅' : '❌'}</Text>
      </View>

      <Text style={styles.title}>
        {authenticated ? 'Autenticado com Sucesso!' : 'Autenticação Falhou'}
      </Text>

      {userId && (
        <Text style={styles.userId}>Usuário: {userId}</Text>
      )}

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score de Similaridade:</Text>
        <Text style={styles.scoreValue}>{similarityPercentage}%</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: progressWidth },
            authenticated ? styles.progressSuccess : styles.progressFailure,
          ]}
        />
      </View>

      <Text style={styles.interpretation}>
        {similarity >= 0.8
          ? '🎉 Excelente correspondência!'
          : similarity >= 0.6
          ? '✔️ Boa correspondência'
          : similarity >= 0.4
          ? '⚠️ Correspondência moderada'
          : '❌ Correspondência baixa'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    borderWidth: 3,
  },
  success: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  failure: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  userId: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  scoreContainer: {
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  progressSuccess: {
    backgroundColor: '#4CAF50',
  },
  progressFailure: {
    backgroundColor: '#F44336',
  },
  interpretation: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    marginTop: 5,
  },
});

export default ResultDisplay;
