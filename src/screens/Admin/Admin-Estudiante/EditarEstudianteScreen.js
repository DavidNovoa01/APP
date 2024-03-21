import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const EditarEstudianteScreen = ({ route, navigation }) => {
  const { estudiante, onGuardarCambios } = route.params;

  const [nombre, setNombre] = useState(estudiante.nombre);
  const [apellido, setApellido] = useState(estudiante.apellido);
  const [tipoPersona, setTipoPersona] = useState(estudiante.tipoPersona);
  const [tipoDocumento, setTipoDocumento] = useState(estudiante.tipoDocumento);
  const [numeroDocumento, setNumeroDocumento] = useState(estudiante.numeroDocumento.toString());
  const [numeroContacto, setNumeroContacto] = useState(estudiante.numeroContacto.toString());
  const [direccion, setDireccion] = useState(estudiante.direccion);
  const [genero, setGenero] = useState(estudiante.genero);
  const [adjuntarDocumentos, setAdjuntarDocumentos] = useState(estudiante.adjuntarDocumentos);


  const guardarCambios = () => {
    const estudianteModificado = {
      ...estudiante,
      nombre,
      apellido,

      tipoPersona,
      tipoDocumento,
      numeroDocumento: parseInt(numeroDocumento),
      numeroContacto: parseInt(numeroContacto),
      direccion,
      genero,
      adjuntarDocumentos,
    };

    onGuardarCambios(estudianteModificado);
    navigation.navigate('ListaEstudianteScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Estudiante</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
      <TextInput style={styles.input} placeholder="Tipo de Persona" value={tipoPersona} onChangeText={setTipoPersona} />
      <TextInput style={styles.input} placeholder="Tipo de Documento" value={tipoDocumento} onChangeText={setTipoDocumento} />
      <TextInput style={styles.input} placeholder="Número de Documento" value={numeroDocumento} onChangeText={setNumeroDocumento} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Número de Contacto" value={numeroContacto} onChangeText={setNumeroContacto} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} />
      <TextInput style={styles.input} placeholder="Género" value={genero} onChangeText={setGenero} />
      <TextInput style={styles.input} placeholder="Adjuntar Documentos" value={adjuntarDocumentos} onChangeText={setAdjuntarDocumentos} />
      <Button title="Guardar Cambios" onPress={guardarCambios} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default EditarEstudianteScreen;

