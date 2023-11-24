import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CursosScreen = ({ navigation }) => {
  const navigateToSubsection = (subsection) => {
    // Lógica para navegar a la subsección deseada
    switch (subsection) {
      case 'AgregarCurso':
        // Navegar a la pantalla para agregar curso
        break;
      case 'ListaCursos':
        // Navegar a la pantalla de lista de cursos
        break;
      case 'BuscarCurso':
        // Navegar a la pantalla para buscar curso
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToSubsection('AgregarCurso')} style={styles.subsection}>
        <Icon name="plus" size={30} color="#3498db" />
        <Text>Agregar Curso</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('ListaCursos')} style={styles.subsection}>
        <Icon name="list" size={30} color="#3498db" />
        <Text>Lista de Cursos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('BuscarCurso')} style={styles.subsection}>
        <Icon name="search" size={30} color="#3498db" />
        <Text>Buscar Curso</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  subsection: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default CursosScreen;
