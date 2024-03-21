import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const EditarHorarioScreen = ({ route, navigation }) => {
  const { horario, onGuardarCambios } = route.params;

  const [diaSemana, setDiaSemana] = useState(horario.diaSemana);
  const [horaInicio, setHoraInicio] = useState(horario.horaInicio);
  const [horaFin, setHoraFin] = useState(horario.horaFin);
  const [periodoAcademico, setPeriodoAcademico] = useState(horario.periodoAcademico);
  const [grupoSeccion, setGrupoSeccion] = useState(horario.grupoSeccion);
  const [fechaInicioClases, setFechaInicioClases] = useState(horario.fechaInicioClases);
  const [fechaFinClases, setFechaFinClases] = useState(horario.fechaFinClases);
  const [estadoHorario, setEstadoHorario] = useState(horario.estadoHorario);
  const [duracionClaseMinutos, setDuracionClaseMinutos] = useState(horario.duracionClaseMinutos.toString());
  const [notificacionCambioHorario, setNotificacionCambioHorario] = useState(horario.notificacionCambioHorario);

  const guardarCambios = () => {
    const horarioModificado = {
      ...horario,
      diaSemana,
      horaInicio,
      horaFin,
      periodoAcademico,
      grupoSeccion,
      fechaInicioClases,
      fechaFinClases,
      estadoHorario,
      duracionClaseMinutos: parseInt(duracionClaseMinutos),
      notificacionCambioHorario,
    };

    onGuardarCambios(horarioModificado);
    navigation.navigate('ListaHorariosScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Horario</Text>
      <TextInput style={styles.input} placeholder="Día de la Semana" value={diaSemana} onChangeText={setDiaSemana} />
      <TextInput style={styles.input} placeholder="Hora de Inicio" value={horaInicio} onChangeText={setHoraInicio} />
      <TextInput style={styles.input} placeholder="Hora de Fin" value={horaFin} onChangeText={setHoraFin} />
      <TextInput style={styles.input} placeholder="Periodo Académico" value={periodoAcademico} onChangeText={setPeriodoAcademico} />
      <TextInput style={styles.input} placeholder="Grupo/Sección" value={grupoSeccion} onChangeText={setGrupoSeccion} />
      <TextInput style={styles.input} placeholder="Fecha de Inicio de Clases" value={fechaInicioClases} onChangeText={setFechaInicioClases} />
      <TextInput style={styles.input} placeholder="Fecha de Fin de Clases" value={fechaFinClases} onChangeText={setFechaFinClases} />
      <TextInput style={styles.input} placeholder="Estado del Horario" value={estadoHorario} onChangeText={setEstadoHorario} />
      <TextInput style={styles.input} placeholder="Duración de la Clase (minutos)" value={duracionClaseMinutos} onChangeText={setDuracionClaseMinutos} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Notificación de Cambio de Horario" value={notificacionCambioHorario} onChangeText={setNotificacionCambioHorario} />
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

export default EditarHorarioScreen;
