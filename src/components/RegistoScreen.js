import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'https://localhost:7284/api/usuario/registro';

const RegistroScreen = ({ navigation, route }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const { role } = route.params;
  
    const handleRegistro = async () => {
      try {
        await axios.post(API_URL, {
          NombreUsuario: nombreUsuario,
          CorreoElectronico: correoElectronico,
          Contrasena: contrasena,
          Rol: role,
        });
        Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Error', 'No se pudo completar el registro');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Registro {role}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      <TouchableOpacity onPress={handleRegistro} style={styles.registroButton}>
        <Text style={styles.registroButtonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  registroButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  registroButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegistroScreen;
