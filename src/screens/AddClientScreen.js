import React, {Component} from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';
import { getUser } from './SignInScreen';

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
var servidor ='angel140496.ddns.net'
export default class AddClientScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      email: '',
      pwd: '',
      types: [
        {
          label: 'Masculino', value: 'M' 
        },
        {
          label: 'Femenino', value: 'F'
        }
      ], //Guarda los tipos de generos para seleccionar en los radio buttons
      genero: '', //Guarda el genero seleccionado del cliente creado
      nombre: '', //Guarda el nombre del cliente creado
      address: '', //Guarda la dirección del cliente creado
      email: '', //Guarda el email del cliente creado
      phone: '', //Guarda el teléfono del cliente creado
    }
  }

  insertaraBaseDeDatos() {
    const { nombre }  = this.state ;
    const { address }  = this.state ;
    const { phone }  = this.state ;
    const { email }  = this.state ;
    const photo = 'http';
    fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/POST_client.php',
    {
      method: 'POST',
      headers:
      {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_user: getUser().id,
        name: nombre,
        address: address,
        phone: phone,
        email: email,
        photo: photo
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson + ' para: ' + getUser().name);
      }).catch((error) => {
        console.error(error);
      });
  }

  onPress = () => {
    this.insertaraBaseDeDatos();

    //Cierra pantalla actual
    Actions.pop({refresh: true});
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView>
        <View style={styles.containerContent}> 
          <Text style={styles.welcome}>Agregar cliente</Text> 
        </View>
        <Image
          style={styles.profilePhoto}
          source={this.props.photo}
          resizeMode='contain'
        />
        <TouchableOpacity style={[styles.button, {borderColor: colores.azul.color, width: 250, marginTop: 10, marginBottom: 10}]} onPress={this.onPress} > 
          <Text style={[styles.buttonText, {color: colores.azul.color}]}>Seleccionar un avatar</Text> 
        </TouchableOpacity>
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Nombre:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.nombre}
          onSubmitEditing={() => { this.address.focus(); }}
          onChangeText={(nombre) => this.setState({nombre: nombre})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Dirección:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.address}
          ref={(input) => { this.address = input; }}
          onSubmitEditing={() => { this.email.focus(); }}
          onChangeText={(address) => this.setState({address: address})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Correo electrónico:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.email}
          ref={(input) => { this.email = input; }}
          onSubmitEditing={() => { this.phone.focus(); }}
          onChangeText={(email) => this.setState({email: email})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Teléfono:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.phone}
          ref={(input) => { this.phone = input; }}
          onChangeText={(phone) => this.setState({phone: phone})}
          returnKeyType={'done'}
        />
          <TouchableOpacity style={[styles.button, {borderColor: colores.azul.color}]} onPress={this.onPress} > 
            <Text style={[styles.buttonText, {color: colores.azul.color}]}>Guardar</Text> 
          </TouchableOpacity>
        <View style= {{height: 80}}/>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerContent: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  welcome: {
    fontSize: 30,
    color: colores.naranja.color,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 75,
    marginBottom: 10,
    borderColor: colores.azul.color,
    borderWidth: 0.5
  },
  inputContainerStyleModal: {
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 20,
    borderColor: colores.gris.color,
    width: 300,
    fontSize: 20,
    color: 'black'
  },
  inputLabelStyleModal: {
    color: colores.azul.color,
    fontSize: 17,
    fontWeight: 'normal', 
    marginBottom: 10,
    marginLeft: 0
  },
  button: {
    borderRadius: 50,
    borderWidth: 2,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 20,
    width: 150,
    alignSelf: 'center'

  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});
