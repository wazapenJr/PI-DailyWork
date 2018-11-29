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
//Muestra todos los clientes registrados en la base de datos del usuario
export default class ListClientsScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      refresh: this.props.refresh,
    }
  }

  //Actualiza la información mostrada en pantalla
  componentWillReceiveProps() {
    this.startRefresh()
  }
  //Vuelve a llamar a la lista para refrescarla
  startRefresh() {
    if(this.state.refresh){
      return(<ClientsList showTotal={false} type={'address'}/>);
      this.setState({refresh: false})
    }else{
      return(<ClientsList showTotal={false} type={'address'}/>);
      this.setState({refresh: false})
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <ScrollView>
          <View style={styles.containerContent}> 
            <Text style={styles.welcome}>Clientes</Text>
          </View>
          {/* Componente que muestra la lista de clientes completa con su dirección bajo el nombre */}
          {this.startRefresh()}
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
