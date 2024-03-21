import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegistrarDireccionScreen = ({ route }) => {
  const { acudienteId } = route.params;
  const [calle, setCalle] = useState('');
  const [coloniaBarrio, setColoniaBarrio] = useState('');
  const [ciudadLocalidad, setCiudadLocalidad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [estadoProvincia, setEstadoProvincia] = useState('');
  const [pais, setPais] = useState('');

  const handleGuardarDireccion = async () => {
    const direccionData = {
      Calle: calle,
      ColoniaBarrio: coloniaBarrio,
      CiudadLocalidad: ciudadLocalidad,
      CodigoPostal: codigoPostal,
      EstadoProvincia: estadoProvincia,
      Pais: pais,
      AcudienteId: acudienteId,
    };

    try {
      await axios.post('https://localhost:7284/api/direccionAcudiente', direccionData);
      Alert.alert('Éxito', 'Dirección registrada correctamente');
    } catch (error) {
      console.error('Error al registrar dirección:', error);
      Alert.alert('Error', 'No se pudo registrar la dirección');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Calle"
        value={calle}
        onChangeText={setCalle}
      />
      <TextInput
        style={styles.input}
        placeholder="Colonia/Barrio"
        value={coloniaBarrio}
        onChangeText={setColoniaBarrio}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad/Localidad"
        value={ciudadLocalidad}
        onChangeText={setCiudadLocalidad}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        value={codigoPostal}
        onChangeText={setCodigoPostal}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Estado/Provincia"
        value={estadoProvincia}
        onChangeText={setEstadoProvincia}
      />
      <TextInput
        style={styles.input}
        placeholder="País"
        value={pais}
        onChangeText={setPais}
      />
      <TouchableOpacity style={styles.button} onPress={handleGuardarDireccion}>
        <Text style={styles.buttonText}>Guardar Dirección</Text>
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

export default RegistrarDireccionScreen;
