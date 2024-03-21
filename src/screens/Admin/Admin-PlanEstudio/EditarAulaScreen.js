import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const EditarAulaScreen = ({ route, navigation }) => {
  const { aula, onGuardarCambios } = route.params;

  const [nombreNumero, setNombreNumero] = useState(aula.nombreNumero);
  const [ubicacion, setUbicacion] = useState(aula.ubicacion);
  const [capacidad, setCapacidad] = useState(aula.capacidad.toString());
  const [tipoAula, setTipoAula] = useState(aula.tipoAula);
  const [estadoAula, setEstadoAula] = useState(aula.estadoAula);
  const [horarioDisponibilidad, setHorarioDisponibilidad] = useState(aula.horarioDisponibilidad);
  const [notasAdicionales, setNotasAdicionales] = useState(aula.notasAdicionales);
  const [registrosIncidentesProblemas, setRegistrosIncidentesProblemas] = useState(aula.registrosIncidentesProblemas);

  const guardarCambios = () => {
    const aulaModificada = {
      ...aula,
      nombreNumero,
      ubicacion,
      capacidad: parseInt(capacidad),
      tipoAula,
      estadoAula,
      horarioDisponibilidad,
      notasAdicionales,
      registrosIncidentesProblemas,
      ultimaActualizacion: new Date() // Asume que se actualiza la fecha de última actualización al guardar los cambios
    };

    onGuardarCambios(aulaModificada);
    navigation.navigate('ListaAulasScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Aula</Text>
      <TextInput style={styles.input} placeholder="Nombre/Número" value={nombreNumero} onChangeText={setNombreNumero} />
      <TextInput style={styles.input} placeholder="Ubicación" value={ubicacion} onChangeText={setUbicacion} />
      <TextInput style={styles.input} placeholder="Capacidad" value={capacidad} onChangeText={setCapacidad} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Tipo de Aula" value={tipoAula} onChangeText={setTipoAula} />
      <TextInput style={styles.input} placeholder="Estado del Aula" value={estadoAula} onChangeText={setEstadoAula} />
      <TextInput style={styles.input} placeholder="Horario de Disponibilidad" value={horarioDisponibilidad} onChangeText={setHorarioDisponibilidad} />
      <TextInput style={styles.input} placeholder="Notas Adicionales" value={notasAdicionales} onChangeText={setNotasAdicionales} />
      <TextInput style={styles.input} placeholder="Registros de Incidentes/Problemas" value={registrosIncidentesProblemas} onChangeText={setRegistrosIncidentesProblemas} />
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

export default EditarAulaScreen;


