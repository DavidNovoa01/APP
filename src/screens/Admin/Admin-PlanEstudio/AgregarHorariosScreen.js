import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AgregarHorariosScreen = ({ navigation }) => {
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('');

  const [diaSemana, setDiaSemana] = useState('');
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFin, setHoraFin] = useState(new Date());
  const [duracion, setDuracion] = useState('');
  const [periodoAcademico, setPeriodoAcademico] = useState('');
  const [grupoSeccion, setGrupoSeccion] = useState('');
  const [fechaInicioClases, setFechaInicioClases] = useState(new Date());
  const [fechaFinClases, setFechaFinClases] = useState(new Date());
  const [estadoHorario, setEstadoHorario] = useState('');
  const [notificacionCambioHorario, setNotificacionCambioHorario] = useState('');

  const handleGuardarDatos = async () => {
    setMensajeExito('');
    setMensajeAdvertencia('');

    // Generar fechas aleatorias si no se han seleccionado
    const fechaInicioGenerada = fechaInicioClases || generarFechaAleatoria();
    const fechaFinGenerada = fechaFinClases || generarFechaAleatoria(fechaInicioGenerada);

    if (!diaSemana || !horaInicio || !horaFin || !periodoAcademico || !grupoSeccion || !estadoHorario || !notificacionCambioHorario) {
      setMensajeAdvertencia('Todos los campos son obligatorios');
      return;
    }

    const horarioData = {
      DiaSemana: diaSemana,
      HoraInicio: horaInicio.toTimeString().split(' ')[0],
      HoraFin: horaFin.toTimeString().split(' ')[0],
      DuracionClaseMinutos: parseInt(duracion),
      PeriodoAcademico: periodoAcademico,
      GrupoSeccion: grupoSeccion,
      FechaInicioClases: fechaInicioGenerada.toISOString().split('T')[0],
      FechaFinClases: fechaFinGenerada.toISOString().split('T')[0],
      EstadoHorario: estadoHorario,
      NotificacionCambioHorario: notificacionCambioHorario,
    };

    axios.post('https://localhost:7284/api/horario', horarioData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Horario guardado con éxito:', response.data);
      setMensajeExito('Horario guardado con éxito.');
    })
    .catch((error) => {
      console.error('Error al guardar el horario:', error);
      setMensajeAdvertencia('No se pudo guardar el horario. Verifique los datos e intente nuevamente.');
    });
  };

  const generarFechaAleatoria = (fechaInicial) => {
    const fechaInicio = fechaInicial || new Date();
    const diasAleatorios = Math.floor(Math.random() * 30) + 1; // Número aleatorio de días entre 1 y 30
    const fechaFinal = new Date(fechaInicio);
    fechaFinal.setDate(fechaFinal.getDate() + diasAleatorios);
    return fechaFinal;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Formulario Horario</Text>
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Día de la Semana</Text>
        <Picker
          selectedValue={diaSemana}
          style={styles.picker}
          onValueChange={(itemValue) => setDiaSemana(itemValue)}
        >
          <Picker.Item label="Lunes" value="Lunes" />
          <Picker.Item label="Martes" value="Martes" />
          <Picker.Item label="Miércoles" value="Miércoles" />
          <Picker.Item label="Jueves" value="Jueves" />
          <Picker.Item label="Viernes" value="Viernes" />
        </Picker>
      </View>
      <DateTimePicker
        value={horaInicio}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || horaInicio;
          setHoraInicio(currentDate);
        }}
      />
      <DateTimePicker
        value={horaFin}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || horaFin;
          setHoraFin(currentDate);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Duración (minutos)"
        keyboardType="numeric"
        value={duracion}
        onChangeText={setDuracion}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Periodo Académico</Text>
        <Picker
          selectedValue={periodoAcademico}
          style={styles.picker}
          onValueChange={(itemValue) => setPeriodoAcademico(itemValue)}
        >
          <Picker.Item label="Primer" value="Primer" />
          <Picker.Item label="Segundo" value="Segundo" />
          <Picker.Item label="Tercer" value="Tercer" />
          <Picker.Item label="Cuarto" value="Cuarto" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Grupo/Sección"
        value={grupoSeccion}
        onChangeText={setGrupoSeccion}
      />
      <DateTimePicker
        value={fechaInicioClases}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || fechaInicioClases;
          setFechaInicioClases(currentDate);
        }}
      />
      <DateTimePicker
        value={fechaFinClases}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || fechaFinClases;
          setFechaFinClases(currentDate);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado del Horario"
        value={estadoHorario}
        onChangeText={setEstadoHorario}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Notificación de Cambio de Horario</Text>
        <Picker
          selectedValue={notificacionCambioHorario}
          style={styles.picker}
          onValueChange={(itemValue) => setNotificacionCambioHorario(itemValue)}
        >
          <Picker.Item label="Sí" value="Sí" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>
      <TouchableOpacity onPress={handleGuardarDatos} style={styles.guardarButton}>
        <Text style={styles.buttonText}>Guardar Datos</Text>
      </TouchableOpacity>

      {mensajeExito ? <Text style={styles.mensajeExito}>{mensajeExito}</Text> : null}
      {mensajeAdvertencia ? <Text style={styles.mensajeAdvertencia}>{mensajeAdvertencia}</Text> : null}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    width: '100%',
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  guardarButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  mensajeExito: {
    color: '#4CAF50',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
    textAlign: 'center',
  },
  mensajeAdvertencia: {
    color: '#FF5722',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF5722',
    backgroundColor: '#FFEBEE',
    textAlign: 'center',
  },
});

export default AgregarHorariosScreen;


