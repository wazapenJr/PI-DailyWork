import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import Header from '../../components/Header';
import ClientsList from '../../components/ClientsList';
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

//Muestra en pantalla la lista de deudores del día de hoy
type Props = {};
export default class TodayBillsScreen extends Component<Props> {
  //Obtiene el total a mostrar de la deuda que está al final de la lista de clientes
  //Por el momento no actualiza un valor dinámico
  getTotal(){
    return <Text style={styles.totalNumber}>$500</Text> 
  }
  showTotal(show){
    if(show)
      return <Text style={styles.totalText}>Total:  {this.getTotal()}</Text>
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <ScrollView>
          <View style={styles.containerContent}> 
            <Text style={styles.welcome}>Cobros para hoy</Text> 
          </View>
          {/* Componente que muestra la lista de clientes deudores hoy */}
          <ClientsList showTotal={true} type={'total'}/>
          {this.showTotal(true)}
          <View style={{height: 50}}/> 
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
    borderBottomWidth: 1,
    borderBottomColor: colores.gris.color,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 30,
    fontFamily: 'Poppins-Regular',
    color: colores.naranja.color,
    textAlign: 'center',
  },
  totalText: {
    textAlign: 'right',
    color: colores.rosa.color,
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 20,
    margin: 15,
    fontFamily: 'Poppins-Regular'
  },
  totalNumber:{
    color: colores.azul.color,
    fontWeight: 'normal',
    fontFamily: 'Poppins-Regular'
  },
});
