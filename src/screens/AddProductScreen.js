import React, {Component} from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Alert, View, Picker, KeyboardAvoidingView, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';
import { getCategories } from '../components/CategoriesList';
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

var servidor ='angel140496.ddns.net';
export default class AddProductScreen extends Component<Props> {
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
      nombre: '', //Guarda el nombre del producto creado
      price: '', //Guarda el precio del producto creado
      description: '', //Guarda la dirección del producto creado
      category: '',
      categories: '',
      photo: ''
    }
  }
  

  insertaraBaseDeDatos() {
    const { nombre }  = this.state ;
    const { price }  = this.state ;
    const { description }  = this.state ;
    const { category }  = this.state ;
    const { photo } = this.state;
    fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/POST_product.php',
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
        description: description,
        price: price,
        category: category,
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
    //Agregar nuevo producto
    this.insertaraBaseDeDatos();

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
          <Text style={styles.welcome}>Agregar producto</Text> 
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
          onSubmitEditing={() => { this.nombre.focus(); }}
          onChangeText={(photo) => this.setState({photo: photo})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Nombre:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.nombre}
          ref={(input) => { this.nombre = input; }}
          onSubmitEditing={() => { this.description.focus(); }}
          onChangeText={(nombre) => this.setState({nombre: nombre})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Descripción:</FormLabel>
        <TextInput
          multiline
          style={[styles.inputContainerStyleModal, {borderWidth: 2, borderRadius: 8, height: 200}]}
          value={this.state.description}
          ref={(input) => { this.description = input; }}
          onSubmitEditing={() => { this.price.focus(); }}
          onChangeText={(description) => this.setState({description: description})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Precio:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.price}
          ref={(input) => { this.price = input; }}
          onChangeText={(price) => this.setState({price: price})}
          returnKeyType={'done'}
        />
        <FormLabel labelStyle={[styles.inputLabelStyleModal, {marginBottom: 0}]}>Cateogría:</FormLabel>
        <Picker
          itemStyle={{fontSize: 20, color: colores.azul.color}}
          style={{ borderColor: '#3DE69C', borderWidth: 0, borderRadius: 8}}
          selectedValue={this.state.category}
          onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
          {    
            getCategories().map((category, index) => (
              <Picker.Item key={index} label={category.title} value={category.title} />
            ))
          }
        </Picker>
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
