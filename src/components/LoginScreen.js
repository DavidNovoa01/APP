import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://localhost:7284/api/usuario/login';

const LoginScreen = ({ navigation, route }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const { role } = route.params;

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_URL, {
        NombreUsuario: usuario,
        Contrasena: clave
      });
      const { token } = response.data;
      await AsyncStorage.setItem('userToken', token);
      navigateBasedOnRole(role);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      } else {
        Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión');
      }
    }
  };

  const navigateBasedOnRole = (rol) => {
    switch (rol) {
      case 'Estudiante':
        navigation.navigate('EstudianteInicio');
        break;
      case 'Docente':
        navigation.navigate('DocenteInicio');
        break;
      case 'Administrador':
        navigation.navigate('AdminInicio');
        break;
      default:
        Alert.alert('Error', 'Rol no reconocido');
        break;
    }
  };

  const getIconByRole = () => {
    switch (role) {
      case 'Estudiante':
        return <Icon name="user" size={50} color="#3498db" />;
      case 'Docente':
        return <Icon name="user" size={50} color="#3498db" />;
      case 'Administrador':
        return <Icon name="user" size={50} color="#3498db" />;
      default:
        return <Icon name="user" size={50} color="#3498db" />;
    }
  };

  return (
    <View style={styles.container}>
      <View>{getIconByRole()}</View>

      <Text style={styles.headerText}>Inicio de sesión - {role}</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={clave}
        onChangeText={setClave}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {role === 'Estudiante' && (
        <TouchableOpacity onPress={() => navigation.navigate('EstudianteInicio')} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>IngresoLIBRE</Text>
        </TouchableOpacity>
      )}

      {role === 'Docente' && (
        <TouchableOpacity onPress={() => navigation.navigate('DocenteInicio')} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>IngresoLIBRE</Text>
        </TouchableOpacity>
      )}

      {role === 'Administrador' && (
        <TouchableOpacity onPress={() => navigation.navigate('AdminInicio')} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>IngresoLIBRE</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Registro', { role })} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Registrarse como {role}</Text>
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    width: '80%',
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;




