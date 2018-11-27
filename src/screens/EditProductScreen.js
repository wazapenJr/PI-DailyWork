import React, {Component} from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Alert, View, Picker, KeyboardAvoidingView, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';
import { getCategories } from '../components/CategoriesList';

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
var categories;
var servidor ='angel140496.ddns.net';
export default class EditProductScreen extends Component<Props> {
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
      nombre: this.props.name, //Guarda el nombre del producto creado
      price: this.props.price, //Guarda el precio del producto creado
      description: this.props.description, //Guarda la dirección del producto creado
      category: this.props.category,
      photo: this.props.photo
    }
  }
  componentDidMount() {
    categories = getCategories();
    console.log('Categorias: ' + categories)
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
        name: nombre,
        price: price,
        description: description,
        category: category,
        photo: photo
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
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

/*  showCategories(){
    for(var i = 0; i < categories.length; i++){
      return <Picker.Item value={categories[i].title} label={categories[i].title} />
      console.log(categories[i].title)
    }
  }*/
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView>
        <View style={styles.containerContent}> 
          <Text style={styles.welcome}>Editar producto</Text> 
        </View>
        <Image
          style={styles.profilePhoto}
          source={this.state.photo}
          resizeMode='contain'
        />
        <TouchableOpacity style={[styles.button, {borderColor: colores.azul.color, width: 250, marginTop: 10, marginBottom: 10}]} onPress={this.onPress} > 
          <Text style={[styles.buttonText, {color: colores.azul.color}]}>Editar imagen</Text> 
        </TouchableOpacity>
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Nombre:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.nombre}
          onSubmitEditing={() => { this.price.focus(); }}
          onChangeText={(nombre) => this.setState({nombre: nombre})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Descripción:</FormLabel>
        <TextInput
          multiline
          style={[styles.inputContainerStyleModal, {borderWidth: 2, borderRadius: 8, height: 200}]}
          value={this.state.price}
          ref={(input) => { this.price = input; }}
          onSubmitEditing={() => { this.description.focus(); }}
          onChangeText={(price) => this.setState({price: price})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Precio:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.description}
          ref={(input) => { this.description = input; }}
          onSubmitEditing={() => { this.category.focus(); }}
          onChangeText={(description) => this.setState({description: description})}
          returnKeyType={'next'}
        />
        <FormLabel labelStyle={styles.inputLabelStyleModal}>Cateogría:</FormLabel>
        <TextInput
          style={styles.inputContainerStyleModal}
          value={this.state.category}
          ref={(input) => { this.category = input; }}
          onChangeText={(category) => this.setState({category: category})}
          returnKeyType={'done'}
        />
{/*        <Picker
          itemStyle={{fontSize: 20, color: colores.azul.color}}
          style={{width: 100, borderColor: '#3DE69C', borderWidth: 0, borderRadius: 8}}
          selectedValue={this.state.category}
          onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
          {this.showCategories};
        </Picker>*/}
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
