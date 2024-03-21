import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const EditarAcudienteScreen = ({ route, navigation }) => {
  const { acudiente, onGuardarCambios } = route.params;

  const [nombres, setNombres] = useState(acudiente.nombres);
  const [apellidos, setApellidos] = useState(acudiente.apellidos);
  const [numeroIdentificacion, setNumeroIdentificacion] = useState(acudiente.numeroIdentificacion.toString());
  const [edad, setEdad] = useState(acudiente.edad.toString());
  const [correoElectronico, setCorreoElectronico] = useState(acudiente.correoElectronico);
  const [relacionConEstudiante, setRelacionConEstudiante] = useState(acudiente.relacionConEstudiante);
  const [estadoCivil, setEstadoCivil] = useState(acudiente.estadoCivil);
  const [ocupacion, setOcupacion] = useState(acudiente.ocupacion);

  const guardarCambios = () => {
    const acudienteModificado = {
      ...acudiente,
      nombres,
      apellidos,
      numeroIdentificacion: parseInt(numeroIdentificacion),
      edad: parseInt(edad),
      correoElectronico,
      relacionConEstudiante,
      estadoCivil,
      ocupacion,
    };

    onGuardarCambios(acudienteModificado);
    navigation.navigate('ListaAcudientesScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Acudiente</Text>
      <TextInput style={styles.input} placeholder="Nombres" value={nombres} onChangeText={setNombres} />
      <TextInput style={styles.input} placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} />
      <TextInput style={styles.input} placeholder="Número de Identificación" value={numeroIdentificacion} onChangeText={setNumeroIdentificacion} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Correo Electrónico" value={correoElectronico} onChangeText={setCorreoElectronico} />
      <TextInput style={styles.input} placeholder="Relación con Estudiante" value={relacionConEstudiante} onChangeText={setRelacionConEstudiante} />
      <TextInput style={styles.input} placeholder="Estado Civil" value={estadoCivil} onChangeText={setEstadoCivil} />
      <TextInput style={styles.input} placeholder="Ocupación" value={ocupacion} onChangeText={setOcupacion} />
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

export default EditarAcudienteScreen;
