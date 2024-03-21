import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PlanEstudiosScreen = ({ navigation }) => {
  const navigateToSubsection = (subsection) => {
    // Lógica para navegar a la subsección deseada
    switch (subsection) {
      case 'Aulas':
        navigation.navigate('AgregarAulasScreen');
        break;
      case 'Materias':
        navigation.navigate('AgregarMateriasScreen');
        break;
      case 'Cursos':
        navigation.navigate('AgregarCursosScreen');
        break;
      case 'Horarios':
        navigation.navigate('AgregarHorariosScreen');
        break;
      case 'ListaAulas':
        navigation.navigate('ListaAulasScreen');
        break;
      case 'ListaMaterias':
        navigation.navigate('ListaMateriasScreen');
        break;
      case 'ListaCursos':
        navigation.navigate('ListaCursosScreen');
        break;
      case 'ListaHorarios':
        navigation.navigate('ListaHorariosScreen');
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToSubsection('Aulas')} style={styles.subsectionContainer}>
        <View style={styles.subsection}>
          <Icon name="chalkboard-teacher" size={40} color="#3498db" />
          <Text style={styles.text}>Agregar Aulas</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToSubsection('ListaAulas')} style={styles.subsectionContainer}>
        <View style={styles.subsection}>
          <Icon name="list-alt" size={40} color="#3498db" />
          <Text style={styles.text}>Lista Aulas</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('Materias')} style={styles.subsectionContainer}>
        <View style={styles.subsection}>
          <Icon name="book" size={40} color="#3498db" />
          <Text style={styles.text}>Agregar Materias</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToSubsection('ListaMaterias')} style={styles.subsectionContainer}>
        <View style={styles.subsection}>
          <Icon name="list-alt" size={40} color="#3498db" />
          <Text style={styles.text}>Lista Materias</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('Cursos')} style={styles.subsectionContainer}>
        <View style={styles.subsection}>
          <Icon name="graduation-cap" size={40} color="#3498db" />
          <Text style={styles.text}>Agregar Cursos</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToSubsection('ListaCursos')} style={styles.subsectionContainer}>
        <View style={styles.subsection}>
          <Icon name="list-alt" size={40} color="#3498db" />
          <Text style={styles.text}>Lista Cursos</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToSubsection('Horarios')} style={styles.subsectionContainer}>
        <View style={styles.subsection}>
          <Icon name="calendar-alt" size={40} color="#3498db" />
          <Text style={styles.text}>Agregar Horarios</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToSubsection('ListaHorarios')} style={styles.subsectionContainer}>
        <View style={styles.subsection}>
          <Icon name="list-alt" size={40} color="#3498db" />
          <Text style={styles.text}>Lista Horarios</Text>
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
  subsectionContainer: {
    width: '45%', // Ajusta el ancho para mostrar dos elementos por fila
    aspectRatio: 1, // Mantiene el mismo ancho y alto
    marginVertical: 10,
  },
  subsection: {
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

export default PlanEstudiosScreen;

