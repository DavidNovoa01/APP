import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegistrarTelefonoScreen = ({ route }) => {
  const { acudienteId } = route.params;
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  const [indicativo, setIndicativo] = useState('');

  const handleGuardarTelefono = async () => {
    const telefonoData = {
      Numero: numero,
      Tipo: tipo,
      Indicativo: indicativo,
      AcudienteId: acudienteId,
    };

    try {
      await axios.post('https://localhost:7284/api/telefonoAcudiente', telefonoData);
      Alert.alert('Éxito', 'Teléfono registrado correctamente');
    } catch (error) {
      console.error('Error al registrar teléfono:', error);
      Alert.alert('Error', 'No se pudo registrar el teléfono');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo (ej: móvil, fijo)"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Indicativo (ej: +57)"
        value={indicativo}
        onChangeText={setIndicativo}
      />
      <TouchableOpacity style={styles.button} onPress={handleGuardarTelefono}>
        <Text style={styles.buttonText}>Guardar Teléfono</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrarTelefonoScreen;
