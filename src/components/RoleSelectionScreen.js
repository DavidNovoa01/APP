import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';

const RoleSelectionScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const navigateToLogin = (role) => {
    navigation.navigate('Login', { role });
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
          <Text style={styles.advertisement}>¿Eres?</Text>
          <TouchableOpacity onPress={() => navigateToLogin('Estudiante')} style={styles.optionButton}>
            <Text style={styles.optionText}>Estudiante</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToLogin('Maestro')} style={styles.optionButton}>
            <Text style={styles.optionText}>Maestro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToLogin('Administrador')} style={styles.optionButton}>
            <Text style={styles.optionText}>Administrador</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'linear-gradient(to bottom, #3498db, #2ecc71)', // Cambia estos colores según tus preferencias
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  advertisement: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoleSelectionScreen;
