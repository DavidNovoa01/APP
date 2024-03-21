import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Picker } from 'react-native';
import axios from 'axios';

const ObservarNotasScreen = () => {
  const [notas, setNotas] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');
  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');

  useEffect(() => {
    fetchNotas();
    fetchMaterias();
    fetchCursos();
  }, []);

  const fetchNotas = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/notas');
      setNotas(response.data);
    } catch (error) {
      console.error('Error al obtener Notas', error);
    }
  };

  const fetchMaterias = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/materia');
      setMaterias(response.data.map((materia) => materia.nombre));
    } catch (error) {
      console.error('Error al obtener Materias', error);
    }
  };

  const fetchCursos = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/cursos');
      setCursos(response.data.map((curso) => curso.codigoCurso));
    } catch (error) {
      console.error('Error al obtener Cursos', error);
    }
  };

  const keyExtractor = (item, index) => {
    return item && item.notaId ? item.notaId.toString() : index.toString();
  };

  const renderNotaInfo = (label, value) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const renderNota = ({ item }) => (
    <View style={styles.notaContainer}>
      {renderNotaInfo("Estudiante: ", item.estudiante)}
      {renderNotaInfo("Curso: ", item.curso)}
      {renderNotaInfo("Materia: ", item.materia)}
      {renderNotaInfo("Período Académico: ", item.periodoAcademico)}
      {renderNotaInfo("Valor de Nota: ", item.valorNota.toString())}
      {renderNotaInfo("Tipo de Nota: ", item.tipoNota)}
      {renderNotaInfo("Descripción de la Nota: ", item.descripcionNota)}
    </View>
  );

  const filteredNotas = notas.filter((nota) => {
    return (
      (periodoSeleccionado ? nota.periodoAcademico === periodoSeleccionado : true) &&
      (materiaSeleccionada ? nota.materia === materiaSeleccionada : true) &&
      (cursoSeleccionado ? nota.curso === cursoSeleccionado : true)
    );
  });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={periodoSeleccionado}
        onValueChange={(itemValue) => setPeriodoSeleccionado(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un período" value="" />
        <Picker.Item label="Primer Periodo" value="Primer Periodo" />
        <Picker.Item label="Segundo Periodo" value="Segundo Periodo" />
        <Picker.Item label="Tercer Periodo" value="Tercer Periodo" />
        <Picker.Item label="Cuarto Periodo" value="Cuarto Periodo" />
      </Picker>

      <Picker
        selectedValue={materiaSeleccionada}
        onValueChange={(itemValue) => setMateriaSeleccionada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione una materia" value="" />
        {materias.map((materia, index) => (
          <Picker.Item key={index} label={materia} value={materia} />
        ))}
      </Picker>

      <Picker
        selectedValue={cursoSeleccionado}
        onValueChange={(itemValue) => setCursoSeleccionado(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un curso" value="" />
        {cursos.map((codigoCurso, index) => (
          <Picker.Item key={index} label={codigoCurso} value={codigoCurso} />
        ))}
      </Picker>

      <FlatList
        data={filteredNotas}
        keyExtractor={keyExtractor}
        renderItem={renderNota}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  notaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  value: {
    color: '#34495e',
    flex: 2,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default ObservarNotasScreen;



