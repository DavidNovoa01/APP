import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListaEstudianteScreen = ({ navigation }) => {
  const [candidatoEstudiante, setCandidatoEstudiante] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchEstudiantes = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/candidatoEstudiante');
      console.log('Datos recibidos:', response.data);
      setCandidatoEstudiante(response.data);
    } catch (error) {
      console.error('Error al obtener Estudiantes', error);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const keyExtractor = (item, index) => {
    return item && item.candidatoEstudianteId ? item.candidatoEstudianteId.toString() : index.toString();
  };  

  const handleSaveChanges = async (estudianteModificado) => {
    try {
      // Realiza la lógica para guardar los cambios en la base de datos
      await axios.put(`https://localhost:7284/api/candidatoEstudiante/${estudianteModificado.candidatoEstudianteId}`, estudianteModificado);
      // Imprime un mensaje si la actualización fue exitosa
      console.log('Cambios guardados en la base de datos:', estudianteModificado);
    } catch (error) {
      console.error('Error al guardar cambios en la base de datos', error);
    }
  };

  const renderAcudientes = (acudientes) => {
    if (!acudientes || acudientes.length === 0) {
      return <Text>No hay acudientes relacionados</Text>;
    }

    return acudientes.map((acudiente, index) => (
      <TouchableOpacity key={index} onPress={() => handleVerAcudiente(acudiente.numeroIdentificacion)}>
        <Text>{acudiente.nombres} {acudiente.apellidos}</Text>
      </TouchableOpacity>
    ));
  };

  const handleVerAcudiente = (numeroIdentificacionAcudiente) => {
    // Aquí deberías navegar a la pantalla de detalles del acudiente
    console.log('Ver acudiente:', numeroIdentificacionAcudiente);
  };

  const renderEstudiante = ({ item }) => (
    <View style={styles.estudianteContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Nombre: </Text>
        <Text>{item.nombre} {item.apellido}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Fecha de Nacimiento: </Text>
        <Text>{item.fechaNacimiento}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Tipo de Persona: </Text>
        <Text>{item.tipoPersona}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Tipo de Documento: </Text>
        <Text>{item.tipoDocumento}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Número de Documento: </Text>
        <Text>{item.numeroDocumento}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Número de Contacto: </Text>
        <Text>{item.numeroContacto}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Dirección: </Text>
        <Text>{item.direccion}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Género: </Text>
        <Text>{item.genero}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Adjuntar Documentos: </Text>
        <Text>{item.adjuntarDocumentos}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Número de Identificación Acudiente: </Text>
        <Text>{item.numeroIdentificacionAcudiente}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Acudientes: </Text>
        {renderAcudientes(item.acudientes)}
      </View>
      
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.candidatoEstudianteId)}>
          <Icon name="delete" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.assignButton} onPress={() => handleAssign(item.candidatoEstudianteId)}>
          <Text style={styles.buttonText}>Asignar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  const handleDelete = async (candidatoEstudianteId) => {
    try {
      await axios.delete(`https://localhost:7284/api/candidatoEstudiante/${candidatoEstudianteId}`);
      setCandidatoEstudiante((prevEstudiante) => prevEstudiante.filter((d) => d.candidatoEstudianteId !== candidatoEstudianteId));
    } catch (error) {
      console.error('Error al eliminar candidatoEstudiante', error);
    }
  };
  

  const handleEdit = (estudiante) => {
    // Navega a la pantalla 'EditarEstudiante' con los parámetros del estudiante
    navigation.navigate('EditarEstudianteScreen', { estudiante, onGuardarCambios: handleSaveChanges });
  };

  const handleAssign = (candidatoEstudianteId) => {
    navigation.navigate('AsignacionEstudianteScreen', { candidatoEstudianteId});
  };

  const handleRefresh = () => {
    // Llama a la función para volver a cargar los datos desde la base de datos
    fetchEstudiantes();
  }
  
  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredEstudiantes = candidatoEstudiante.filter((estudiante) => {
    const fullName = `${estudiante.nombre} ${estudiante.apellido}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });



  return (
    <View>
      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre"
        onChangeText={handleSearch}
        value={searchTerm}
      />

      {/* Botón para actualizar */}
      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>

      {/* Lista de estudiantes */}
      <FlatList
        data={filteredEstudiantes}
        keyExtractor={keyExtractor}
        renderItem={renderEstudiante}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  estudianteContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    paddingLeft: 20, // Añade un relleno a la izquierda
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
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
    backgroundColor: '#2ecc71', // Color verde
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e74c3c', // Color rojo
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
  label: {
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 10, // Añade un margen a la izquierda
  },
  assignButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
});

export default ListaEstudianteScreen;

