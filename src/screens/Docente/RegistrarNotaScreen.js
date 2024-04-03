import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker, TextInput, ScrollView } from 'react-native';
import axios from 'axios';

const RegistrarNotaScreen = ({ navigation }) => {

  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('');
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [periodoAcademico, setPeriodoAcademico] = useState('');
  const [tipoNota, setTipoNota] = useState('');
  const [valorNota, setValorNota] = useState('');
  const [descripcionNota, setDescripcionNota] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEstudiantes = await axios.get(
          'https://localhost:7284/api/candidatoEstudiante'
        );
        const resCursos = await axios.get('https://localhost:7284/api/cursos');
        const resMaterias = await axios.get('https://localhost:7284/api/materia');
        setEstudiantes(resEstudiantes.data);
        setCursos(resCursos.data);
        setMaterias(resMaterias.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleGuardarDatos = async () => {
    setMensajeExito('');
    setMensajeAdvertencia('');
    
    if (
      !estudianteSeleccionado ||
      !cursoSeleccionado ||
      !materiaSeleccionada ||
      !valorNota ||
      !tipoNota ||
      !descripcionNota
    ) {
      setMensajeAdvertencia('Todos los campos son obligatorios');
      return;
    }

    const notaData = {
      Estudiante: estudianteSeleccionado,
      Curso: cursoSeleccionado,
      Materia: materiaSeleccionada,
      PeriodoAcademico: periodoAcademico,
      TipoNota: tipoNota,
      ValorNota: parseInt(valorNota),
      DescripcionNota: descripcionNota,
    };

    try {
      const response = await axios.post(
        'https://localhost:7284/api/notas',
        notaData
      );
      setMensajeExito('Nota guardada con éxito');
      console.log('Nota guardada:', response.data);
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      setMensajeAdvertencia('Error al guardar la nota');
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Nota</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={estudianteSeleccionado}
            onValueChange={(itemValue) => setEstudianteSeleccionado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione Estudiante" value="" />
            {estudiantes.map((estudiante) => (
              <Picker.Item
                key={estudiante.id}
                label={`${estudiante.nombre} ${estudiante.apellido}`} // Corrección en la interpolación
                value={estudiante.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={cursoSeleccionado}
            onValueChange={(itemValue) => setCursoSeleccionado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione Curso" value="" />
            {cursos.map((curso) => (
              <Picker.Item key={curso.id} label={curso.codigoCurso} value={curso.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={materiaSeleccionada}
            onValueChange={(itemValue) => setMateriaSeleccionada(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione Materia" value="" />
            {materias.map((materia) => (
              <Picker.Item
                key={materia.id}
                label={materia.nombre}
                value={materia.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={periodoAcademico}
            onValueChange={(itemValue) => setPeriodoAcademico(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione Período" value="" />
            <Picker.Item label="Primer Periodo" value="Primer Periodo" />
            <Picker.Item label="Segundo Periodo" value="Segundo Periodo" />
            <Picker.Item label="Tercer Periodo" value="Tercer Periodo" />
            <Picker.Item label="Cuarto Periodo" value="Cuarto Periodo" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoNota}
            onValueChange={(itemValue) => setTipoNota(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione Tipo de Nota" value="" />
            <Picker.Item label="Asistencia" value="Asistencia" />
            <Picker.Item label="Evaluacion" value="Evaluacion" />
            <Picker.Item label="Tareas" value="Tareas" />
            <Picker.Item label="Comportamiento" value="Comportamiento" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Valor de Nota"
          value={valorNota}
          onChangeText={setValorNota}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Descripción de la Nota"
          value={descripcionNota}
          onChangeText={setDescripcionNota}
        />

        <TouchableOpacity onPress={handleGuardarDatos} style={styles.guardarButton}>
          <Text style={styles.guardarButtonText}>Guardar Datos</Text>
        </TouchableOpacity>

        {mensajeExito ? <Text style={styles.mensajeExito}>{mensajeExito}</Text> : null}
        {mensajeAdvertencia ? <Text style={styles.mensajeAdvertencia}>{mensajeAdvertencia}</Text> : null}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2c3e50',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  guardarButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  guardarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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

export default RegistrarNotaScreen;




