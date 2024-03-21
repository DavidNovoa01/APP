import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const EditarCursoScreen = ({ route, navigation }) => {
  const { curso, onGuardarCambios } = route.params;

  const [codigoCurso, setCodigoCurso] = useState(curso.codigoCurso);
  const [descripcion, setDescripcion] = useState(curso.descripcion);
  const [departamentoAcademico, setDepartamentoAcademico] = useState(curso.departamentoAcademico);
  const [nivel, setNivel] = useState(curso.nivel);
  const [metodosEnsenanza, setMetodosEnsenanza] = useState(curso.metodosEnsenanza);
  const [año, setAño] = useState(curso.año.toString());
  const [cupoMaximo, setCupoMaximo] = useState(curso.cupoMaximo.toString());
  const [cupoActual, setCupoActual] = useState(curso.cupoActual.toString());
  const [estado, setEstado] = useState(curso.estado);
  const [modalidad, setModalidad] = useState(curso.modalidad);

  const guardarCambios = () => {
    const cursoModificado = {
      ...curso,
      codigoCurso,
      descripcion,
      departamentoAcademico,
      nivel,
      metodosEnsenanza,
      año: parseInt(año),
      cupoMaximo: parseInt(cupoMaximo),
      cupoActual: parseInt(cupoActual),
      estado,
      modalidad,
    };

    onGuardarCambios(cursoModificado);
    navigation.navigate('ListaCursosScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Curso</Text>
      <TextInput style={styles.input} placeholder="Código del Curso" value={codigoCurso} onChangeText={setCodigoCurso} />
      <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
      <TextInput style={styles.input} placeholder="Departamento Académico" value={departamentoAcademico} onChangeText={setDepartamentoAcademico} />
      <TextInput style={styles.input} placeholder="Nivel" value={nivel} onChangeText={setNivel} />
      <TextInput style={styles.input} placeholder="Métodos de Enseñanza" value={metodosEnsenanza} onChangeText={setMetodosEnsenanza} />
      <TextInput style={styles.input} placeholder="Año" value={año} onChangeText={setAño} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Cupo Máximo" value={cupoMaximo} onChangeText={setCupoMaximo} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Cupo Actual" value={cupoActual} onChangeText={setCupoActual} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} />
      <TextInput style={styles.input} placeholder="Modalidad" value={modalidad} onChangeText={setModalidad} />
      <Button title="Guardar Cambios" onPress={guardarCambios} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default EditarCursoScreen;
