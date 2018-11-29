import React, {Component} from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
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

/*
 * Esta pantalla muestra los detalles completos del producto seleccionado y nos permite editar estos detalles.
 */
type Props = {};
var servidor ='angel140496.ddns.net'
export default class EditProfileScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      types: [
        {
          label: 'Masculino', value: 'M' 
        },
        {
          label: 'Femenino', value: 'F'
        }
      ],
      id: this.props.id, 
      user: this.props.username,
      pwd: this.props.pwd,
      nombre: this.props.profileName, //Guarda el nombre del usuario modificado
      email: this.props.email, //Guarda el email del usuario modificado
      photo: this.props.photo,
      birth: ''
    }
  }

  insertaraBaseDeDatos() {
    const { id }  = this.state ;
    const { user }  = 'usuario' ;
    const { nombre }  = this.state ;
    const { pwd }  = this.state ;
    const { birth } = '12-12-12';
    const { email }  = this.state ;
    const { photo } = this.state;
    fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/UPDATE_perfil.php',
    {
      method: 'POST',
      headers:
      {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        username: user,
        birth: birth,
        name: nombre,
        password: pwd,
        email: email,
        photo: photo
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        
      }).catch((error) => {
        console.error(error);
      });
  }


  onPress = () => {
    //Guardar cambios del perfil...
    //this.insertaraBaseDeDatos();

    //Cierra pantalla actual
    Actions.pop();
  }

  sourcePhoto(){
    var photo = this.state.photo;
    if(photo == '')
      return photo = 'http';
    else
      return photo;
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView>
        <View style={styles.containerContent}> 
          <Text style={styles.welcome}>Editar perfil</Text> 
        </View>
        <Image
          style={styles.profilePhoto}
          source={{uri: this.sourcePhoto()}}
          resizeMode='contain'
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Agrega el link de tu foto:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.photo}
          onSubmitEditing={() => { this.name.focus(); }}
          onChangeText={(photo) => this.setState({photo: photo})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Nombre:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.nombre}
          ref={(input) => { this.name = input; }}
          onSubmitEditing={() => { this.email.focus(); }}
          onChangeText={(nombre) => this.setState({nombre: nombre})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Correo electrónico:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.email}
          ref={(input) => { this.email = input; }}
          onSubmitEditing={() => { this.birth.focus(); }}
          onChangeText={(email) => this.setState({email: email})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Contraseña:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.pwd}
          ref={(input) => { this.pwd = input; }}
          onChangeText={(pwd) => this.setState({pwd: pwd})}
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
