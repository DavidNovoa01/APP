import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

const AsignacionEstudianteScreen = ({ route }) => {
  const { candidatoEstudianteId } = route.params;
  const [cursos, setCursos] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [aulaSeleccionada, setAulaSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cursosRes, aulasRes, horariosRes] = await Promise.all([
          axios.get('https://localhost:7284/api/cursos'),
          axios.get('https://localhost:7284/api/aula'), // Corregido de 'aula' a 'aulas'
          axios.get('https://localhost:7284/api/horario'), // Corregido de 'horario' a 'horarios'
        ]);
        setCursos(cursosRes.data);
        setAulas(aulasRes.data);
        setHorarios(horariosRes.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los datos: ' + error.message);
      }
    };
    fetchData();
  }, []);

  const selectCurso = (cursoId) => {
    setCursoSeleccionado(cursoSeleccionado === cursoId ? null : cursoId);
  };

  const selectAula = (aulaId) => {
    setAulaSeleccionada(aulaSeleccionada === aulaId ? null : aulaId);
  };

  const selectHorario = (horarioId) => {
    setHorarioSeleccionado(horarioSeleccionado === horarioId ? null : horarioId);
  };

  const assignToEstudiante = async () => {
    if (cursoSeleccionado && aulaSeleccionada && horarioSeleccionado) {
      try {
        const response = await axios.post('https://localhost:7284/api/asignacionestudiante', {
          CandidatoEstudianteId: candidatoEstudianteId,
          CursoId: cursoSeleccionado,
          AulaId: aulaSeleccionada,
          HorarioId: horarioSeleccionado,
        });

        if (response.status === 200 || response.status === 201) {
          Alert.alert('Éxito', 'Curso, aula y horario asignados correctamente al estudiante.');
          setCursoSeleccionado(null);
          setAulaSeleccionada(null);
          setHorarioSeleccionado(null);
        } else {
          Alert.alert('Error', `Error al asignar: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        Alert.alert('Error', `Error al asignar: ${error.message}`);
      }
    } else {
      Alert.alert('Error', 'Debe seleccionar un curso, aula y horario.');
    }
  };

  // Asegúrate de que tu keyExtractor extraiga el ID correcto de tu objeto.
  const keyExtractor = (item) => item.horarioId || item.cursoId || item.aulaId;

  const renderCursoItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        cursoSeleccionado === item.cursoId && styles.selectedItem,
      ]}
      onPress={() => selectCurso(item.cursoId)}
    >
      <Text>{item.descripcion}</Text>
    </TouchableOpacity>
  );

  const renderAulaItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        aulaSeleccionada === item.aulaId && styles.selectedItem,
      ]}
      onPress={() => selectAula(item.aulaId)}
    >
      <Text>{`${item.nombreNumero} - ${item.ubicacion}`}</Text>
    </TouchableOpacity>
  );

  const renderHorarioItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        horarioSeleccionado === item.horarioId && styles.selectedItem,
      ]}
      onPress={() => selectHorario(item.horarioId)}
    >
      <Text>{`Día: ${item.diaSemana}, de ${item.horaInicio} a ${item.horaFin}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Curso:</Text>
      <FlatList
        data={cursos}
        renderItem={renderCursoItem}
        keyExtractor={keyExtractor}
        extraData={cursoSeleccionado}
      />

      <Text style={styles.title}>Seleccionar Aula:</Text>
      <FlatList
        data={aulas}
        renderItem={renderAulaItem}
        keyExtractor={keyExtractor}
        extraData={aulaSeleccionada}
      />

      <Text style={styles.title}>Seleccionar Horario:</Text>
      <FlatList
        data={horarios}
        renderItem={renderHorarioItem}
        keyExtractor={keyExtractor}
        extraData={horarioSeleccionado}
      />

      <TouchableOpacity style={styles.button} onPress={assignToEstudiante}>
        <Text style={styles.buttonText}>Asignar al Estudiante</Text>
      </TouchableOpacity>
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
  selectedItem: {
    backgroundColor: '#c0f0c0',
  },
  button: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AsignacionEstudianteScreen;
