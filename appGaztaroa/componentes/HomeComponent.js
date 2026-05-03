import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={require('./imagenes/40Años.png')}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <Text style={styles.tituloImagen}>
          {item.nombre}
        </Text>
      </ImageBackground>

      <Card.Content>
        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>
      </Card.Content>
    </Card>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      cabeceras: CABECERAS,
      actividades: ACTIVIDADES,
    };
  }

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.state.cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.state.excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.state.actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
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

export default Home;