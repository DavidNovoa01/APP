import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const SeleccionarCursoScreen = ({ navigation, route }) => {
  const [cursos, setCursos] = useState([
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Ciencias Naturales' },
    { id: 3, nombre: 'Historia' },
    // Agrega más cursos según tu base de datos
  ]);

  const handleSelectCurso = (curso) => {
    const { onSelect } = route.params;
    onSelect(curso);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un curso:</Text>
      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectCurso(item)} style={styles.cursoItem}>
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
  cursoItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default SeleccionarCursoScreen;
