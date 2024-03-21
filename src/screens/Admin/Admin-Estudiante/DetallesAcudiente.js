const DetallesAcudiente = ({ route }) => {
    const { acudientes } = route.params;
  
    return (
      <View>
        {acudientes.map((acudiente) => (
          <TouchableOpacity key={acudiente.acudienteId} onPress={() => handleVerAcudiente(acudiente.acudienteId)}>
            <Text>{acudiente.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

export default DetallesAcudiente;