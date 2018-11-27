import React, {Component} from 'react';
import { StyleSheet, Image, Text, TextInput, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
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

function getUser(){
  return userLog[0];
}

type Props = {};
var servidor ='angel140496.ddns.net';
var userLog;
export default class SignInScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      user: '', //Guarda el usuario que quiere iniciar
      pwd: '' //Guarda la contraseña del usuario que quiere iniciar
    }
  }

  insertaraBaseDeDatos() {
    const { user }  = this.state ;
    const { pwd } = this.state;
    fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/login.php',
    {
      method: 'POST',
      headers:
      {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user,
        password: pwd
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        userLog = responseJson;
        console.log('Iniciaste :D ' + userLog[0].name)
        Actions.Home();

      }).catch((error) => {
        console.error(error);
      });
  }

  ingresar = () => {
    //Hace cosas bonitas para iniciar sesión luego te manda a la pantalla home si todo salió bien
    this.insertaraBaseDeDatos();
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style={styles.photo}
          source={require('../assets/icons/logo-dailywork.png')}
          resizeMode='contain'
        />
        <TextInput
          placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
          placeholder = "Usuario"
          style={styles.buttonTextInput}
          onChangeText={(user) => this.setState({user})}
          value={this.state.user}
          onSubmitEditing={() => { this.passwordTextInput.focus(); }}
          returnKeyType={'next'}
        />
        <TextInput
          placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
          placeholder = "Contraseña"
          style={styles.buttonTextInput}
          secureTextEntry = {true}
          onChangeText={(pwd) => this.setState({pwd})}
          value={this.state.pwd}
          ref={(input) => { this.passwordTextInput = input; }}
          returnKeyType={'done'}
          onSubmitEditing={this.ingresar}
        />
        <TouchableOpacity style={[styles.button, {borderColor: colores.rosa.color}]} onPress={this.ingresar}> 
          <Text style={[styles.buttonText, {color: colores.rosa.color}]}>Sign in</Text> 
        </TouchableOpacity>
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
  buttonTextInput: {
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 30,
    borderColor: colores.gris.color,
    width: 300,
    textAlign: 'left',
    fontSize: 20,
    color: 'black'
  },
  button: {
    borderRadius: 50,
    borderWidth: 2,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  photo: {
    width: 180,
    marginBottom: 25
  }
});

export { getUser };