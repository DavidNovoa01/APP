import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';

const AgregarMateriasScreen = ({ navigation }) => {

  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('');

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [departamentoAcademico, setDepartamentoAcademico] = useState('');
  const [nivel, setNivel] = useState('');
  const [creditos, setCreditos] = useState('');
  const [estado, setEstado] = useState('');
  const [notasAdicionales, setNotasAdicionales] = useState('');
  const [metodosEnsenanza, setMetodosEnsenanza] = useState('');
  const [horasTeoricas, setHorasTeoricas] = useState('');
  const [horasPracticas, setHorasPracticas] = useState('');

  const handleGuardarDatos = () => {
    setMensajeExito('');
    setMensajeAdvertencia('');

    if (!nombre || !descripcion || !departamentoAcademico || !nivel || !creditos || !estado || !metodosEnsenanza || !horasTeoricas || !horasPracticas) {
      setMensajeAdvertencia('Todos los campos son obligatorios');
      return;
    }

    const materiaData = {
      Nombre: nombre,
      Descripcion: descripcion,
      DepartamentoAcademico: departamentoAcademico,
      Nivel: nivel,
      Creditos: parseInt(creditos),
      Estado: estado,
      NotasAdicionales: notasAdicionales,
      MetodosEnsenanza: metodosEnsenanza,
      HorasTeoricas: parseInt(horasTeoricas),
      HorasPracticas: parseInt(horasPracticas)
    };

    axios.post('https://localhost:7284/api/materia', materiaData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Materia guardada con éxito:', response.data);
      setMensajeExito('Materia guardada con éxito.');
    })
    .catch((error) => {
      console.error('Error al guardar la materia:', error);
      setMensajeAdvertencia('No se pudo guardar la materia. Verifique los datos e intente nuevamente.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Formulario Materia</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Departamento Académico</Text>
        <Picker
          selectedValue={departamentoAcademico}
          style={styles.picker}
          onValueChange={(itemValue) => setDepartamentoAcademico(itemValue)}
        >
          <Picker.Item label="Idiomas" value="Idiomas" />
          <Picker.Item label="Educación Física" value="Educación Física" />
          <Picker.Item label="Ciencias Sociales" value="Ciencias Sociales" />
          <Picker.Item label="Ciencias Naturales y Matemáticas" value="Ciencias Naturales y Matemáticas" />
          <Picker.Item label="Negocios y Economía" value="Negocios y Economía" />
        </Picker>
      </View>
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Nivel</Text>
        <Picker
          selectedValue={nivel}
          style={styles.picker}
          onValueChange={(itemValue) => setNivel(itemValue)}
        >
          <Picker.Item label="Avanzado" value="Avanzado" />
          <Picker.Item label="Intermedio" value="Intermedio" />
          <Picker.Item label="Básico" value="Básico" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Créditos"
        keyboardType="numeric"
        value={creditos}
        onChangeText={setCreditos}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Notas Adicionales"
        value={notasAdicionales}
        onChangeText={setNotasAdicionales}
      />
      <TextInput
        style={styles.input}
        placeholder="Métodos de Enseñanza"
        value={metodosEnsenanza}
        onChangeText={setMetodosEnsenanza}
      />
      <TextInput
        style={styles.input}
        placeholder="Horas Teóricas"
        keyboardType="numeric"
        value={horasTeoricas}
        onChangeText={setHorasTeoricas}
      />
      <TextInput
        style={styles.input}
        placeholder="Horas Prácticas"
        keyboardType="numeric"
        value={horasPracticas}
        onChangeText={setHorasPracticas}
      />
      <TouchableOpacity onPress={handleGuardarDatos} style={styles.guardarButton}>
        <Text style={styles.buttonText}>Guardar Datos</Text>
      </TouchableOpacity>

      {mensajeExito ? <Text style={styles.mensajeExito}>{mensajeExito}</Text> : null}
      {mensajeAdvertencia ? <Text style={styles.mensajeAdvertencia}>{mensajeAdvertencia}</Text> : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    width: '100%',
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  guardarButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  mensajeExito: {
    color: '#4CAF50', // Un verde más brillante
    fontSize: 18, // Tamaño de fuente más grande
    marginTop: 10,
    fontWeight: 'bold', // Texto en negrita
    padding: 10, // Agregar un poco de relleno
    borderRadius: 5, // Bordes redondeados
    borderWidth: 1, // Borde del mensaje
    borderColor: '#4CAF50', // Color del borde
    backgroundColor: '#E8F5E9', // Fondo más claro para mayor contraste
    textAlign: 'center', // Centrar el texto
  },
  mensajeAdvertencia: {
    color: '#FF5722', // Un naranja más brillante
    fontSize: 18, // Tamaño de fuente más grande
    marginTop: 10,
    fontWeight: 'bold', // Texto en negrita
    padding: 10, // Agregar un poco de relleno
    borderRadius: 5, // Bordes redondeados
    borderWidth: 1, // Borde del mensaje
    borderColor: '#FF5722', // Color del borde
    backgroundColor: '#FFEBEE', // Fondo más claro para mayor contraste
    textAlign: 'center', // Centrar el texto
  },
});

export default AgregarMateriasScreen;


