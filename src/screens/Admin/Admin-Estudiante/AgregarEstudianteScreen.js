import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

const AgregarEstudianteScreen = ({ navigation, route }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [tipoPersona, setTipoPersona] = useState('Seleccionar Tipo de Estudiante');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [genero, setGenero] = useState('');
  const [adjuntarDocumentos, setAdjuntarDocumentos] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [numeroIdentificacionAcudiente, setNumeroIdentificacionAcudiente] = useState('');

  const handleGuardarEstudiante = () => {
    if (!nombre || !apellido || !numeroDocumento) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const dataEstudiante = {
      nombre,
      apellido,
      tipoPersona: tipoPersona !== 'Seleccionar Tipo de Estudiante' ? tipoPersona : '',
      tipoDocumento: tipoDocumento !== 'Seleccionar Tipo de Documento' ? tipoDocumento : '',
      numeroDocumento,
      numeroContacto,
      direccion,
      genero: genero !== 'Seleccionar Genero' ? genero : '',
      adjuntarDocumentos,
      numeroIdentificacionAcudiente: parseInt(numeroIdentificacionAcudiente),
    };

    axios.post('https://localhost:7284/api/candidatoEstudiante', dataEstudiante, {
      headers: {
        'Content-Type': 'application/json',
        // Agrega cualquier otra cabecera necesaria
      },
    })
      .then(response => {
        console.log('Estudiante guardado con éxito:', response.data);
        setMensajeExito('¡Datos guardados con éxito!');
        // Puedes hacer algo con la respuesta del servidor si es necesario
      })
      .catch(error => {
        console.error('Error al guardar el estudiante:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Estudiante</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Tipo de Estudiante</Text>
        <Picker
          selectedValue={tipoPersona}
          style={styles.picker}
          onValueChange={(itemValue) => setTipoPersona(itemValue)}
        >
          <Picker.Item label="Seleccionar Tipo de Estudiante" value="Seleccionar Tipo de Estudiante" />
          <Picker.Item label="Estudiante Nuevo" value="Estudiante Nuevo" />
          <Picker.Item label="Estudiante Antiguo" value="Estudiante Antiguo" />
          <Picker.Item label="Estudiante de Intercambio" value="Estudiante de Intercambio" />
        </Picker>
      </View>
      
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Tipo de Documento</Text>
        <Picker
          selectedValue={tipoDocumento}
          style={styles.picker}
          onValueChange={(itemValue) => setTipoDocumento(itemValue)}
        >
          <Picker.Item label="Seleccionar Tipo de Documento" value="Seleccionar Tipo de Documento" />
          <Picker.Item label="Cedula de ciudadanía" value="Cedula de ciudadanía" />
          <Picker.Item label="Tarjeta de identidad" value="Tarjeta de identidad" />
          <Picker.Item label="Cedula de extranjería" value="Cedula de extranjería" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Número de Documento"
        keyboardType="numeric"
        maxLength={20}
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
      />
      <TextInput
        style={styles.input}
        placeholder="Numero de Contacto"
        keyboardType="numeric"
        maxLength={30}
        value={numeroContacto}
        onChangeText={setNumeroContacto}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        maxLength={30}
        value={direccion}
        onChangeText={setDireccion}
      />
      <DatePicker
        style={styles.input}
        date={fechaNacimiento}
        mode="date"
        placeholder="Seleccionar Fecha de Nacimiento"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate={new Date()}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => setFechaNacimiento(date)}
      />
      <TextInput
        style={styles.input}
        placeholder="Numero de Identificación Acudiente"
        keyboardType="numeric"
        value={numeroIdentificacionAcudiente}
        onChangeText={setNumeroIdentificacionAcudiente}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Genero</Text>
        <Picker
          selectedValue={genero}
          style={styles.picker}
          onValueChange={(itemValue) => setGenero(itemValue)}
        >
          <Picker.Item label="Seleccionar Genero" value="Seleccionar Genero" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
          <Picker.Item label="No binario" value="No binario" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>¿Adjunto todos los documentos?</Text>
        <Picker
          style={styles.picker}
          selectedValue={adjuntarDocumentos}
          onValueChange={(itemValue) => setAdjuntarDocumentos(itemValue)}
        >
          <Picker.Item label="Seleccionar una Opcion" value="Seleccionar una Opcion" />
          <Picker.Item label="Sí" value="Sí" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>
      <TouchableOpacity onPress={handleGuardarEstudiante} style={styles.guardarButton}>
        <Text>Guardar Estudiante</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('AgregarAcudienteScreen', { numeroDocumento })} style={styles.guardarButton}>
        <Text>Ir a Agregar Acudiente</Text>
      </TouchableOpacity>
      
      {mensajeExito ? (
        <Text style={styles.mensajeExito}>{mensajeExito}</Text>
      ) : null}
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
    color: 'green',
    marginTop: 10,
  },
});

export default AgregarEstudianteScreen;




