import React, {Component} from 'react';
import { StyleSheet, Text, StatusBar, ScrollView, View, Alert, TouchableOpacity} from 'react-native';
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
/*
 * Este componente renderiza la pantalla del carrito, esta manda a llamar el ChartList que muestra la lista de productos agregados en el carrito
 * los cuales se muestran aquí, ChartScreen se encarga así mismo de agregar los productos en el carrito al historial del cliente seleccionado
 */
export default class ChartScreen extends Component<Props> {
  //Inserta los productos en el carrito al historial del cliente seleccionado y guarda los cambios en la base de datos
  insertaraBaseDeDatos() {
    const { name }  = this.state ;
    const { photo } = this.state;
    fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/POST_historial.php',
    {
      method: 'POST',
      headers:
      {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_user: getUser().id,
        title: name,
        photo: photo
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson + ' para: ' + getUser().name);
      }).catch((error) => {
        console.error(error);
      });
  }

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
          <TouchableOpacity style={[styles.button, {marginTop: 20, borderColor: colores.naranja.color}]} onPress={() => Actions.pop()}> 
            <Text style={[styles.buttonText, {color: colores.naranja.color}]}>Seguir comprando</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: colores.naranja.color, borderColor: colores.naranja.color}]} onPress={() => {Alert.alert('Todo listo :D'), Actions.pop()}}> 
            <Text style={[styles.buttonText, {color: 'white'}]}>Agregar compra</Text> 
          </TouchableOpacity>
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
  button: {
    borderRadius: 50,
    borderWidth: 2,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});
