import React, {Component} from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';
import CategorieBox from '../components/CategorieBox';
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
export default class AddBrandScreen extends Component<Props> {
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
      ],
      image: null,
      uploading: false,
      photo: '', //Guarda la imagen de la categoría creada
      name: '', //Guarda el nombre de la categoría creada
    }
  }



  insertaraBaseDeDatos() {
    const { name }  = this.state ;
    const { photo } = this.state;
    fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/POST_category.php',
    {
      method: 'POST',
      headers:
      {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_user: getUser().id,
        title: name,
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
    setTimeout(()=> {Actions.refresh({refresh: true})}, 500); Actions.pop();
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
          <Text style={styles.welcome}>Agregar categoría</Text> 
        </View>
      {/* Componente que muestra la vsita previa de cómo quedaría la categoría creada */}
        <CategorieBox photo={this.sourcePhoto()} title={this.state.name}/>

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
          value={this.state.name}
          ref={(input) => { this.name = input; }}
          onChangeText={(name) => this.setState({name: name})}
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
    width: 300,
    height: 150,
    alignSelf: 'center',
    borderRadius: 8,
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
    alignSelf: 'center'

  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});
