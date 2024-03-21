import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

const AgregarDocenteScreen = ({ navigation }) => {

  const [mensajeExito, setMensajeExito] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [tituloAcademico, setTituloAcademico] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState('');
  const [estadoLaboral, setEstadoLaboral] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [comentariosNotas, setComentariosNotas] = useState('');
  const [nivelExperiencia, setNivelExperiencia] = useState('');

  const generarFechaAleatoria = (anioInicio, anioFin) => {
    const dia = Math.floor(Math.random() * 28) + 1; // Genera un día entre 1 y 28
    const mes = Math.floor(Math.random() * 12) + 1; // Genera un mes entre 1 y 12
    const anio = Math.floor(Math.random() * (anioFin - anioInicio + 1)) + anioInicio; // Genera un año en el rango especificado
    return `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
  };
  
  const handleGuardarDatos = () => {
    if (nombres.trim() !== '' && apellidos.trim() !== '') {
      const data = {
        nombres,
        apellidos,
        fechaNacimiento: fechaNacimiento || generarFechaAleatoria(1950, 2000),
        genero,
        direccion,
        correoElectronico,
        tituloAcademico,
        numeroTelefono,
        fechaContratacion: fechaContratacion || generarFechaAleatoria(2010, 2022),
        estadoLaboral,
        numeroIdentificacion,
        comentariosNotas,
        nivelExperiencia
      };
  
      // Agregar las fechas solo si se han proporcionado
      if (fechaNacimiento) {
        data.fechaNacimiento = fechaNacimiento;
      }
      if (fechaContratacion) {
        data.fechaContratacion = fechaContratacion;
      }

      axios.post('https://localhost:7284/api/docente', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('Docente guardado con éxito:', response.data);
          setMensajeExito("Docente guardado con éxito.");
        })
        .catch(error => {
          console.error('Error al guardar el docente:', error);
          Alert.alert("Error", "No se pudo guardar el docente.");
        });
    } else {
      Alert.alert("Error", "Los campos 'Nombres' y 'Apellidos' son obligatorios.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Docente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={nombres}
        onChangeText={setNombres}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={apellidos}
        onChangeText={setApellidos}
      />
      <DatePicker
        style={styles.input}
        date={fechaNacimiento}
        mode="date"
        placeholder="Fecha de Nacimiento"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate={new Date()}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => setFechaNacimiento(date)}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Género</Text>
        <Picker
          selectedValue={genero}
          style={styles.picker}
          onValueChange={(itemValue) => setGenero(itemValue)}
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
          <Picker.Item label="No binario" value="No binario" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
      />
      <TextInput
        style={styles.input}
        placeholder="Título Académico"
        value={tituloAcademico}
        onChangeText={setTituloAcademico}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Teléfono"
        keyboardType="numeric"
        value={numeroTelefono}
        onChangeText={setNumeroTelefono}
      />
      <DatePicker
        style={styles.input}
        date={fechaContratacion}
        mode="date"
        placeholder="Fecha de Contratación"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate={new Date()}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => setFechaContratacion(date)}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Estado Laboral</Text>
        <Picker
          selectedValue={estadoLaboral}
          style={styles.picker}
          onValueChange={(itemValue) => setEstadoLaboral(itemValue)}
        >
          <Picker.Item label="Activo" value="Activo" />
          <Picker.Item label="Inactivo" value="Inactivo" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Número de Identificación"
        value={numeroIdentificacion}
        onChangeText={setNumeroIdentificacion}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentarios y Notas"
        value={comentariosNotas}
        onChangeText={setComentariosNotas}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Nivel de Experiencia</Text>
        <Picker
          selectedValue={nivelExperiencia}
          style={styles.picker}
          onValueChange={(itemValue) => setNivelExperiencia(itemValue)}
        >
          <Picker.Item label="Alto" value="Alto" />
          <Picker.Item label="Medio" value="Medio" />
          <Picker.Item label="Bajo" value="Bajo" />
        </Picker>
      </View>
      <TouchableOpacity onPress={handleGuardarDatos} style={styles.guardarButton}>
        <Text style={styles.buttonText}>Guardar Datos</Text>
      </TouchableOpacity>

      {mensajeExito ? <Text style={styles.mensajeExito}>{mensajeExito}</Text> : null}

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
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  pickerLabel: {
    marginBottom: 5,
  },
  picker: {
    height: 40,
    width: '100%',
    marginBottom: 10,
  },
  guardarButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
});

export default AgregarDocenteScreen;
