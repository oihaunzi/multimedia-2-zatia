import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Card, List } from 'react-native-paper';
import { ACTIVIDADES } from '../comun/actividades';

function Historia() {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Un poquito de historia"
        titleStyle={styles.titulo}
        style={styles.cardTitle}
      />

      <Card.Content>
        <Text style={styles.texto}>
          El nacimiento del club de montaña Gaztaroa se remonta a la primavera de
          1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club
          juvenil decidieron crear la sección montañera de dicho club. Fueron unos
          comienzos duros debido sobre todo a la situación política de entonces.
          Gracias al esfuerzo económico de sus socios y socias se logró alquilar una
          bajera. Gaztaroa ya tenía su sede social.
        </Text>

        <Text style={styles.texto}>
          Desde aquí queremos hacer llegar nuestro agradecimiento a todos los
          montañeros y montañeras que alguna vez habéis pasado por el club aportando
          vuestro granito de arena.
        </Text>

        <Text style={styles.texto}>Gracias!</Text>
      </Card.Content>
    </Card>
  );
}

class QuienesSomos extends Component {
  renderActividad = ({ item }) => {
    return (
      <List.Item
        title={item.nombre}
        description={item.descripcion}
        descriptionNumberOfLines={10}
        left={() => (
          <Image
            source={require('./imagenes/40Años.png')}
            style={styles.icono}
          />
        )}
      />
    );
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={ACTIVIDADES}
        renderItem={this.renderActividad}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <Historia />

            <Card style={styles.card}>
              <Card.Title
                title='"Actividades y recursos"'
                titleStyle={styles.titulo}
                style={styles.cardTitle}
              />
            </Card>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },

  card: {
    margin: 8,
  },

  cardTitle: {
    alignItems: 'center',
  },

  titulo: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  texto: {
    marginBottom: 15,
    fontSize: 14,
  },

  icono: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginTop: 15,
    marginRight: 10,
  },
});

export default QuienesSomos;