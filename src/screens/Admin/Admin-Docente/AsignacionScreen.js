import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

const AsignacionScreen = ({ route }) => {
  const { docenteId } = route.params;
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cursosRes = await axios.get('https://localhost:7284/api/cursos');
        const materiasRes = await axios.get('https://localhost:7284/api/materia');
        setCursos(cursosRes.data);
        setMaterias(materiasRes.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los datos: ' + error.message);
      }
    };
    fetchData();
  }, []);

  const selectCurso = (cursoId) => {
    setCursoSeleccionado(cursoSeleccionado === cursoId ? null : cursoId);
  };

  const selectMateria = (materiaId) => {
    setMateriaSeleccionada(materiaSeleccionada === materiaId ? null : materiaId);
  };

  const assignToDocente = async () => {
    if (materiaSeleccionada && cursoSeleccionado) {
      try {
        // Asegúrate de que el cuerpo de la solicitud coincida con lo que espera tu API.
        const response = await axios.post('https://localhost:7284/api/asignaciondocente', {
          docenteId,
          materiaId: materiaSeleccionada,
          cursoId: cursoSeleccionado,
        });

        if (response.status === 200 || response.status === 201) {
          Alert.alert('Éxito', 'Materia y curso asignados correctamente al docente.');
          setCursoSeleccionado(null);
          setMateriaSeleccionada(null);
        } else {
          Alert.alert('Error', `Error al asignar: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        Alert.alert('Error', `Error al asignar: ${error.message}`);
      }
    } else {
      Alert.alert('Error', 'Debe seleccionar una materia y un curso.');
    }
  };

  // Asegúrate de que tu keyExtractor extraiga el ID correcto de tu objeto.
  const keyExtractor = (item) => item.materiaId || item.cursoId;

  // Renderiza cada materia en la lista.
  const renderMateriaItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        materiaSeleccionada === item.materiaId && styles.selectedItem,
      ]}
      onPress={() => selectMateria(item.materiaId)} // Usa la propiedad correcta para el ID de la materia
    >
      <Text>{item.nombre}</Text>
    </TouchableOpacity>
  );

  // Renderiza cada curso en la lista.
  const renderCursoItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        cursoSeleccionado === item.cursoId && styles.selectedItem,
      ]}
      onPress={() => selectCurso(item.cursoId)} // Usa la propiedad correcta para el ID del curso
    >
      <Text>{item.codigoCurso}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Lista de materias */}
      <Text style={styles.title}>Seleccionar Materia:</Text>
      <FlatList
        data={materias}
        renderItem={renderMateriaItem}
        keyExtractor={keyExtractor}
        extraData={materiaSeleccionada}
      />
      {/* Lista de cursos */}
      <Text style={styles.title}>Seleccionar Curso:</Text>
      <FlatList
        data={cursos}
        renderItem={renderCursoItem}
        keyExtractor={keyExtractor}
        extraData={cursoSeleccionado}
      />
      <TouchableOpacity style={styles.button} onPress={assignToDocente}>
        <Text style={styles.buttonText}>Asignar a Docente</Text>
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

export default AsignacionScreen;
