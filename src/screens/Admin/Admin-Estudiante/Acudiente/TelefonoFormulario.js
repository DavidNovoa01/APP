import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, TouchableWithoutFeedback, Keyboard } from 'react-native';

const TelefonoFormulario = ({ navigation }) => {
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  const [indicativo, setIndicativo] = useState('');

  const handleGuardarTelefono = () => {
    // Realizar validaciones antes de guardar
    if (!numero || !tipo || !indicativo) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Validar que el tipo de teléfono sea válido (puedes ajustar esta condición según tus necesidades)
    if (tipo !== 'Celular' && tipo !== 'Fijo') {
      alert('Tipo de teléfono no válido');
      return;
    }

    console.log('Guardar teléfono con:', numero, tipo, indicativo);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Número"
          keyboardType="numeric"
          value={numero}
          onChangeText={setNumero}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo"
          value={tipo}
          onChangeText={setTipo}
        />
        <TextInput
          style={styles.input}
          placeholder="Indicativo"
          value={indicativo}
          onChangeText={setIndicativo}
        />
        <TouchableOpacity onPress={handleGuardarTelefono} style={styles.guardarButton}>
          <Text style={styles.buttonText}>Guardar Teléfono</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TelefonoFormulario;

