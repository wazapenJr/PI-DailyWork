import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

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

//Este no hace nada, no existe
type Props = {};
export default class HomeScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
       <Text style={styles.welcome}>HomeScreen | Welcome to {colores.azul.name} page</Text> 
       <TouchableOpacity onPress={() => Actions.Categories()}> 
        <Text style={styles.welcome}>CategoriesScreen</Text> 
       </TouchableOpacity>
       <TouchableOpacity onPress={() => Actions.Products()}> 
        <Text style={styles.welcome}>ProductsScreen</Text> 
       </TouchableOpacity>
       <TouchableOpacity onPress={() => Actions.DetailProduct()}> 
        <Text style={styles.welcome}>DetailProductScreen</Text> 
       </TouchableOpacity>
       <TouchableOpacity onPress={() => Actions.Chart()}> 
        <Text style={styles.welcome}>ChartScreen</Text> 
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.azul.color,
  },
  welcome: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
});
