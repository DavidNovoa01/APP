import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoleSelectionScreen from './src/components/RoleSelectionScreen';
import LoginScreen from './src/components/LoginScreen';
import EstudianteInicio from './src/screens/Estudiante/EstudianteInicio';
import DocenteInicio from './src/screens/Docente/DocenteInicio';
import AdminInicio from './src/screens/Admin/AdminInicio';
import EstudiantesScreen from './src/screens/Admin/Admin-Estudiante/EstudiantesScreen';
import DocentesScreen from './src/screens/Admin/Admin-Docente/DocentesScreen';
import CursosScreen from './src/screens/Admin/Admin-PlanEstudio/CursosScreen';
import AgregarEstudianteScreen from './src/screens/Admin/Admin-Estudiante/AgregarEstudianteScreen';
import AgregarDocenteScreen from './src/screens/Admin/Admin-Docente/AgregarDocenteScreen';
import AgregarAcudienteScreen from './src/screens/Admin/Admin-Estudiante/Acudiente/AgregarAcudienteScreen';
import TelefonoFormulario from './src/screens/Admin/Admin-Estudiante/Acudiente/TelefonoFormulario';
import DireccionFormulario from './src/screens/Admin/Admin-Estudiante/Acudiente/TelefonoFormulario';
import ReclamosScreen from './src/screens/Admin/ReclamosScreen';  
import PlanEstudiosScreen from './src/screens/Admin/Admin-PlanEstudio/PlanEstudiosScreen';
import AgregarCursosScreen from './src/screens/Admin/Admin-PlanEstudio/AgregarCursosScreen';
import AgregarAulasScreen from './src/screens/Admin/Admin-PlanEstudio/AgregarAulasScreen';
import AgregarMateriasScreen from './src/screens/Admin/Admin-PlanEstudio/AgregarMateriasScreen';
import AgregarHorariosScreen from './src/screens/Admin/Admin-PlanEstudio/AgregarHorariosScreen';

import RegistrarNotaScreen from './src/screens/Docente/RegistrarNotaScreen';

import ListaDocenteScreen from './src/screens/Admin/Admin-Docente/ListaDocenteScreen';
import ListaEstudianteScreen from './src/screens/Admin/Admin-Estudiante/ListaEstudianteScreen';
import ListaAcudientesScreen from './src/screens/Admin/Admin-Estudiante/Acudiente/ListaAcudientesScreen';

import EditarEstudianteScreen from './src/screens/Admin/Admin-Estudiante/EditarEstudianteScreen';
import EditarAcudienteScreen from './src/screens/Admin/Admin-Estudiante/Acudiente/EditarAcudienteScreen';
import EditarDocenteScreen from './src/screens/Admin/Admin-Docente/EditarDocenteScreen';

import ObservarNotasScreen from './src/screens/Estudiante/ObservarNotasScreen';

import ListaAulasScreen from './src/screens/Admin/Admin-PlanEstudio/ListaAulasScreen';
import ListaMateriasScreen from './src/screens/Admin/Admin-PlanEstudio/ListaMateriasScreen';
import ListaCursosScreen from './src/screens/Admin/Admin-PlanEstudio/ListaCursosScreen';  
import ListaHorariosScreen from './src/screens/Admin/Admin-PlanEstudio/ListaHorariosScreen';

import SeleccionarCursoScreen from './src/screens/Docente/SeleccionarCursoScreen';
import SeleccionarEstudianteScreen from './src/screens/Docente/SeleccionarEstudianteScreen';

import DetallesAcudiente from './src/screens/Admin/Admin-Estudiante/DetallesAcudiente';

import AsignacionScreen from './src/screens/Admin/Admin-Docente/AsignacionScreen';

import RegistroScreen from './src/components/RegistoScreen';

import VisualizacionNotasScreen from './src/screens/Docente/VisualizacionNotasScreen';
import EditarNotasScreen from './src/screens/Docente/EditarNotasScreen';  

import RegistrarDireccionScreen from './src/screens/Admin/Admin-Estudiante/Acudiente/RegistrarDireccionScreen';
import RegistrarTelefonoScreen from './src/screens/Admin/Admin-Estudiante/Acudiente/RegistrarTelefonoScreen';

import EditarAulaScreen from './src/screens/Admin/Admin-PlanEstudio/EditarAulaScreen';
import EditarHorarioScreen from './src/screens/Admin/Admin-PlanEstudio/EditarHorarioScreen';
import EditarCursoScreen from './src/screens/Admin/Admin-PlanEstudio/EditarCursoScreen';
import EditarMateriaScreen from './src/screens/Admin/Admin-PlanEstudio/EditarMateriaScreen';

import DatosAsignadosDocenteScreen from './src/screens/Docente/DatosAsignadosDocenteScreen';
import DatosAsignadosEstudianteScreen from './src/screens/Estudiante/DatosAsignadosEstudianteScreen';

import AsignacionEstudianteScreen from './src/screens/Admin/Admin-Estudiante/AsignacionEstudianteScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RoleSelection">

        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EstudianteInicio" component={EstudianteInicio} />
        <Stack.Screen name="DocenteInicio" component={DocenteInicio} />
        <Stack.Screen name="AdminInicio" component={AdminInicio} />
        <Stack.Screen name="EstudiantesScreen" component={EstudiantesScreen} />
        <Stack.Screen name="DocentesScreen" component={DocentesScreen} />
        <Stack.Screen name="CursosScreen" component={CursosScreen} />
        <Stack.Screen name="AgregarEstudianteScreen" component={AgregarEstudianteScreen} />
        <Stack.Screen name="AgregarDocenteScreen" component={AgregarDocenteScreen} />
        <Stack.Screen name="AgregarAcudienteScreen" component={AgregarAcudienteScreen} />
        <Stack.Screen name="TelefonoFormulario" component={TelefonoFormulario} />
        <Stack.Screen name="DireccionFormulario" component={DireccionFormulario} />
        <Stack.Screen name="ReclamosScreen" component={ReclamosScreen} />
        <Stack.Screen name="PlanEstudiosScreen" component={PlanEstudiosScreen} />
        <Stack.Screen name="AgregarCursosScreen" component={AgregarCursosScreen} />
        <Stack.Screen name="AgregarAulasScreen" component={AgregarAulasScreen} />
        <Stack.Screen name="AgregarMateriasScreen" component={AgregarMateriasScreen} />
        <Stack.Screen name="AgregarHorariosScreen" component={AgregarHorariosScreen} />

        <Stack.Screen name="RegistrarNotaScreen" component={RegistrarNotaScreen} />

        <Stack.Screen name="ListaDocenteScreen" component={ListaDocenteScreen} />
        <Stack.Screen name="ListaEstudianteScreen" component={ListaEstudianteScreen} />
        <Stack.Screen name="ListaAcudientesScreen" component={ListaAcudientesScreen} />


        <Stack.Screen name="EditarEstudianteScreen" component={EditarEstudianteScreen} />
        <Stack.Screen name="EditarAcudienteScreen" component={EditarAcudienteScreen} />
        <Stack.Screen name="EditarDocenteScreen" component={EditarDocenteScreen} />

        <Stack.Screen name="ObservarNotasScreen" component={ObservarNotasScreen}/>

        <Stack.Screen name="ListaAulasScreen" component={ListaAulasScreen} />
        <Stack.Screen name="ListaMateriasScreen" component={ListaMateriasScreen} />
        <Stack.Screen name="ListaCursosScreen" component={ListaCursosScreen} />
        <Stack.Screen name="ListaHorariosScreen" component={ListaHorariosScreen} />

        <Stack.Screen name="SeleccionarCursoScreen" component={SeleccionarCursoScreen} />
        <Stack.Screen name="SeleccionarEstudianteScreen" component={SeleccionarEstudianteScreen} />

        <Stack.Screen name="DetallesAcudiente" component={DetallesAcudiente} />

        <Stack.Screen name="AsignacionScreen" component={AsignacionScreen} />

        <Stack.Screen name="Registro" component={RegistroScreen} />

        <Stack.Screen name="VisualizacionNotasScreen" component={VisualizacionNotasScreen} />
        <Stack.Screen name="EditarNotasScreen" component={EditarNotasScreen} />

        <Stack.Screen name="RegistrarDireccionScreen" component={RegistrarDireccionScreen} />
        <Stack.Screen name="RegistrarTelefonoScreen" component={RegistrarTelefonoScreen} />

        <Stack.Screen name="EditarAulaScreen" component={EditarAulaScreen} />
        <Stack.Screen name="EditarCursoScreen" component={EditarCursoScreen} />
        <Stack.Screen name="EditarHorarioScreen" component={EditarHorarioScreen} />
        <Stack.Screen name="EditarMateriaScreen" component={EditarMateriaScreen} />

        <Stack.Screen name="DatosAsignadosDocenteScreen" component={DatosAsignadosDocenteScreen} />

        <Stack.Screen name="DatosAsignadosEstudianteScreen" component={DatosAsignadosEstudianteScreen} />
        <Stack.Screen name="AsignacionEstudianteScreen" component={AsignacionEstudianteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



