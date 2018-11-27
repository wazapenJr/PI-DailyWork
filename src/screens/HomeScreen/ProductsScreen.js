import React, {Component} from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import Footer from '../../components/Footer';
import ProductsList from '../../components/ProductsList';
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
export default class ProductsScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      carrito: [
        {
          id: 1,
          name: 'Laptop1',
          price: '$300.00',
          description: 'Este es un producto funcionando',
          photo: require('../../assets/images/chest.png')
        },
        {
          id: 2,
          name: 'Laptop2',
          price: '$400.00',
          description: 'Este es un producto funcionando',
          photo: require('../../assets/images/chest.png')
        },
        {
          id: 3,
          name: 'Laptop3',
          price: '$500.00',
          description: 'Este es un producto funcionando',
          photo: require('../../assets/images/chest.png')
        },
        {
          id: 4,
          name: 'Laptop4',
          price: '$600.00',
          description: 'Este es un producto funcionando',
          photo: require('../../assets/images/chest.png')
        }
      ],
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        
        <ScrollView style={{padding: 10}}>
          <View style={styles.containerContent}> 
            <Image
              style={styles.image}
              source={{uri: this.props.photo}}
              resizeMode='cover'
            />
            <LinearGradient style={[styles.imageContainer, {bottom: 0, top: -10, left: -10, right: -10}]} colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']} />
            <View style={styles.titleContainer} >
              <Text style={styles.welcome}>{this.props.categorie}</Text> 
              <TouchableOpacity
                onPress={() => {this.chart(this.state.chart)}}
                style={styles.containerButton}
              >
                <Image
                  style={styles.button}
                  source={require('../../assets/icons/carrito.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {this.chart(this.state.chart)}}
                style={styles.containerButton}
              >
                <Image
                  style={styles.button}
                  source={require('../../assets/icons/carrito.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          </View>
          <ProductsList refresh={this.props.refresh} category={this.props.categorie}/>
          <View style={{height: 60}} />
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, left:0, right:0}}>
          <LinearGradient style={styles.imageContainer} colors={['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 1)']} />
          <Footer chart={this.state.carrito} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    padding: 5
  },
  welcome: {
    fontSize: 30,
    color: colores.naranja.color,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Poppins-Regular'
  },
  imageContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flex: 1,
    backgroundColor: 'transparent',
  },
  image: {
    height: 100,
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    position: 'absolute',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerButton:{
    marginTop: 40,
    marginLeft: 20,
    shadowColor:'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  button: {
    width: 30,
    height: 30,
  },
});
