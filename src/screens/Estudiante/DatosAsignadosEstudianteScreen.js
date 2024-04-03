import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Picker } from 'react-native';
import axios from 'axios';

const DatosAsignadosEstudianteScreen = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [selectedAsignacionEstudianteId, setSelectedAsignacionEstudianteId] = useState('');
  const [asignacion, setAsignacion] = useState(null);

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        const response = await axios.get('https://localhost:7284/api/asignacionestudiante');
        setAsignaciones(response.data);
        if (response.data.length > 0) {// Asegurarse de que el primer elemento y su ID existen
          setSelectedAsignacionEstudianteId(String(response.data[0]));
        }
      } catch (error) {
        console.error('Error al obtener las asignaciones:', error);
      }
    };
    fetchAsignaciones();
  }, []);

  useEffect(() => {
    if (!selectedAsignacionEstudianteId) {
      return;
    }
    const fetchAsignacionDetalle = async () => {
      try {
        const response = await axios.get(`https://localhost:7284/api/asignacionestudiante/${selectedAsignacionEstudianteId}`);
        setAsignacion(response.data);
      } catch (error) {
        console.error(`Error al obtener la asignación con ID ${selectedAsignacionEstudianteId}:`, error);
      }
    };
    fetchAsignacionDetalle();
  }, [selectedAsignacionEstudianteId]);

  if (!asignacion) {
    return <Text style={styles.loadingText}>Cargando asignación...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pickerContainer}>
      <Picker
          selectedValue={selectedAsignacionEstudianteId}
          onValueChange={(itemValue) => setSelectedAsignacionEstudianteId(itemValue)}
          style={styles.picker}
      >
          {asignaciones.map((id) => (
              <Picker.Item key={id} label={`ID: ${id}`} value={String(id)} />
          ))}
      </Picker>
      </View>

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Estudiante</Text>
        </View>
        {renderRow('Nombre', `${asignacion.candidatoEstudiante.nombre} ${asignacion.candidatoEstudiante.apellido}`)}
        
        <View style={styles.headerRow}>
          <Text style={styles.header}>Horarios</Text>
        </View>
            {renderRow('Día Semana', asignacion.horarios.diaSemana)}
            {renderRow('Hora Inicio', asignacion.horarios.horaInicio)}
            {renderRow('Hora Fin', asignacion.horarios.horaFin)}
            {renderRow('Período Académico', asignacion.horarios.periodoAcademico)}
            {renderRow('Grupo Sección', asignacion.horarios.grupoSeccion)}
            {renderRow('Fecha Inicio Clases', asignacion.horarios.fechaInicioClases)}
            {renderRow('Fecha Fin Clases', asignacion.horarios.fechaFinClases)}
            {renderRow('Duración Clase (minutos)', asignacion.horarios.duracionClaseMinutos)}
            {renderRow('Notificación Cambio Horario', asignacion.horarios.notificacionCambioHorario)}

        <View style={styles.headerRow}>
          <Text style={styles.header}>Aula</Text>
        </View>
            {renderRow('Nombre/Número', asignacion.aulas.nombreNumero)}
            {renderRow('Ubicación', asignacion.aulas.ubicacion)}
            {renderRow('Capacidad', asignacion.aulas.capacidad)}
            {renderRow('Tipo de Aula', asignacion.aulas.tipoAula)}
            {renderRow('Estado del Aula', asignacion.aulas.estadoAula)}
            {renderRow('Horario Disponibilidad', asignacion.aulas.horarioDisponibilidad)}
            {renderRow('Registros Incidentes/Problemas', asignacion.aulas.registrosIncidentesProblemas)}


        <View style={styles.headerRow}>
          <Text style={styles.header}>Curso</Text>
        </View>
            {renderRow('Código del Curso', asignacion.cursos.codigoCurso)}
            {renderRow('Descripción', asignacion.cursos.descripcion)}
            {renderRow('Departamento Académico', asignacion.cursos.departamentoAcademico)}
            {renderRow('Nivel', asignacion.cursos.nivel)}
            {renderRow('Métodos de Enseñanza', asignacion.cursos.metodosEnsenanza)}
            {renderRow('Año', asignacion.cursos.año)}
            {renderRow('Cupo Máximo', asignacion.cursos.cupoMaximo)}
            {renderRow('Cupo Actual', asignacion.cursos.cupoActual)}
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

export default DatosAsignadosEstudianteScreen;
