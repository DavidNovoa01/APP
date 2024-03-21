import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

const generarFechaAleatoria = (fechaInicial) => {
  const fechaInicio = fechaInicial ? new Date(fechaInicial) : new Date();
  const diasAleatorios = Math.floor(Math.random() * 30) + 1; // Generar un número aleatorio de días entre 1 y 30
  const fechaFinal = new Date(fechaInicio);
  fechaFinal.setDate(fechaFinal.getDate() + diasAleatorios);
  return fechaFinal.toISOString().split('T')[0]; // Formatear la fecha a 'YYYY-MM-DD'
};

const AgregarCursosScreen = ({ navigation }) => {

  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('');

  const [codigoCurso, setCodigoCurso] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [departamentoAcademico, setDepartamentoAcademico] = useState('');
  const [nivel, setNivel] = useState('');
  const [metodosEnsenanza, setMetodosEnsenanza] = useState('');
  const [anio, setAnio] = useState('');
  const [cupoMaximo, setCupoMaximo] = useState('');
  const [cupoActual, setCupoActual] = useState('');
  const [estado, setEstado] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');

  const handleGuardarDatos = async () => {
    setMensajeExito('');
    setMensajeAdvertencia('');
  
    if (!codigoCurso || !descripcion || !departamentoAcademico || !nivel || !metodosEnsenanza || !anio || !cupoMaximo || !cupoActual || !estado || !modalidad) {
      setMensajeAdvertencia('Todos los campos excepto las fechas son obligatorios.');
      return;
    }
  
    // Generar fechas aleatorias coherentes si no se proporcionan
    const fechaInicioGenerada = fechaInicio || generarFechaAleatoria();
    const fechaFinalizacionGenerada = fechaFinalizacion || generarFechaAleatoria(fechaInicioGenerada);
  
    const cursoData = {
      CodigoCurso: codigoCurso,
      Descripcion: descripcion,
      DepartamentoAcademico: departamentoAcademico,
      Nivel: nivel,
      MetodosEnsenanza: metodosEnsenanza,
      Año: parseInt(anio),
      CupoMaximo: parseInt(cupoMaximo),
      CupoActual: parseInt(cupoActual),
      Estado: estado,
      Modalidad: modalidad,
      FechaInicio: fechaInicioGenerada,
      FechaFinalizacion: fechaFinalizacionGenerada
    };
    
    axios.post('https://localhost:7284/api/cursos', cursoData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Curso guardado con éxito:', response.data);
      setMensajeExito('Curso guardado con éxito.');
    })
    .catch((error) => {
      console.error('Error al guardar el curso:', error);
      setMensajeAdvertencia('No se pudo guardar el curso. Verifique los datos e intente nuevamente.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Curso</Text>
      <TextInput
        style={styles.input}
        placeholder="Código del Curso"
        value={codigoCurso}
        onChangeText={setCodigoCurso}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Departamento Académico"
        value={departamentoAcademico}
        onChangeText={setDepartamentoAcademico}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Seleccione Nivel</Text>
        <Picker
          selectedValue={nivel}
          style={styles.picker}
          onValueChange={(itemValue) => setNivel(itemValue)}
        >
          <Picker.Item label="Primer Periodo" value="Primer Periodo" />
          <Picker.Item label="Segundo Periodo" value="Segundo Periodo" />
          <Picker.Item label="Tercer Periodo" value="Tercer Periodo" />
          <Picker.Item label="Cuarto Periodo" value="Cuarto Periodo" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Métodos de Enseñanza"
        value={metodosEnsenanza}
        onChangeText={setMetodosEnsenanza}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        keyboardType="numeric"
        value={anio}
        onChangeText={setAnio}
      />
      <TextInput
        style={styles.input}
        placeholder="Cupo Máximo"
        keyboardType="numeric"
        value={cupoMaximo}
        onChangeText={setCupoMaximo}
      />
      <TextInput
        style={styles.input}
        placeholder="Cupo Actual"
        keyboardType="numeric"
        value={cupoActual}
        onChangeText={setCupoActual}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Modalidad"
        value={modalidad}
        onChangeText={setModalidad}
      />
      <DatePicker
        style={styles.input}
        date={fechaInicio}
        mode="date"
        placeholder="Fecha de Inicio"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate={new Date()}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => setFechaInicio(date)}
      />
      <DatePicker
        style={styles.input}
        date={fechaFinalizacion}
        mode="date"
        placeholder="Fecha de Finalización"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate={new Date()}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => setFechaFinalizacion(date)}
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

export default AgregarCursosScreen;



