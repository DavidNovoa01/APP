import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoleSelectionScreen from './src/components/RoleSelectionScreen';
import LoginScreen from './src/components/LoginScreen';
import EstudianteInicio from './src/screens/EstudianteInicio';
import MaestroInicio from './src/screens/MaestroInicio';
import AdminInicio from './src/screens/AdminInicio';
import EstudiantesScreen from './src/screens/EstudiantesScreen';
import DocentesScreen from './src/screens/DocentesScreen';
import CursosScreen from './src/screens/CursosScreen';
import AgregarEstudianteScreen from './src/screens/AgregarEstudianteScreens';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RoleSelection">
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EstudianteInicio" component={EstudianteInicio} />
        <Stack.Screen name="MaestroInicio" component={MaestroInicio} />
        <Stack.Screen name="AdminInicio" component={AdminInicio} />
        <Stack.Screen name="EstudiantesScreen" component={EstudiantesScreen} />
        <Stack.Screen name="DocentesScreen" component={DocentesScreen} />
        <Stack.Screen name="CursosScreen" component={CursosScreen} />
        <Stack.Screen name="AgregarEstudianteScreen" component={AgregarEstudianteScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



