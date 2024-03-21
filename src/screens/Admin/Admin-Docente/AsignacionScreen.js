import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const AsignacionScreen = ({ route }) => {
  const { docenteId } = route.params;
  const [aulas, setAulas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [horarios, setHorarios] = useState([]);

  // Funciones para asignar aulas, cursos, materias y horarios
  const assignAula = async (docenteId, aulaId) => {
    await axios.put(`https://localhost:7284/api/docente/${docenteId}/aula/${aulaId}`);
    // Actualizar la UI según sea necesario
  };

  const assignCurso = async (docenteId,cursoId) => {
    await axios.put(`https://localhost:7284/api/docente/${docenteId}/cursos`,[cursoId]);
    // Actualizar la UI según sea necesario
  };

  const assignMaterias = async (docenteId, materiaIds) => {
    await axios.put(`https://localhost:7284/api/docente/${docenteId}/materias`,{materiaIds});
    // Actualizar la UI según sea necesario
};


  const assignHorario = async (docenteId,horarioId) => {
    await axios.put(`https://localhost:7284/api/docente/${docenteId}/horario/${horarioId}`);
    // Actualizar la UI según sea necesario
  };

  // Funciones para obtener las listas de aulas, cursos, materias y horarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aulasResponse = await axios.get('https://localhost:7284/api/aula');
        setAulas(aulasResponse.data);
        const cursosResponse = await axios.get('https://localhost:7284/api/cursos');
        setCursos(cursosResponse.data);
        const materiasResponse = await axios.get('https://localhost:7284/api/materia');
        setMaterias(materiasResponse.data);
        const horariosResponse = await axios.get('https://localhost:7284/api/horario');
        setHorarios(horariosResponse.data);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    };
    fetchData();
  }, []);

  // Renderizar las opciones de aulas, cursos, materias y horarios
  const renderItem = (item, assignFunction, itemType) => (
    <TouchableOpacity
        style={styles.item}
        onPress={() => {
            switch (itemType) {
                case 'materia':
                    assignMaterias(docenteId, [item.id]);
                    break;
                case 'curso':
                    assignCurso(docenteId, item.id);
                    break;
                case 'horario':
                    assignHorario(docenteId, item.id);
                    break;
                case 'aula':
                    assignAula(docenteId, item.id);
                    break;
                default:
                    assignFunction(item.id);
                    break;
            }
        }}>
        <Text>
            {itemType === 'materia' && item.nombre}
            {itemType === 'curso' && item.descripcion}
            {itemType === 'horario' && item.diaSemana}
            {itemType === 'aula' && item.nombreNumero}
        </Text>
    </TouchableOpacity>
);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Aulas:</Text>
      <FlatList
        data={aulas}
        renderItem={({ item }) => renderItem(item, assignAula, 'aula')}
        keyExtractor={(item) => item?.id?.toString() ?? 'default-key-aula'}
      />
      <Text style={styles.title}>Asignar Cursos:</Text>
      <FlatList
        data={cursos}
        renderItem={({ item }) => renderItem(item, assignCurso, 'curso')}
        keyExtractor={(item) => item?.id?.toString() ?? 'default-key-curso'}
      />
      <Text style={styles.title}>Asignar Materias:</Text>
    <FlatList
        data={materias}
        renderItem={({ item }) => renderItem(item, assignMaterias,'materia')}
        keyExtractor={(item) => item?.id?.toString() ?? 'default-key-materia'}
    />
      <Text style={styles.title}>Asignar Horarios:</Text>
      <FlatList
        data={horarios}
        renderItem={({ item }) => renderItem(item, assignHorario, 'horario')}
        keyExtractor={(item) => item?.id?.toString() ?? `default-key-horario`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default AsignacionScreen;
