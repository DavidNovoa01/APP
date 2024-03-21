import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const DireccionFormulario = ({ navigation }) => {
  const [pais, setPais] = useState('');
  const [barrio, setBarrio] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [localidad, setLocalidad] = useState('');

  const handleGuardarDireccion = () => {
    // Realizar validaciones antes de guardar
    if (!pais || !barrio || !codigoPostal || !localidad) {
      alert('Todos los campos son obligatorios');
      return;
    }

    console.log('Guardar dirección con:', pais, barrio, codigoPostal, localidad);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 20,
      marginBottom: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
      width: '100%',
    },
    guardarButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="País"
        value={pais}
        onChangeText={setPais}
      />
      <TextInput
        style={styles.input}
        placeholder="Barrio"
        value={barrio}
        onChangeText={setBarrio}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        keyboardType="numeric"
        value={codigoPostal}
        onChangeText={setCodigoPostal}
      />
      <TextInput
        style={styles.input}
        placeholder="Localidad"
        value={localidad}
        onChangeText={setLocalidad}
      />
      <TouchableOpacity onPress={handleGuardarDireccion} style={styles.guardarButton}>
        <Text style={styles.buttonText}>Guardar Dirección</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DireccionFormulario;
