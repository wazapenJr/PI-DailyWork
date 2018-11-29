import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, StatusBar, ScrollView } from 'react-native';
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

//Muestra en pantalla la lista de deudores con la posibilidad de filtrar por día, semana y mes, su deuda
type Props = {};
export default class ListBillsScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      filter: 'Mes' //Guarda el tipo de filtro seleccionado en el Picker
    }
  }
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
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}} >
            <Text style={styles.welcome}>Reportes por:</Text> 
              <Picker
                itemStyle={{fontSize: 20, color: colores.azul.color}}
                style={{width: 100, borderColor: '#3DE69C', borderWidth: 0, borderRadius: 8}}
                selectedValue={'Semana'}
                onValueChange={(itemValue, itemIndex) => this.setState({filter: itemValue})}>
                <Picker.Item label="Mes" value="Mes" />
                <Picker.Item label="Semana" value="Semana" />
                <Picker.Item label="Día" value="Día" />
              </Picker>
            </View>
          </View>
          {/* Componente que muestra la lista de clientes según el tipo de filtro seleccionado en el Picker */}
          <ClientsList showTotal={true} filter={this.state.filter} type={'monto'}/>
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colores.gris.color,
    marginBottom: 10,
    height: 150
  },
  welcome: {
    fontSize: 30,
    color: colores.naranja.color,
    textAlign: 'center',
    marginRight: 10,
    fontFamily: 'Poppins-Regular'
  },
  subtitle: {
    fontSize: 20,
    color: colores.naranja.color,
    textAlign: 'right',
    marginRight: 10
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
