import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ route, navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  // Extraer el rol seleccionado de los parámetros de navegación
  const { role } = route.params;

  useEffect(() => {
    // Puedes realizar alguna acción cuando la pantalla se carga, si es necesario
    // Por ejemplo, puedes mostrar un saludo al usuario aquí
    console.log(`Bienvenido ${role}!`);
  }, [role]);

  const getIconByRole = () => {
    switch (role) {
      case 'Estudiante':
        return <Icon name="smile-o" size={50} color="#3498db" style={styles.userIcon} />;
      case 'Maestro':
        return <Icon name="graduation-cap" size={50} color="#3498db" style={styles.userIcon} />;
      case 'Administrador':
        return <Icon name="users" size={50} color="#3498db" style={styles.userIcon} />;
      default:
        return <Icon name="user-circle" size={50} color="#3498db" style={styles.userIcon} />;
    }
  };

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí
    console.log('Iniciar sesión con:', usuario, clave, role);

    // Después de iniciar sesión, puedes navegar a otra pantalla si es necesario
    // navigation.navigate('OtraPantalla');
    switch (role) {
      case 'Estudiante':
        navigation.navigate('EstudianteInicio'); // Cambia 'EstudianteInicio' por el nombre de tu pantalla para estudiantes
        break;
      case 'Maestro':
        navigation.navigate('MaestroInicio'); // Cambia 'MaestroInicio' por el nombre de tu pantalla para maestros
        break;
      case 'Administrador':
        navigation.navigate('AdminInicio'); // Cambia 'AdminInicio' por el nombre de tu pantalla para administradores
        break;
      default:
        // Redirección por defecto, si no se encuentra un rol válido
        navigation.navigate('RoleSelectionScreen'); // Cambia 'Inicio' por el nombre de tu pantalla principal
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View>{getIconByRole()}</View>

      <View>
        <Text style={styles.loginText}>Bienvenido {role}</Text>
      </View>

      <View>
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
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Color de fondo
    padding: 20,
  },
  userIcon: {
    marginBottom: 10,
  },
  loginText: {
    fontSize: 18,
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
  },
  forgotPassword: {
    color: '#3498db',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;