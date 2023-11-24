import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EstudiantesScreen = ({ navigation }) => {
  const navigateToSubsection = (subsection) => {
    // Lógica para navegar a la subsección deseada
    switch (subsection) {
        case 'AgregarEstudiante':
            navigation.navigate('AgregarEstudianteScreen');
            break;
      case 'ListaEstudiante':
        // Navegar a la pantalla de lista de estudiantes
        break;
      case 'BuscarEstudiante':
        // Navegar a la pantalla para buscar estudiante
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToSubsection('AgregarEstudiante')} style={styles.subsection}>
        <Icon name="user-plus" size={30} color="#3498db" />
        <Text>Agregar Estudiante</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('ListaEstudiante')} style={styles.subsection}>
        <Icon name="list" size={30} color="#3498db" />
        <Text>Lista de Estudiantes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('BuscarEstudiante')} style={styles.subsection}>
        <Icon name="search" size={30} color="#3498db" />
        <Text>Buscar Estudiante</Text>
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

export default EstudiantesScreen;
