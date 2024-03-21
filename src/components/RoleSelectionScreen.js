import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';

const RoleSelectionScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
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
          <TouchableOpacity onPress={() => navigateToLogin('Docente')} style={styles.optionButton}>
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',  // o 'white'
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  advertisement: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#3498db',
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
