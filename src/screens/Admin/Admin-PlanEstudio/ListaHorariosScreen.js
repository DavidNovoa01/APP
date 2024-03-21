import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListaHorariosScreen = ({ navigation }) => {
  const [horarios, setHorarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/horario');
      console.log('Datos recibidos:', response.data);
      setHorarios(response.data);
    } catch (error) {
      console.error('Error al obtener Horarios', error);
    }
  };

  const keyExtractor = (item, index) => {
    return item && item.horarioId ? item.horarioId.toString() : index.toString();
  };

  const handleSaveChanges = async (horarioModificado) => {
    try {
      await axios.put(`https://localhost:7284/api/horario/${horarioModificado.horarioId}`, horarioModificado);
      console.log('Cambios guardados en la base de datos:', horarioModificado);
    } catch (error) {
      console.error('Error al guardar cambios en la base de datos', error);
    }
  };

  const handleDelete = async (horarioId) => {
    try {
      await axios.delete(`https://localhost:7284/api/horario/${horarioId}`);
      setHorarios((prevHorarios) => prevHorarios.filter((d) => d.horarioId !== horarioId));
    } catch (error) {
      console.error('Error al eliminar horario', error);
    }
  };

  const handleEdit = (horario) => {
    navigation.navigate('EditarHorarioScreen', { horario, onGuardarCambios: handleSaveChanges });
  };

  const handleRefresh = () => {
    fetchHorarios();
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredHorarios = horarios.filter((horario) => {
    return horario.diaSemana.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderHorarioInfo = (label, value) => (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const renderHorario = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {renderHorarioInfo("Día de la Semana: ", item.diaSemana)}
        {renderHorarioInfo("Hora de Inicio: ", item.horaInicio)}
        {renderHorarioInfo("Hora de Fin: ", item.horaFin)}
        {renderHorarioInfo("Período Académico: ", item.periodoAcademico)}
        {renderHorarioInfo("Grupo/Sección: ", item.grupoSeccion)}
        {renderHorarioInfo("Fecha de Inicio de Clases: ", item.fechaInicioClases)}
        {renderHorarioInfo("Fecha de Fin de Clases: ", item.fechaFinClases)}
        {renderHorarioInfo("Estado del Horario: ", item.estadoHorario)}
        {renderHorarioInfo("Duración de Clase (minutos): ", item.duracionClaseMinutos.toString())}
        {renderHorarioInfo("Notificación de Cambio de Horario: ", item.notificacionCambioHorario)}
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDelete(item.horarioId)}>
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
        placeholder="Buscar por día"
        onChangeText={handleSearch}
        value={searchTerm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Icon name="refresh" size={24} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={filteredHorarios}
        keyExtractor={keyExtractor}
        renderItem={renderHorario}
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

export default ListaHorariosScreen;


