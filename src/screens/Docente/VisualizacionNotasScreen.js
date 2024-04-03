import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VisualizacionNotasScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notas, setNotas] = useState([]);
  const [notasParaPromedio, setNotasParaPromedio] = useState([]);
  const [promedio, setPromedio] = useState(null);

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

  const agregarNotaAlPromedio = (notaId) => {
    setNotasParaPromedio((notasActuales) => {
      const index = notasActuales.indexOf(notaId);
      if (index > -1) {
        return notasActuales.filter((id) => id !== notaId); // Remueve la nota
      } else {
        return [...notasActuales, notaId]; // Agrega la nota
      }
    });
  };

  const calcularPromedio = () => {
    if (notasParaPromedio.length === 0) {
      Alert.alert('Error', 'No hay notas para calcular el promedio');
      return;
    }
    const sumaNotas = notasParaPromedio.reduce((acumulado, actual) => acumulado + actual, 0);
    const promedioNotas = sumaNotas / notasParaPromedio.length;
    setPromedio(promedioNotas);
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

  const renderNota = ({ item }) => {
    const isSelected = notasParaPromedio.includes(item.notaId.toString());
    
    return (
      <View style={[styles.card, isSelected && styles.cardSelected]}>
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => agregarNotaAlPromedio(item.notaId.toString())} // Pasar notaId como string
          >
            <Icon
              name="add-circle-outline"
              size={24}
              color={isSelected ? "#3498db" : "#7f8c8d"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
        extraData={notasParaPromedio}
        keyExtractor={keyExtractor}
        renderItem={renderNota}
      />
      <TouchableOpacity style={styles.promedioButton} onPress={calcularPromedio}>
        <Text style={styles.promedioButtonText}>Calcular Promedio</Text>
      </TouchableOpacity>
      {promedio !== null && (
        <View style={styles.resultadoPromedioContainer}>
          <Text style={styles.resultadoPromedioText}>
            Promedio de Notas: {promedio.toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center',
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16, // Ajusta según sea necesario
    marginVertical: 8, // Aumentado para no pegar la info a los bordes
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardSelected: {
    borderColor: '#3498db', // Este es el estilo que se aplica cuando una tarjeta está seleccionada
    borderWidth: 2, // Solo mantén esta propiedad en lugar de los estilos duplicados
    backgroundColor: 'rgba(52, 152, 219, 0.2)', // Puedes combinar un borde y un fondo si deseas
  },
  // Nuevos estilos para una nota seleccionada
  cardSelected: {
    borderWidth: 2,
    borderColor: '#3498db',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButton: {
    backgroundColor: '#2ecc71',
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2ecc71',
  },
  promedioButton: {
    backgroundColor: '#2980b9', // Color más oscuro para más prominencia
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  promedioButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultadoPromedioContainer: {
    backgroundColor: '#82E0AA',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  resultadoPromedioText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  addIcon: {
    color: '#7f8c8d', // Color más suave para menos énfasis
  },
  addButton: {
    padding: 6,
    borderRadius: 5,
    backgroundColor: '#ecf0f1', // Color más suave para menos énfasis
  },
  addButtonSelected: {
    backgroundColor: '#bdc3c7', // Por ejemplo, un gris claro para indicar selección
  },
});
export default VisualizacionNotasScreen;