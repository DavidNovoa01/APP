import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VisualizacionNotasScreen = ({ navigation }) => {
  const [notas, setNotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/notas');
      console.log('Datos recibidos:', response.data);
      setNotas(response.data);
    } catch (error) {
      console.error('Error al obtener notas', error);
    }
  };

  const keyExtractor = (item, index) => {
    return item && item.notaId ? item.notaId.toString() : index.toString();
  };

  const handleSaveChanges = async (notaModificada) => {
    try {
      await axios.put(`https://localhost:7284/api/notas/${notaModificada.notaId}`, notaModificada);
      console.log('Cambios guardados en la base de datos:', notaModificada);
    } catch (error) {
      console.error('Error al guardar cambios en la base de datos', error);
    }
  };

  const handleDelete = async (notaId) => {
    try {
      await axios.delete(`https://localhost:7284/api/notas/${notaId}`);
      setNotas((prevNotas) => prevNotas.filter((d) => d.notaId !== notaId));
    } catch (error) {
      console.error('Error al eliminar nota', error);
    }
  };

  const handleEdit = (nota) => {
    navigation.navigate('EditarNotasScreen', { nota, onGuardarCambios: handleSaveChanges });
  };

  const handleRefresh = () => {
    fetchNotas();
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredNotas = notas.filter((nota) => {
    return nota.estudiante.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderNotaInfo = (label, value) => (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const renderNota = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {renderNotaInfo("Estudiante: ", item.estudiante)}
        {renderNotaInfo("Curso: ", item.curso)}
        {renderNotaInfo("Materia: ", item.materia)}
        {renderNotaInfo("Periodo Académico: ", item.periodoAcademico)}
        {renderNotaInfo("Tipo de Nota: ", item.tipoNota)}
        {renderNotaInfo("Valor de Nota: ", item.valorNota.toString())}
        {renderNotaInfo("Descripción de la Nota: ", item.descripcionNota)}
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDelete(item.notaId)}>
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
        placeholder="Buscar por estudiante"
        onChangeText={handleSearch}
        value={searchTerm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Icon name="refresh" size={24} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={filteredNotas}
        keyExtractor={keyExtractor}
        renderItem={renderNota}
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
      backgroundColor: '#e74c3c', // Un rojo para eliminar
      marginRight: 4,
    },
    editButton: {
      backgroundColor: '#2ecc71', // Un verde para editar
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
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 5,
    },
  });
  
  export default VisualizacionNotasScreen;