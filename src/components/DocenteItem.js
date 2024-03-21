// components/DocenteItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DocenteItem = ({ docente, onDelete, onEdit }) => {
  return (
    <View>
      <Text>{docente.nombre}</Text>
      <Text>{docente.materia}</Text>
      <TouchableOpacity onPress={() => onDelete(docente.id)}>
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onEdit(docente)}>
        <Icon name="edit" size={20} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

export default DocenteItem;
