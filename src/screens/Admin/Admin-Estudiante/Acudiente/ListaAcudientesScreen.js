import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListaAcudientesScreen = ({ navigation }) => {
  const [acudiente, setAcudientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAcudientes = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/acudiente');
      console.log('Datos recibidos:', response.data);
      setAcudientes(response.data);
    } catch (error) {
      console.error('Error al obtener Acudientes', error);
    }
  };

  useEffect(() => {
    fetchAcudientes();
  }, []);

  const keyExtractor = (item, index) => {
    return item && item.acudienteId ? item.acudienteId.toString() : index.toString();
  };

  const handleSaveChanges = async (acudienteModificado) => {
    try {
      // Realiza la lógica para guardar los cambios en la base de datos
      await axios.put(`https://localhost:7284/api/acudiente/${acudienteModificado.acudienteId}`, acudienteModificado);
      // Imprime un mensaje si la actualización fue exitosa
      console.log('Cambios guardados en la base de datos:', acudienteModificado);
    } catch (error) {
      console.error('Error al guardar cambios en la base de datos', error);
    }
  };

  const renderEstudiantes = (estudiantesRelacionados) => {
    if (!estudiantesRelacionados || estudiantesRelacionados.length === 0) {
      return <Text>No hay estudiantes relacionados</Text>;
    }
    return estudiantesRelacionados.map((estudiante, index) => (
      <TouchableOpacity key={index} onPress={() => handleVerEstudiante(estudiante)}>
        <Text>{estudiante}</Text>
      </TouchableOpacity>
    ));
  };

  const handleDeleteTelefono = async (telefonoAcudienteId) => {
   try {
      await axios.delete(`https://localhost:7284/api/telefonoAcudiente/${telefonoAcudienteId}`);
      setAcudientes((prevAcudientes) => prevAcudientes.filter((acudiente) => acudiente.telefonoAcudienteId !== telefonoAcudienteId)); 
   }
    catch (error) {
      console.error('Error al eliminar Teléfono', error);
    }
  };

  const handleDeleteDireccion = async (direccionId) => {
    try {
      await axios.delete(`https://localhost:7284/api/direccionAcudiente/${direccionId}`);
      setAcudientes((prevAcudientes) => prevAcudientes.map((acudiente) => {
        if (acudiente.direccion && acudiente.direccion.direccionId === direccionId) {
          return { ...acudiente, direccion: null };
        }
        return acudiente;
      }));
    } catch (error) {
      console.error('Error al eliminar Dirección', error);
    }
  };
  

  const renderTelefono = (telefono, index) => {
    console.log('Objeto de teléfono:', telefono);
  
    return (
      <View key={index} style={styles.telefonoContainer}>
        <View style={styles.telefonoTextContainer}>
          <Text style={styles.telefonoText}>
            <Text style={styles.telefonoLabel}>Número:</Text> {telefono.numero}
          </Text>
          <Text style={styles.telefonoText}>
            <Text style={styles.telefonoLabel}>Tipo:</Text> {telefono.tipo}
          </Text>
          <Text style={styles.telefonoText}>
            <Text style={styles.telefonoLabel}>Indicativo:</Text> {telefono.indicativo}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.deleteTelefonoButton} 
          onPress={() => handleDeleteTelefono(telefono.telefonoAcudienteId)}>
          <Icon name="delete" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    );
  };
  
  
  

  const renderAcudiente = ({ item }) => (
    <View style={styles.acudienteContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Nombre: </Text>
        <Text>{item.nombres} {item.apellidos}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Número de Identificación: </Text>
        <Text>{item.numeroIdentificacion}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Edad: </Text>
        <Text>{item.edad}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Correo Electrónico: </Text>
        <Text>{item.correoElectronico}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Relación con Estudiante: </Text>
        <Text>{item.relacionConEstudiante}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Estado Civil: </Text>
        <Text>{item.estadoCivil}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Ocupación: </Text>
        <Text>{item.ocupacion}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Fecha de Registro: </Text>
        <Text>{item.fechaRegistro}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Estudiantes Relacionados: </Text>
        {renderEstudiantes(item.estudiantesRelacionados)}
      </View>

      {/* Sección de Dirección */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Dirección</Text>
        <Text>{item.direccion?.calle} {item.direccion?.coloniaBarrio}, {item.direccion?.ciudadLocalidad}</Text>
        <Text>{item.direccion?.estadoProvincia}, {item.direccion?.codigoPostal}</Text>
        <Text>{item.direccion?.pais}</Text>
        {item.direccion && item.direccion.direccionAcudienteId && (
  <TouchableOpacity 
    style={styles.deleteDireccionButton} 
    onPress={() => handleDeleteDireccion(item.direccion.direccionAcudienteId)}>
    <Icon name="delete" size={24} color="#e74c3c" />
  </TouchableOpacity>
)}

      </View>

    {/* Sección de Teléfono */}
<View style={styles.sectionContainer}>
  <Text style={styles.sectionTitle}>Teléfono</Text>
  {item.telefonos.map((telefono, index) => renderTelefono(telefono, index))}
</View>
  
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.acudienteId)}>
          <Icon name="delete" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtonsContainer}>
      <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => navigation.navigate('RegistrarDireccionScreen', { acudienteId: item.acudienteId })}>
        <Text style={styles.buttonText}>Registrar Dirección</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => navigation.navigate('RegistrarTelefonoScreen', { acudienteId: item.acudienteId })}>
        <Text style={styles.buttonText}>Registrar Teléfono</Text>
      </TouchableOpacity>
    </View>

    </View>
  );  

  const handleDelete = async (acudienteId) => {
    try {
      await axios.delete(`https://localhost:7284/api/acudiente/${acudienteId}`);
      setAcudientes((prevAcudientes) => prevAcudientes.filter((acudiente) => acudiente.acudienteId !== acudienteId));
    } catch (error) {
      console.error('Error al eliminar Acudiente', error);
    }
  };

  const handleEdit = (acudiente) => {
    // Navega a la pantalla 'EditarEstudiante' con los parámetros del estudiante
    navigation.navigate('EditarAcudienteScreen', { acudiente, onGuardarCambios: handleSaveChanges });
  };
  const handleRefresh = () => {
    // Llama a la función para volver a cargar los datos desde la base de datos
    fetchAcudientes();
  }

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredAcudientes = acudiente.filter((acudiente) => {
    const fullName = `${acudiente.nombres} ${acudiente.apellidos}`;
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

      {/* Lista de acudientes */}
      <FlatList
        data={filteredAcudientes}
        keyExtractor={keyExtractor}
        renderItem={renderAcudiente}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  acudienteContainer: {
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
  registerButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3498db', // Puedes cambiar el color según tu preferencia
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  telefonoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  }, 
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  telefonoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginVertical: 2,
  },
  
  telefonoText: {
    fontSize: 14,
    marginBottom: 2,
  },
  telefonoLabel: {
    fontWeight: 'bold',
  },
  telefonoTextContainer: {
    flex: 1,
  },
  deleteTelefonoButton: {
    marginLeft: 10,
    padding: 5,
  },
  deleteDireccionButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default ListaAcudientesScreen;
