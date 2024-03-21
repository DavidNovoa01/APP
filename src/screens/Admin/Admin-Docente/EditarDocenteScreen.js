import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditarDocenteScreen = ({ route, navigation }) => {
  const { docente, onGuardarCambios } = route.params;

  const [nombre, setNombre] = useState(docente.nombre);
  const [fechaNacimiento, setFechaNacimiento] = useState(docente.fechaNacimiento);
  const [genero, setGenero] = useState(docente.genero);
  const [direccion, setDireccion] = useState(docente.direccion);
  const [correoElectronico, setCorreoElectronico] = useState(docente.correoElectronico);
  const [numeroTelefono, setNumeroTelefono] = useState(docente.numeroTelefono);
  const [fechaContratacion, setFechaContratacion] = useState(docente.fechaContratacion);
  const [cursosAsignados, setCursosAsignados] = useState(docente.cursosAsignados);
  const [horarioClases, setHorarioClases] = useState(docente.horarioClases);
  const [estadoLaboral, setEstadoLaboral] = useState(docente.estadoLaboral);
  const [numeroIdentificacion, setNumeroIdentificacion] = useState(docente.numeroIdentificacion);
  const [comentariosNotas, setComentariosNotas] = useState(docente.comentariosNotas);
  const [nivelExperiencia, setNivelExperiencia] = useState(docente.nivelExperiencia);

  const guardarCambios = () => {
    const docenteModificado = {
      ...docente,
      nombre,
      fechaNacimiento,
      genero,
      direccion,
      correoElectronico,
      numeroTelefono,
      fechaContratacion,
      cursosAsignados,
      horarioClases,
      estadoLaboral,
      numeroIdentificacion,
      comentariosNotas,
      nivelExperiencia,
      // Agrega otros campos según sea necesario
    };

    // Llama a la función proporcionada para guardar los cambios en ListaDocenteScreen
    onGuardarCambios(docenteModificado);

    // Después de guardar, navega de nuevo a la lista de docentes
    navigation.navigate('ListaDocenteScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Docente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Genero"
        value={genero}
        onChangeText={(text) => setGenero(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Direccion"
        value={direccion}
        onChangeText={(text) => setDireccion(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CorreoElectronico"
        value={correoElectronico}
        onChangeText={(text) => setCorreoElectronico(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CursosAsignados"
        value={cursosAsignados}
        onChangeText={(text) => setCursosAsignados(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="EstadoLaboral,"
        value={estadoLaboral}
        onChangeText={(text) => setEstadoLaboral(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ComentariosNotas"
        value={comentariosNotas}
        onChangeText={(text) => setComentariosNotas(text)}
      />
      {/* Agrega más TextInput según sea necesario para los otros campos */}
      <Button title="Guardar Cambios" onPress={guardarCambios} />
    </View>
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

export default EditarDocenteScreen;
