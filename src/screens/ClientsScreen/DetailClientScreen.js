import React, {Component} from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Text, View } from 'react-native';
import ReviewClient from '../../components/ReviewClient';
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
//Muestra los detalles del cliente seleccionado
export default class DetailClientScreen extends Component<Props> {
    constructor(props){
      super(props);
      this.state = {
        //Guarda el historial de productos que contiene el cliente que se detalla en esta pantalla
        dataSource: [{"id_history":"3","name_history":"Lenovo","price":"999","paid":"0","photo_history":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","email_user":"jtorres24@ucol.mx"},{"id_history":"4","name_history":"hola","price":"230","paid":"0","photo_history":"http://angel140496.ddns.net/Pulgas/images/chest.png","email_user":"jtorres24@ucol.mx"}],
      };
    }
  /*componentDidMount() {
    var history = []
    history.push(this.props.history)
    this.setState({dataSource: history})
    console.log(this.state.dataSource.name_history)
  }*/
  render() {
    var pagosPendientes = this.state.dataSource.length;
    for(var i = 0; i < this.state.dataSource.length; i++){ //Obtiene los productos y resta los que ya han sido pagados
      if(this.state.dataSource.paid == 1)
        pagosPendientes--;
    }
    
    return (
        <ScrollView style={{backgroundColor: 'white'}} >
      <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              style={styles.profilePhoto}
              source={{uri: this.props.photo}}
              resizeMode='contain'
            />
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}} >
              <Text style={styles.welcomeText}>{this.props.nameClient}</Text>
              <Text style={[styles.welcomeText, {color: colores.gris.color, fontSize: 17}]}>Pagos pendientes:  <Text style={[styles.welcomeText, {fontSize: 17, color: colores.azul.color}]}>{pagosPendientes}</Text> </Text>
            </View>
          </View>
          <View style={styles.add}>
            <Text style={[styles.addText,{marginBottom:5}]}>Dirección:</Text>
            <Text style={[styles.addText,{color: 'black'}]}>{this.props.address}</Text>

            <Text style={[styles.addText,{marginBottom:5}]}>Correo electrónico:</Text>
            <Text style={[styles.addText,{color: 'black'}]}>{this.props.email}</Text>

            <Text style={[styles.addText,{marginBottom:5}]}>Teléfono:</Text>
            <Text style={[styles.addText,{color: 'black'}]}>{this.props.phone}</Text>

            <Text style={[styles.addText,{marginBottom:5, color: colores.azul.color}]}>Historial:</Text>
          </View>
          {/* Muestra la lista completa de los productos en el historial de clientes */}
          <View style={styles.add}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => {
                  var paid = '';
                  if(item.paid == 1){
                    paid = 'Pagado';
                  }
                  else{
                    paid = 'Adeudo';
                  }
                return(
                  <ReviewClient foto={item.photo_history} name={item.name_history} subtitle={`$${item.price}`} price={paid}/>
                );
              }}
              keyExtractor={item => item.id_history}
            />
            <View style={{height: 20}}/>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}} >
            <TouchableOpacity
              onPress={() => {Actions.EditClient(
                {
                  id: `${this.props.id}`,
                  nameClient: `${this.props.nameClient}`,
                  address: `${this.props.address}`,
                  photo: `${this.props.photo}`,
                  email: `${this.props.email}`,
                  phone: `${this.props.phone}`,
                }
              )}}
              style={[styles.containerButton, {marginRight: 15}]}
            >
              <Image
                style={styles.button}
                source={require('../../assets/icons/edit.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {Actions.EditProduct()}}
              style={styles.containerButton}
            >
              <Image
                style={styles.button}
                source={require('../../assets/icons/delete.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
      </View>
        </ScrollView>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'white',
    padding: 40
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 25
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderColor: colores.azul.color,
    borderWidth: 0.5
  },
  welcomeText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular'
  },
  add: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 25,
    paddingBottom: 5,
    borderColor: colores.gris.color,
    borderTopWidth: 1,
  },
  addText: {
    fontSize: 20,
    marginBottom: 20,
    color: colores.gris.color,
    fontFamily: 'Poppins-Regular'
  },
  data: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  dataRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    color: colores.gris.color,
    fontFamily: 'Poppins-Regular'
  },
  dataText: {
    flex: 1,
    fontSize: 22,
    marginBottom: 10,
    color: colores.gris.color,
    fontFamily: 'Poppins-Regular'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 25,
    borderColor: colores.gris.color,
    borderTopWidth: 1,
    height: 60
  },
  photo: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
    //borderColor: 'red',
    //borderWidth: 1,
  },
  containerButton:{
    shadowColor: colores.naranja.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, 
  },
  button: {
    width: 30,
    height: 30,
  },
}