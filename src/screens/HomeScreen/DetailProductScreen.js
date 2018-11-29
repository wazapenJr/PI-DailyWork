import React, { Component } from 'react';
import { Constants, LinearGradient } from 'expo';
import { Text, ScrollView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
export default class DetailProductScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.viewStyle}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={{uri: this.props.photo}}
              resizeMode='contain'
            />
          </View>
          <LinearGradient style={styles.imageContainer} colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.6)']}>
          </LinearGradient>
          <View style={{flex: 1}}>
            <View style={[styles.textContainer, {flexDirection: 'row', paddingLeft: 33, paddingRight: 33}]}>
              <View style={{flex: 1, marginRight: 5}}>
                <Text style={[styles.title, {textAlign: 'left'}]}>{this.props.product}</Text>
              </View>
              <Text style={[styles.subtitle, {textAlign: 'right', color: colores.naranja.color}]}>${this.props.price}</Text>
            </View>
            <View style={[styles.textContainer, {paddingLeft: 33, paddingRight: 33}]}>
              <Text style={styles.title}>Descripción:</Text>
              <Text style={[styles.title, {color: colores.gris.color,}]}>{this.props.description}</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}} >
            <TouchableOpacity
              onPress={() => {Actions.EditProduct(
                {
                  id_producto: `${this.props.id_product}`,
                  nameProduct: `${this.props.product}`,
                  description: `${this.props.description}`,
                  price: `${this.props.price}`,
                  category: `${this.props.category}`,
                  photo: `${this.props.photo}`,
                }
              )}}
              style={styles.containerButton}
            >
              <Image
                style={styles.button}
                source={require('../../assets/icons/edit.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {Actions.EditProduct(
                {
                  id_producto: `${this.props.id_producto}`,
                  nameProduct: `${this.props.product}`,
                  description: `${this.props.description}`,
                  price: `${this.props.price}`,
                  category: `${this.props.category}`,
                  photo: `${this.props.photo}`,
                }
              )}}
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

const borderRadius = 4;

const styles = StyleSheet.create({
  viewStyle:{
    backgroundColor: 'rgba(255, 255, 255, 1)',    
    flex: 1,
    borderRadius: borderRadius,
    borderWidth: 0,
    borderColor: '#C4C4C4',
    shadowColor: colores.gris.color,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3, 
    elevation: 2,
    margin: 40,
  },
  image: {
    width: 300,
    height: 300,
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
  },
  textContainer: {
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    color: colores.azul.color,
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular'
  },
  subtitle: {
    color: colores.gris.color,
    fontSize: 17,
    fontWeight: 'normal',
    fontFamily: 'Poppins-Regular'
  },
  imageContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 55,
    position: 'absolute',
    flex: 1,
    backgroundColor: 'transparent',
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
  },
  containerButton:{
    marginBottom: 15,
    marginRight: 15,
  },
  button: {
    width: 30,
    height: 30,
  },
});
