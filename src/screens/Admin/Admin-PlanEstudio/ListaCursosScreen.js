import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListaCursosScreen = ({ navigation }) => {
  const [cursos, setCursos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/cursos');
      setCursos(response.data);
    } catch (error) {
      console.error('Error al obtener Cursos', error);
    }
  };

  const handleDelete = async (cursoId) => {
    try {
      await axios.delete(`https://localhost:7284/api/cursos/${cursoId}`);
      setCursos(cursos.filter(curso => curso.cursoId !== cursoId));
    } catch (error) {
      console.error('Error al eliminar curso', error);
    }
  };

  const handleEdit = (curso) => {
    navigation.navigate('EditarCursoScreen', { curso });
  };

  const handleRefresh = () => {
    fetchCursos();
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredCursos = cursos.filter(curso => {
    return curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderCursoInfo = (label, value) => (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const renderCurso = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {renderCursoInfo("Código del Curso:", item.codigoCurso)}
        {renderCursoInfo("Descripción:", item.descripcion)}
        {renderCursoInfo("Departamento Académico:", item.departamentoAcademico)}
        {renderCursoInfo("Nivel:", item.nivel)}
        {renderCursoInfo("Métodos de Enseñanza:", item.metodosEnsenanza)}
        {renderCursoInfo("Año:", item.año.toString())}
        {renderCursoInfo("Cupo Máximo:", item.cupoMaximo.toString())}
        {renderCursoInfo("Cupo Actual:", item.cupoActual.toString())}
        {renderCursoInfo("Estado:", item.estado || 'No especificado')}
        {renderCursoInfo("Modalidad:", item.modalidad || 'No especificado')}
        {renderCursoInfo("Fecha de Inicio:", item.fechaInicio.split('T')[0])}
        {renderCursoInfo("Fecha de Finalización:", item.fechaFinalizacion.split('T')[0])}
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete(item.cursoId)}>
          <Icon name="delete" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => handleEdit(item)}>
          <Icon name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por descripción"
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Icon name="refresh" size={24} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={filteredCursos}
        keyExtractor={(item) => item.cursoId.toString()}
        renderItem={renderCurso}
        onRefresh={handleRefresh}
        refreshing={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardContent: {
    padding: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    marginRight: 4,
  },
  editButton: {
    backgroundColor: '#2ecc71',
    marginLeft: 4,
  },
  actionText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    color: '#444',
  },
  value: {
    fontWeight: '400',
    color: '#666',
    flexShrink: 1,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    margin: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },

});

export default ListaCursosScreen;
