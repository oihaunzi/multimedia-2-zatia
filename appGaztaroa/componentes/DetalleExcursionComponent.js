import { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import { Card, Divider, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';

import { baseUrl } from '../comun/comun';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
  };
};

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
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

        <View style={styles.iconoContainer}>
          <IconButton
            icon={props.favorita ? 'heart' : 'heart-outline'}
            size={28}
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPress()
            }
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  return (
    <Card style={styles.card}>
      <Card.Title title="Comentarios" />

      <Card.Content>
        {comentarios.map((comentario, index) => {
          const fecha = new Date(comentario.fecha).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          const hora = new Date(comentario.fecha).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <View key={comentario.id}>
              <View style={styles.comentario}>
                <Text style={styles.textoComentario}>
                  {comentario.comentario}
                </Text>

                <Text style={styles.valoracion}>
                  {comentario.valoracion} estrellas
                </Text>

                <Text style={styles.autorComentario}>
                  -- {comentario.autor}, {fecha}, {hora}
                </Text>
              </View>

              {index < comentarios.length - 1 ? <Divider /> : null}
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({
      favoritos: this.state.favoritos.concat(excursionId),
    });
  }

  render() {
    const { excursionId } = this.props.route.params;

    const excursion = this.props.excursiones.excursiones.filter(
      (excursion) => excursion.id === excursionId
    )[0];

    const comentarios = this.props.comentarios.comentarios.filter(
      (comentario) => comentario.excursionId === excursionId
    );

    return (
      <ScrollView>
        <RenderExcursion
          excursion={excursion}
          favorita={this.state.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />

        <RenderComentario comentarios={comentarios} />
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
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },

  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },

  comentario: {
    marginBottom: 10,
    paddingVertical: 8,
  },

  textoComentario: {
    marginBottom: 4,
  },

  valoracion: {
    marginBottom: 4,
  },

  autorComentario: {
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default connect(mapStateToProps)(DetalleExcursion);