import { Component } from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={require('./imagenes/40Años.png')}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <Text style={styles.tituloImagen}>
            {excursion.nombre}
          </Text>
        </ImageBackground>

        <Card.Content>
          <Text style={styles.descripcion}>
            {excursion.descripcion}
          </Text>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES
    };
  }

  render() {
    const { excursionId } = this.props.route.params;

    return <RenderExcursion excursion={this.state.excursiones[+excursionId]} />;
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },

  imageBackground: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    resizeMode: 'cover',
  },

  tituloImagen: {
    color: 'chocolate',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default DetalleExcursion;