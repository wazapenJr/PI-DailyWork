import React, {Component} from 'react';
import { StyleSheet, Image, TextInput, Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
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
export default class SignUpScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      user: '', //Guarda el usuario que quiere registrarse
      email: '', //Guarda el email del usuario que quiere registrarse
      pwd: '', //Guarda la contraseña del usuario que quiere registrarse
    }
  }

  ingresar = () => {
    //Hace cosas bonitas para registrar un nuevo usuario luego inicia sesión si todo salió bien
    /*
    registrarse()...
    */

    //Hace cosas bonitas para iniciar sesión luego te manda a la pantalla home si todo salió bien
    /*
    iniciar...
    getToken(this.state.user, this.state.pwd)
    .then(data => {
      global.token = data.token;
      Actions.Home();
    })
    .catch(error => {
      //Actions si hay un error en la respuesta
      console.warn(error);
    })*/
    Actions.Home();
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
          placeholder = "Elige un nombre de usuario"
          style={styles.buttonTextInput}
          onChangeText={(user) => this.setState({user})}
          value={this.state.user}
          onSubmitEditing={() => { this.emailTextInput.focus(); }}
          returnKeyType={'next'}
        />
        <TextInput
          placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
          placeholder = "Correo electrónico"
          style={styles.buttonTextInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          ref={(input) => { this.emailTextInput = input; }}
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
          <Text style={[styles.buttonText, {color: colores.rosa.color}]}>Sign up</Text> 
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
    marginBottom: 50
  }
});
