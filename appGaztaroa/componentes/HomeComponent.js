import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  };
};

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: baseUrl + item.imagen }}
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
  render() {
    const cabeceraDestacada = this.props.cabeceras.cabeceras.filter(
      (item) => item.destacado
    )[0];

    const excursionDestacada = this.props.excursiones.excursiones.filter(
      (item) => item.destacado
    )[0];

    const actividadDestacada = this.props.actividades.actividades.filter(
      (item) => item.destacado
    )[0];

    return (
      <ScrollView>
        <RenderItem item={cabeceraDestacada} />
        <RenderItem item={excursionDestacada} />
        <RenderItem item={actividadDestacada} />
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

export default connect(mapStateToProps)(Home);