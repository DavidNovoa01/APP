import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DocentesInicio = ({ navigation }) => {
  const navigateToSection = (section) => {
    // Lógica para navegar a la sección deseada
    switch (section) {
      case 'Inicio':
        // Navegar a la pantalla de inicio del docente
        break;
      case 'Notas':
        navigation.navigate('RegistrarNotaScreen');
        break;
      case 'Visualización Plan de Estudio':
        break;
      case 'Visualización de Listado':
        navigation.navigate('VisualizacionNotasScreen');
        break;
      case 'Reclamos':
        navigation.navigate('ReclamosScreen');
        break;
      default:
        break;
    }
  };

  const renderSection = (iconName, sectionName) => (
    <TouchableOpacity onPress={() => navigateToSection(sectionName)} style={styles.section}>
      <View style={styles.sectionContainer}>
        <Icon name={iconName} size={30} color="#3498db" />
        <Text style={styles.sectionText}>{sectionName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {renderSection('home', 'Inicio')}
        {renderSection('edit', 'Notas')}
        {renderSection('book', 'Visualización Plan de Estudio')}
        {renderSection('list-alt', 'Visualización de Listado')}
        {renderSection('exclamation-triangle', 'Reclamos')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  section: {
    width: '48%', // Ajusta el ancho según tus necesidades
    marginBottom: 20,
  },
  sectionContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 20,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  sectionText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default DocentesInicio;


