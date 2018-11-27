import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
export default class WelcomeScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={require('../assets/icons/logo-dailywork.png')}
          resizeMode='contain'
        />
        <View>
        <TouchableOpacity style={[styles.button, {borderColor: colores.rosa.color}]} onPress={() => Actions.SignUp()}> 
          <Text style={[styles.buttonText, {color: colores.rosa.color}]}>Sign up with email</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {borderColor: colores.azul.color}]} onPress={() => Actions.SignUp()}> 
          <Text style={[styles.buttonText, {color: colores.azul.color}]}>Sign up with Facebook</Text>
        </TouchableOpacity>

        <Text style={[styles.buttonText, {marginBottom: 10, marginTop: 20, color: colores.naranja.color}]}>Already have an account?</Text> 

        <TouchableOpacity style={[styles.button, {borderColor: colores.naranja.color}]} onPress={() => Actions.SignIn()}> 
          <Text style={[styles.buttonText, {color: colores.naranja.color}]}>Sign In</Text> 
        </TouchableOpacity>
        </View>
      </View>
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
    width: 250,
    marginBottom: 50
  }
});
