import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DocentesScreen = ({ navigation }) => {
  const navigateToSubsection = (subsection) => {
    // Lógica para navegar a la subsección deseada
    switch (subsection) {
      case 'AgregarDocente':
        // Navegar a la pantalla para agregar estudiante
        break;
      case 'ListaDocente':
        // Navegar a la pantalla de lista de estudiantes
        break;
      case 'BuscarDocente':
        // Navegar a la pantalla para buscar estudiante
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToSubsection('AgregarDocente')} style={styles.subsection}>
        <Icon name="user-plus" size={30} color="#3498db" />
        <Text>Agregar Docente</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('ListaDocente')} style={styles.subsection}>
        <Icon name="list" size={30} color="#3498db" />
        <Text>Lista de Docentes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('BuscarDocente')} style={styles.subsection}>
        <Icon name="search" size={30} color="#3498db" />
        <Text>Buscar Docente</Text>
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

export default DocentesScreen;
