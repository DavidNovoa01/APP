import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListaDocenteScreen = ({ navigation }) => {
  const [docentes, setDocentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDocentes = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/docente');
      setDocentes(response.data);
    } catch (error) {
      console.error('Error al obtener docentes', error);
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  const keyExtractor = (item, index) => item.docenteId?.toString() ?? index.toString();

  const renderDocenteInfo = (label, value) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text>{value}</Text>
    </View>
  );

  const renderDocente = ({ item }) => (
    <View style={styles.docenteContainer}>
      {renderDocenteInfo('Nombres', item.nombres)}
      {renderDocenteInfo('Apellidos', item.apellidos)}
      {renderDocenteInfo('Fecha de Nacimiento', item.fechaNacimiento)}
      {renderDocenteInfo('Género', item.genero)}
      {renderDocenteInfo('Dirección', item.direccion)}
      {renderDocenteInfo('Correo Electrónico', item.correoElectronico)}
      {renderDocenteInfo('Título Académico', item.tituloAcademico)}
      {renderDocenteInfo('Número de Teléfono', item.numeroTelefono)}
      {renderDocenteInfo('Fecha de Contratación', item.fechaContratacion)}
      {renderDocenteInfo('Estado Laboral', item.estadoLaboral)}
      {renderDocenteInfo('Número de Identificación', item.numeroIdentificacion)}
      {renderDocenteInfo('Comentarios y Notas', item.comentariosNotas)}
      {renderDocenteInfo('Nivel de Experiencia', item.nivelExperiencia)}

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.docenteId)}>
          <Icon name="delete" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Icon name="edit" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.assignButton} onPress={() => handleAssign(item.docenteId)}>
          <Text style={styles.buttonText}>Asignar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDelete = async (docenteId) => {
    try {
      await axios.delete(`https://localhost:7284/api/docente/${docenteId}`);
      setDocentes((prevDocentes) => prevDocentes.filter((d) => d.docenteId !== docenteId));
    } catch (error) {
      console.error('Error al eliminar docente', error);
    }
  };

  const handleEdit = (docente) => {
    navigation.navigate('EditarDocenteScreen', { docente });
  };
  
  const handleAssign = (docenteId) => {
    navigation.navigate('AsignacionScreen', { docenteId });
  };

  const handleRefresh = () => {
    fetchDocentes();
  };
  
  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredDocentes = docentes.filter((docente) => {
    const fullName = `${docente.nombres} ${docente.apellidos}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre"
        onChangeText={handleSearch}
        value={searchTerm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredDocentes}
        keyExtractor={keyExtractor}
        renderItem={renderDocente}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  docenteContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    paddingLeft: 20,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  editButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  assignButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default ListaDocenteScreen;

