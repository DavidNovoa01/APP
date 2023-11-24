import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const AdminInicio = ({ navigation }) => {
  const navigateToSection = (section) => {
    // Lógica para navegar a la sección deseada
    switch (section) {
      case 'Inicio':
        // Navegar a la pantalla de inicio del administrador
        break;
        
    case 'Estudiantes':
        navigation.navigate('EstudiantesScreen'); // Asegúrate de que 'EstudiantesScreen' sea el nombre correcto de tu componente
        break;
      case 'Docentes':
        navigation.navigate('DocentesScreen');
        break;
      case 'Cursos':
        navigation.navigate('CursosScreen');
        break;
      case 'Plan de Estudios':
        navigation.navigate('');
        break;
      case 'Reclamos':
        navigation.navigate('');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToSection('Inicio')} style={styles.section}>
        <Icon name="home" size={30} color="#3498db" />
        <Text>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSection('Estudiantes')} style={styles.section}>
        <Icon name="users" size={30} color="#3498db" />
        <Text>Estudiantes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSection('Docentes')} style={styles.section}>
        <Icon name="graduation-cap" size={30} color="#3498db" />
        <Text>Docentes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSection('Cursos')} style={styles.section}>
        <Icon name="book" size={30} color="#3498db" />
        <Text>Cursos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSection('Plan de Estudios')} style={styles.section}>
        <Icon name="clipboard" size={30} color="#3498db" />
        <Text>Plan de Estudios</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSection('Reclamos')} style={styles.section}>
        <Icon name="exclamation-triangle" size={30} color="#3498db" />
        <Text>Reclamos</Text>
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
  section: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AdminInicio;

