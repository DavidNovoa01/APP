import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListaAulasScreen = ({ navigation }) => {
  const [aulas, setAulas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAulas();
  }, []);

  const fetchAulas = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/aula');
      console.log('Datos recibidos:', response.data);
      setAulas(response.data);
    } catch (error) {
      console.error('Error al obtener Aulas', error);
    }
  };

  const keyExtractor = (item, index) => {
    return item && item.aulaId ? item.aulaId.toString() : index.toString();
  };

  const handleSaveChanges = async (aulaModificada) => {
    try {
      await axios.put(`https://localhost:7284/api/aula/${aulaModificada.aulaId}`, aulaModificada);
      console.log('Cambios guardados en la base de datos:', aulaModificada);
    } catch (error) {
      console.error('Error al guardar cambios en la base de datos', error);
    }
  };

  const handleDelete = async (aulaId) => {
    try {
      await axios.delete(`https://localhost:7284/api/aula/${aulaId}`);
      setAulas((prevAulas) => prevAulas.filter((d) => d.aulaId !== aulaId));
    } catch (error) {
      console.error('Error al eliminar aula', error);
    }
  };

  const handleEdit = (aula) => {
    navigation.navigate('EditarAulaScreen', { aula, onGuardarCambios: handleSaveChanges });
  };

  const handleRefresh = () => {
    fetchAulas();
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredAulas = aulas.filter((aula) => {
    return aula.nombreNumero.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderAulaInfo = (label, value) => (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const renderAula = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {renderAulaInfo("Nombre y Número: ", item.nombreNumero)}
        {renderAulaInfo("Ubicación: ", item.ubicacion)}
        {renderAulaInfo("Capacidad: ", item.capacidad.toString())}
        {renderAulaInfo("Tipo de Aula: ", item.tipoAula)}
        {renderAulaInfo("Estado del Aula: ", item.estadoAula)}
        {renderAulaInfo("Horario de Disponibilidad: ", item.horarioDisponibilidad)}
        {renderAulaInfo("Notas Adicionales: ", item.notasAdicionales)}
        {renderAulaInfo("Última Actualización: ", new Date(item.ultimaActualizacion).toLocaleString())}
        {renderAulaInfo("Registros de Incidentes/Problemas: ", item.registrosIncidentesProblemas)}
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDelete(item.aulaId)}>
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
        placeholder="Buscar por nombre o número de aula"
        onChangeText={handleSearch}
        value={searchTerm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Icon name="refresh" size={24} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={filteredAulas}
        keyExtractor={keyExtractor}
        renderItem={renderAula}
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

export default ListaAulasScreen;
