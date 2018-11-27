import React, {Component} from 'react';
import { StyleSheet, Text, StatusBar, ScrollView, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ChartList from '../../components/ChartList';

const colores = {
  azul: {
    name: 'azul',
    color: '#0D508D'
  },
  gris: {
    name: 'gris',
    color: '#5E5E5E'
  },
  rosa: {
    name: 'rosa',
    color: '#C64A95'
  },
  naranja: {
    name: 'naranja',
    color: '#F18537'
  },
}

type Props = {};
export default class ChartScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <ScrollView>
          <View style={styles.containerContent}> 
            <Text style={styles.welcome}>Carrito</Text> 
          </View>
          <ChartList data={this.props.chart} />
          <Text style={styles.welcome}>{this.props.chart[1].name} | Welcome to {colores.rosa.name} page</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 20
  },
  welcome: {
    fontSize: 30,
    color: colores.naranja.color,
    textAlign: 'center',
  },
});
