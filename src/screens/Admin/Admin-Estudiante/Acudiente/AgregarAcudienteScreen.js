import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';

const AgregarAcudienteScreen = ({ navigation }) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');

  const [edad, setEdad] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [relacionConEstudiante, setRelacionEstudiante] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');

  const [numeroIdentificacionEstudiante, setNumeroIdentificacionEstudiante] = useState('');

  const handleGuardarAcudiente = () => {
    // Realizar validaciones antes de guardar
    if (!nombres || !apellidos || !numeroIdentificacionEstudiante) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    const dataAcudientes = {
      nombres,
      apellidos,
      numeroIdentificacionEstudiante: parseInt(numeroIdentificacionEstudiante),
      edad,
      correoElectronico,
      relacionConEstudiante,
      estadoCivil,
      ocupacion,
    };
  
    // Agregar fechaRegistro solo si tiene un valor
    if (fechaRegistro) {
      dataAcudientes.fechaRegistro = fechaRegistro;
    }
  
    // Realizar la solicitud POST al servidor
    fetch('https://localhost:7284/api/acudiente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Agrega cualquier otra cabecera necesaria
      },
      body: JSON.stringify(dataAcudientes),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Acudiente guardado con éxito:', result);
        setMensajeExito('¡Datos guardados con éxito!');
        // Puedes hacer algo con la respuesta del servidor si es necesario
      })
      .catch(error => {
        console.error('Error al guardar el acudiente:', error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Acudiente</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Numero de Identificación"
        keyboardType="numeric"
        value={numeroIdentificacion}
        onChangeText={setNumeroIdentificacion}
      />
      <TextInput
        style={styles.input}
        placeholder="Numero de Identificación Estudiante"
        keyboardType="numeric"
        value={numeroIdentificacionEstudiante}
        onChangeText={setNumeroIdentificacionEstudiante}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
      />
      <TextInput
        style={styles.input}
        placeholder="Relación con el estudiante"
        value={relacionConEstudiante}
        onChangeText={setRelacionEstudiante}
      />
      <View style={styles.input}>
        <Text style={styles.pickerLabel}>Estado Civil</Text>
        <Picker
          selectedValue={estadoCivil}
          style={styles.picker}
          onValueChange={(itemValue) => setEstadoCivil(itemValue)}
        >
          <Picker.Item label="Soltero(a)" value="Soltero(a)" />
          <Picker.Item label="Casado(a)" value="Casado(a)" />
          <Picker.Item label="Divorciado(a)" value="Divorciado(a)" />
          <Picker.Item label="Viudo(a)" value="Viudo(a)" />
          <Picker.Item label="Separado(a)" value="Separado(a)" />
          <Picker.Item label="Conviviente o Unión Libre" value="Conviviente o Unión Libre" />
          <Picker.Item label="Comprometido(a)" value="Comprometido(a)" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Ocupación"
        value={ocupacion}
        onChangeText={setOcupacion}
      />
      <DatePicker
        style={styles.input}
        date={fechaRegistro}
        mode="date"
        placeholder="Fecha de Registro"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate={new Date()}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => setFechaRegistro(date)}
      />
      <TouchableOpacity onPress={handleGuardarAcudiente} style={styles.guardarButton}>
        <Text style={styles.buttonText}>Guardar Acudiente</Text>
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
  navigationButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  mensajeExito: {
    color: 'green',
    marginTop: 10,
  },
});

export default AgregarAcudienteScreen;
