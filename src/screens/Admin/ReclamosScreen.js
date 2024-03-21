import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

const ReclamosScreen = ({ navigation }) => {
  const [comentario, setComentario] = useState('');

  const handleEnviarComentario = async () => {
    const emailSubject = 'Nuevo comentario';
    const emailAddress = 'dt0578131@gmail.com';
    try {
      await MailComposer.composeAsync({
        recipients: [emailAddress],
        subject: emailSubject,
        body: comentario,
      });
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Envía tus comentarios</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Escribe tu comentario aquí"
        value={comentario}
        onChangeText={setComentario}
      />
      <TouchableOpacity onPress={handleEnviarComentario} style={styles.enviarButton}>
        <Text style={styles.buttonText}>Enviar Comentario</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    width: '100%',
  },
  enviarButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ReclamosScreen;



