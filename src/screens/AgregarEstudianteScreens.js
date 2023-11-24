import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Picker } from 'react-native';

const AgregarEstudianteScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [tipoPersona, setTipoPersona] = useState('');

  const handleGuardarEstudiante = () => {
    console.log('Guardar estudiante con:', nombre, apellido, fechaNacimiento, tipoPersona);
  };
  return (
    <View style={styles.container}>
      <Text>Agregar Estudiante</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />

      <Picker
        selectedValue={tipoPersona}
        style={styles.picker}
        onValueChange={(itemValue) => setTipoPersona(itemValue)}
      >
        <Picker.Item label="Estudiante Nuevo" value="Estudiante Nuevo" />
        <Picker.Item label="Estudiante Antiguo" value="Estudiante Antiguo" />
        <Picker.Item label="Estudiante de Intercambio" value="Estudiante de Intercambio" />
      </Picker>
      <TouchableOpacity onPress={handleGuardarEstudiante} style={styles.guardarButton}>
        <Text>Guardar Estudiante</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    width: 200,
    marginBottom: 10,
  },
  guardarButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AgregarEstudianteScreen;
