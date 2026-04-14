import React, { Component } from 'react';
import { View } from 'react-native';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      seleccionExcursion: null,
    };
  }

  onSeleccionExcursion = (excursionId) => {
    this.setState({ seleccionExcursion: excursionId });
  };

  render() {
    const excursionSeleccionada = this.state.excursiones.find(
      (excursion) => excursion.id === this.state.seleccionExcursion
    );

    return (
      <View style={{ flex: 1 }}>
        <DetalleExcursion excursion={excursionSeleccionada} />
        <Calendario
          excursiones={this.state.excursiones}
          onPress={this.onSeleccionExcursion}
        />
      </View>
    );
  }
}

export default Campobase;