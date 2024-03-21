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
        navigation.navigate('ListaEstudianteScreen');
        break;
      case 'AgregarAcudiente':
        navigation.navigate('AgregarAcudienteScreen');
        break;
      case 'ListaAcudiente':
        navigation.navigate('ListaAcudientesScreen');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToSubsection('AgregarEstudiante')} style={styles.subsection}>
        <View style={styles.subsectionContent}>
          <Icon name="user-plus" size={40} color="#3498db" />
          <Text style={styles.text}>Agregar Estudiante</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('ListaEstudiante')} style={styles.subsection}>
        <View style={styles.subsectionContent}>
          <Icon name="list" size={40} color="#3498db" />
          <Text style={styles.text}>Lista de Estudiantes</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('AgregarAcudiente')} style={styles.subsection}>
        <View style={styles.subsectionContent}>
          <Icon name="user-plus" size={40} color="#3498db" />
          <Text style={styles.text}>Agregar Acudiente</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('ListaAcudiente')} style={styles.subsection}>
        <View style={styles.subsectionContent}>
          <Icon name="list" size={40} color="#3498db" />
          <Text style={styles.text}>Lista de Acudientes</Text>
        </View>
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
    padding: 20,
  },
  subsection: {
    width: '45%', // Ajusta el ancho para mostrar dos elementos por fila
    aspectRatio: 1, // Mantiene el mismo ancho y alto
    marginVertical: 10,
  },
  subsectionContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EstudiantesScreen;
