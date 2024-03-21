import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const EditarMateriaScreen = ({ route, navigation }) => {
  const { materia, onGuardarCambios } = route.params;

  const [nombre, setNombre] = useState(materia.nombre);
  const [descripcion, setDescripcion] = useState(materia.descripcion);
  const [departamentoAcademico, setDepartamentoAcademico] = useState(materia.departamentoAcademico);
  const [nivel, setNivel] = useState(materia.nivel);
  const [creditos, setCreditos] = useState(materia.creditos.toString());
  const [estado, setEstado] = useState(materia.estado);
  const [notasAdicionales, setNotasAdicionales] = useState(materia.notasAdicionales);
  const [metodosEnsenanza, setMetodosEnsenanza] = useState(materia.metodosEnsenanza);
  const [horasTeoricas, setHorasTeoricas] = useState(materia.horasTeoricas.toString());
  const [horasPracticas, setHorasPracticas] = useState(materia.horasPracticas.toString());

  const guardarCambios = () => {
    const materiaModificada = {
      ...materia,
      nombre,
      descripcion,
      departamentoAcademico,
      nivel,
      creditos: parseInt(creditos),
      estado,
      notasAdicionales,
      metodosEnsenanza,
      horasTeoricas: parseInt(horasTeoricas),
      horasPracticas: parseInt(horasPracticas),
    };

    onGuardarCambios(materiaModificada);
    navigation.navigate('ListaMateriasScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Materia</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
      <TextInput style={styles.input} placeholder="Departamento Académico" value={departamentoAcademico} onChangeText={setDepartamentoAcademico} />
      <TextInput style={styles.input} placeholder="Nivel" value={nivel} onChangeText={setNivel} />
      <TextInput style={styles.input} placeholder="Créditos" value={creditos} onChangeText={setCreditos} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} />
      <TextInput style={styles.input} placeholder="Notas Adicionales" value={notasAdicionales} onChangeText={setNotasAdicionales} />
      <TextInput style={styles.input} placeholder="Métodos de Enseñanza" value={metodosEnsenanza} onChangeText={setMetodosEnsenanza} />
      <TextInput style={styles.input} placeholder="Horas Teóricas" value={horasTeoricas} onChangeText={setHorasTeoricas} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Horas Prácticas" value={horasPracticas} onChangeText={setHorasPracticas} keyboardType="numeric" />
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

export default EditarMateriaScreen;
