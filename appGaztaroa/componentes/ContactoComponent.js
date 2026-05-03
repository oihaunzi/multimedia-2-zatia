import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

class Contacto extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Información de contacto" titleStyle={styles.title} />
          <Card.Content>
            <Text style={styles.text}>Kaixo Mendizale!</Text>

            <Text style={styles.text}>
              Si quieres participar en las salidas de montaña que organizamos o
              quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a
              través de diferentes medios. Puedes llamarnos por teléfono los jueves
              de las semanas que hay salida (de 20:00 a 21:00). También puedes
              ponerte en contacto con nosotros escribiendo un correo electrónico, o
              utilizando la aplicación de esta página web. Y además puedes seguirnos
              en Facebook.
            </Text>

            <Text style={styles.text}>
              Para lo que quieras, estamos a tu disposición!
            </Text>

            <Text style={styles.text}>Tel: +34 948 277151</Text>
            <Text style={styles.text}>Email: gaztaroa@gaztaroa.com</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#eeeeee',
  },
  card: {
    margin: 10,
  },
  title: {
    textAlign: 'center',
  },
  text: {
    marginBottom: 15,
    fontSize: 14,
  },
});

export default Contacto;