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

type Props = {};
export default class TodayBillsScreen extends Component<Props> {
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
          <ClientsList refresh={'refresh'} type={'total'}/>
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
});
