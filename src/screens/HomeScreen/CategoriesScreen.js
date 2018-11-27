import React, {Component} from 'react';
import { Constants, LinearGradient } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Footer from '../../components/Footer';
import CategoriesList from '../../components/CategoriesList';
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
export default class CategoriesScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      //Guarda el contenido actual del carrito
      carrito: [
        {
          id: '1',
          name: 'Laptop1',
          price: '$300.00',
          description: 'Este es un producto funcionando',
          photo: require('../../assets/images/chest.png')
        },
        {
          id: '2',
          name: 'Laptop2',
          price: '$400.00',
          description: 'Este es un producto funcionando',
          photo: require('../../assets/images/chest.png')
        },
        {
          id: '3',
          name: 'Laptop3',
          price: '$500.00',
          description: 'Este es un producto funcionando',
          photo: require('../../assets/images/chest.png')
        },
        {
          id: '4',
          name: 'Laptop4',
          price: '$600.00',
          description: 'Este es un producto funcionando',
          photo: require('../../assets/images/chest.png')
        }
      ],
      refresh: this.props.refresh,
    }
  }

  startRefresh() {
    if(this.state.refresh){
      return(<CategoriesList />);
      this.setState({refresh: false})
    }else{
      return(<CategoriesList />);
      this.setState({refresh: false})
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <ScrollView>
          <View style={styles.containerContent}> 
              <Text style={styles.welcome}>Categorías</Text> 
          </View>
          {this.startRefresh()}
          <View style={{height: 60}} />
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, left:0, right:0}}>
          <LinearGradient style={styles.imageContainer} colors={['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 1)']} />
          {/* Componente footer que recibe como props el contenido del carrito */}
          <Footer chart={this.state.carrito} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  welcome: {
    fontSize: 30,
    color: colores.naranja.color,
    textAlign: 'center',
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
  }
});
