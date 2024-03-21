import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EditarNotasScreen = ({ route, navigation }) => {
  const { nota } = route.params;
  const [estudiante, setEstudiante] = useState(nota.estudiante);
  const [curso, setCurso] = useState(nota.curso);
  const [materia, setMateria] = useState(nota.materia);
  const [periodoAcademico, setPeriodoAcademico] = useState(nota.periodoAcademico);
  const [tipoNota, setTipoNota] = useState(nota.tipoNota);
  const [valorNota, setValorNota] = useState(nota.valorNota.toString());
  const [descripcionNota, setDescripcionNota] = useState(nota.descripcionNota);

  const handleGuardar = async () => {
    const notaModificada = {
      ...nota,
      estudiante,
      curso,
      materia,
      periodoAcademico,
      tipoNota,
      valorNota: parseInt(valorNota),
      descripcionNota,
    };

    try {
      const response = await axios.put(
        `https://localhost:7284/api/notas/${notaModificada.notaId}`,
        notaModificada
      );
      Alert.alert('Éxito', 'Nota actualizada correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
      Alert.alert('Error', 'No se pudo actualizar la nota');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Nota</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Estudiante</Text>
        <TextInput
          style={styles.input}
          value={estudiante}
          onChangeText={setEstudiante}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Curso</Text>
        <TextInput
          style={styles.input}
          value={curso}
          onChangeText={setCurso}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Materia</Text>
        <TextInput
          style={styles.input}
          value={materia}
          onChangeText={setMateria}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Periodo Académico</Text>
        <TextInput
          style={styles.input}
          value={periodoAcademico}
          onChangeText={setPeriodoAcademico}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tipo de Nota</Text>
        <TextInput
          style={styles.input}
          value={tipoNota}
          onChangeText={setTipoNota}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Valor de Nota</Text>
        <TextInput
          style={styles.input}
          value={valorNota}
          onChangeText={setValorNota}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Descripción de la Nota</Text>
        <TextInput
          style={styles.input}
          value={descripcionNota}
          onChangeText={setDescripcionNota}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
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
    color: '#2c3e50',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditarNotasScreen;
