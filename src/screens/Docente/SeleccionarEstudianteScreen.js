import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const SeleccionarEstudianteScreen = ({ navigation, route }) => {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María Rodríguez' },
    { id: 3, nombre: 'Carlos García' },
    // Agrega más estudiantes según tu base de datos
  ]);

  const handleSelectEstudiante = (estudiante) => {
    const { onSelect } = route.params;
    onSelect(estudiante);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un estudiante:</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectEstudiante(item)} style={styles.estudianteItem}>
            <Text>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  estudianteItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default SeleccionarEstudianteScreen;