import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListaMateriasScreen = ({ navigation }) => {
  const [materias, setMaterias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/materia');
      console.log('Datos recibidos:', response.data);
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al obtener Materias', error);
    }
  };

  const keyExtractor = (item, index) => {
    return item && item.materiaId ? item.materiaId.toString() : index.toString();
  };

  const handleSaveChanges = async (materiaModificada) => {
    try {
      await axios.put(`https://localhost:7284/api/materia/${materiaModificada.materiaId}`, materiaModificada);
      console.log('Cambios guardados en la base de datos:', materiaModificada);
    } catch (error) {
      console.error('Error al guardar cambios en la base de datos', error);
    }
  };

  const handleDelete = async (materiaId) => {
    try {
      await axios.delete(`https://localhost:7284/api/materia/${materiaId}`);
      setMaterias((prevMaterias) => prevMaterias.filter((d) => d.materiaId !== materiaId));
    } catch (error) {
      console.error('Error al eliminar materia', error);
    }
  };

  const handleEdit = (materia) => {
    navigation.navigate('EditarMateriaScreen', { materia, onGuardarCambios: handleSaveChanges });
  };

  const handleRefresh = () => {
    fetchMaterias();
  }

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredMaterias = materias.filter((materia) => {
      const fullName = `${materia.nombre}`;
      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

  const renderMateriaInfo = (label, value) => (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );  

  const renderMateria = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
      {renderMateriaInfo("Nombre: ", item.nombre)}
      {renderMateriaInfo("Descripción: ", item.descripcion)}
      {renderMateriaInfo("Departamento Académico: ", item.departamentoAcademico)}
      {renderMateriaInfo("Nivel: ", item.nivel)}
      {renderMateriaInfo("Créditos: ", item.creditos)}
      {renderMateriaInfo("Estado: ", item.estado)}
      {renderMateriaInfo("Notas Adicionales: ", item.notasAdicionales)}
      {renderMateriaInfo("Métodos de Enseñanza: ", item.metodosEnsenanza)}
      {renderMateriaInfo("Horas Teóricas: ", item.horasTeoricas)}
      {renderMateriaInfo("Horas Prácticas: ", item.horasPracticas)}
      </View>
    
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDelete(item.materiaId)}>
          <Icon name="delete" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => handleEdit(item)}>
          <Icon name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre"
        onChangeText={handleSearch}
        value={searchTerm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Icon name="refresh" size={24} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={filteredMaterias}
        keyExtractor={keyExtractor}
        renderItem={renderMateria}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    margin: 16,
  },
});

export default ListaMateriasScreen;


