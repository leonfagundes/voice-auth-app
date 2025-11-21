import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import EnrollmentScreen from './src/screens/EnrollmentScreen';
import VerificationScreen from './src/screens/VerificationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '🎤 Voice Auth',
            headerStyle: {
              backgroundColor: '#1976D2',
            },
          }}
        />
        <Stack.Screen
          name="Enrollment"
          component={EnrollmentScreen}
          options={{
            title: 'Cadastrar Voz',
            headerStyle: {
              backgroundColor: '#2196F3',
            },
          }}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{
            title: 'Verificar Identidade',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
