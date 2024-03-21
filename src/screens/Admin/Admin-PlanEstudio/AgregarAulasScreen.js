import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Alert } from 'react-native';
import axios from 'axios';

const AgregarAulasScreen = ({ navigation }) => {

  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('');

  const [numeroNombre, setNumeroNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [tipoAula, setTipoAula] = useState('');
  const [estadoAula, setEstadoAula] = useState('');
  const [horarioDisponibilidad, setHorarioDisponibilidad] = useState('');
  const [notasAdicionales, setNotasAdicionales] = useState('');
  const [registrosIncidentesProblemas, setRegistrosIncidentesProblemas] = useState('');

  const handleGuardarDatos = async () => {
    setMensajeExito('');
    setMensajeAdvertencia('');

    if (!numeroNombre || !ubicacion || !capacidad || !tipoAula || !estadoAula || !horarioDisponibilidad) {
      setMensajeAdvertencia('Todos los campos son obligatorios.');
      return;
    }

    const aulaData = {
      NombreNumero: numeroNombre,
      Ubicacion: ubicacion,
      Capacidad: parseInt(capacidad),
      TipoAula: tipoAula,
      EstadoAula: estadoAula,
      HorarioDisponibilidad: horarioDisponibilidad,
      NotasAdicionales: notasAdicionales,
      UltimaActualizacion: new Date().toISOString(),
      RegistrosIncidentesProblemas: registrosIncidentesProblemas
    };

    axios.post('https://localhost:7284/api/aula', aulaData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Aula guardada con éxito:', response.data);
      setMensajeExito('Aula guardada con éxito.');
    })
    .catch((error) => {
      console.error('Error al guardar el aula:', error);
      setMensajeAdvertencia('No se pudo guardar el aula. Verifique los datos e intente nuevamente.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Formulario Aula</Text>
      <TextInput
        style={styles.input}
        placeholder="Número/Nombre"
        value={numeroNombre}
        onChangeText={setNumeroNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
      />
      <TextInput
        style={styles.input}
        placeholder="Capacidad"
        keyboardType="numeric"
        value={capacidad}
        onChangeText={setCapacidad}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Seleccione Tipo de Aula</Text>
        <Picker
          selectedValue={tipoAula}
          style={styles.picker}
          onValueChange={(itemValue) => setTipoAula(itemValue)}
        >
          <Picker.Item label="Convencional" value="Convencional" />
          <Picker.Item label="Laboratorio de Informática" value="Laboratorio de Informática" />
          <Picker.Item label="Sala de Conferencias" value="Sala de Conferencias" />
          <Picker.Item label="Biblioteca" value="Biblioteca" />
        </Picker>
      </View>
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Seleccione Estado del Aula</Text>
        <Picker
          selectedValue={estadoAula}
          style={styles.picker}
          onValueChange={(itemValue) => setEstadoAula(itemValue)}
        >
          <Picker.Item label="Disponible" value="Disponible" />
          <Picker.Item label="No disponible" value="No disponible" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Horario de Disponibilidad"
        value={horarioDisponibilidad}
        onChangeText={setHorarioDisponibilidad}
      />
      <TextInput
        style={styles.input}
        placeholder="Notas Adicionales"
        value={notasAdicionales}
        onChangeText={setNotasAdicionales}
      />
      <TextInput
        style={styles.input}
        placeholder="Registros de Incidentes/Problemas"
        value={registrosIncidentesProblemas}
        onChangeText={setRegistrosIncidentesProblemas}
      />
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
    color: '#4CAF50', // Un verde más brillante
    fontSize: 18, // Tamaño de fuente más grande
    marginTop: 10,
    fontWeight: 'bold', // Texto en negrita
    padding: 10, // Agregar un poco de relleno
    borderRadius: 5, // Bordes redondeados
    borderWidth: 1, // Borde del mensaje
    borderColor: '#4CAF50', // Color del borde
    backgroundColor: '#E8F5E9', // Fondo más claro para mayor contraste
    textAlign: 'center', // Centrar el texto
  },
  mensajeAdvertencia: {
    color: '#FF5722', // Un naranja más brillante
    fontSize: 18, // Tamaño de fuente más grande
    marginTop: 10,
    fontWeight: 'bold', // Texto en negrita
    padding: 10, // Agregar un poco de relleno
    borderRadius: 5, // Bordes redondeados
    borderWidth: 1, // Borde del mensaje
    borderColor: '#FF5722', // Color del borde
    backgroundColor: '#FFEBEE', // Fondo más claro para mayor contraste
    textAlign: 'center', // Centrar el texto
  },
});

export default AgregarAulasScreen;


