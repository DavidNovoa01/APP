import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Picker } from 'react-native';
import axios from 'axios';

const DatosAsignadosDocenteScreen = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [selectedAsignacionId, setSelectedAsignacionId] = useState('');
  const [asignacion, setAsignacion] = useState(null); // Estado agregado para la asignación seleccionada

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        const response = await axios.get('https://localhost:7284/api/asignaciondocente');
        setAsignaciones(response.data);
        if (response.data.length > 0) {
          setSelectedAsignacionId(String(response.data[0]));
        }
      } catch (error) {
        console.error('Error al obtener las asignaciones:', error);
      }
    };

    fetchAsignaciones();
  }, []);

  useEffect(() => {
    if (!selectedAsignacionId) {
      return;
    }
    const fetchAsignacionDetalle = async () => {
      try {
        const response = await axios.get(`https://localhost:7284/api/asignaciondocente/${selectedAsignacionId}`);
        setAsignacion(response.data);
      } catch (error) {
        console.error(`Error al obtener la asignación con ID ${selectedAsignacionId}:`, error);
      }
    };

    fetchAsignacionDetalle();
  }, [selectedAsignacionId]);

  if (!asignacion) {
    return <Text style={styles.loadingText}>Cargando asignación...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAsignacionId}
          onValueChange={(itemValue) => setSelectedAsignacionId(itemValue)}
          style={styles.picker}
        >
          {asignaciones.map((id) => (
            <Picker.Item key={id} label={`ID: ${id}`} value={String(id)} />
          ))}
        </Picker>
      </View>
      {/* Aquí podrías mostrar más información basada en el ID seleccionado */}

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Docente</Text>
        </View>
        {renderRow('Nombre', `${asignacion.docente.nombres} ${asignacion.docente.apellidos}`)}
        
        <View style={styles.headerRow}>
          <Text style={styles.header}>Materia</Text>
        </View>
        {renderRow('Nombre', asignacion.materia.nombre)}
        {renderRow('Descripción', asignacion.materia.descripcion)}
        {renderRow('Departamento', asignacion.materia.departamentoAcademico)}
        {renderRow('Nivel', asignacion.materia.nivel)}
        {renderRow('Estado', asignacion.materia.estado)}
        {renderRow('Métodos de Enseñanza', asignacion.materia.metodosEnsenanza)}
        
        
        
        <View style={styles.headerRow}>
          <Text style={styles.header}>Curso</Text>
        </View>
        {renderRow('Código del Curso', asignacion.curso.codigoCurso)}
        {renderRow('Nivel', asignacion.curso.nivel)}
        {renderRow('Modalidad', asignacion.curso.modalidad)}
        {renderRow('Descripción', asignacion.curso.descripcion)}
        {renderRow('Estado', asignacion.curso.estado)}
      </View>

    </ScrollView>
  );
};

const renderRow = (label, value) => {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  loadingText: {
    alignSelf: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  table: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4fc',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  label: {
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#000',
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    width: '50%',
  },
  value: {
    padding: 8,
    width: '50%',
  },
  // ... otros estilos que necesites
});

export default DatosAsignadosDocenteScreen;