import { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Card,
  Divider,
  IconButton,
  TextInput,
  Button,
} from 'react-native-paper';
import { connect } from 'react-redux';

import { baseUrl } from '../comun/comun';
import { postFavorito, postComentario } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),

  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario)),
});

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
                : props.onPressFavorito()
            }
          />

          <IconButton
            icon="pencil"
            size={28}
            onPress={() => props.onPressComentario()}
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
          const fechaComentario = comentario.fecha || comentario.dia;

          const fecha = new Date(fechaComentario).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          const hora = new Date(fechaComentario).toLocaleTimeString('es-ES', {
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
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    };

    this.marcarFavorito = this.marcarFavorito.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.gestionarComentario = this.gestionarComentario.bind(this);
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    });
  }

  gestionarComentario(excursionId) {
    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );

    this.resetForm();
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
          favorita={this.props.favoritos.favoritos.some((el) => el === excursionId)}
          onPressFavorito={() => this.marcarFavorito(excursionId)}
          onPressComentario={() => this.toggleModal()}
        />

        <RenderComentario comentarios={comentarios} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.resetForm()}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>
              Añadir comentario
            </Text>

            <View style={styles.estrellasContainer}>
              {[1, 2, 3, 4, 5].map((valor) => (
                <IconButton
                  key={valor}
                  icon={valor <= this.state.valoracion ? 'star' : 'star-outline'}
                  size={30}
                  iconColor="#f2c230"
                  onPress={() => this.setState({ valoracion: valor })}
                />
              ))}
            </View>

            <Text style={styles.textoValoracion}>
              {this.state.valoracion} estrellas
            </Text>

            <TextInput
              label="Autor"
              value={this.state.autor}
              onChangeText={(autor) => this.setState({ autor })}
              mode="outlined"
              left={<TextInput.Icon icon="account" />}
              style={styles.input}
            />

            <TextInput
              label="Comentario"
              value={this.state.comentario}
              onChangeText={(comentario) => this.setState({ comentario })}
              mode="outlined"
              left={<TextInput.Icon icon="comment" />}
              multiline
              style={styles.input}
            />

            <View style={styles.botonesModal}>
              <Button
                mode="outlined"
                onPress={() => this.resetForm()}
              >
                Cancelar
              </Button>

              <Button
                mode="contained"
                onPress={() => this.gestionarComentario(excursionId)}
              >
                Enviar
              </Button>
            </View>
          </View>
        </Modal>
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
    flexDirection: 'row',
    justifyContent: 'center',
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

  modalContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  estrellasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },

  textoValoracion: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    marginBottom: 15,
  },

  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);