import React, { Component } from 'react';
import { Constants } from 'expo';
import { Alert, Text, FlatList, ListView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProductBox from './ProductBox';
import {Actions} from 'react-native-router-flux';
import { getUser } from '../screens/SignInScreen';

var servidor ='angel140496.ddns.net'
class ProductsList extends Component {
	constructor(props){
	  super(props);
	  
      this.state = {
        dataSource: '', //Guarda la lista completa de productos
        isLoading: true, //Muestra si todavía están o no cargando los datos
        category: this.props.category, //Recibe el título de la categoría que se presionó y se mostrará
        refresh: this.props.refresh
      };
	}

    //Filtra los productos para regresar solo los productos que coincidan con la categoría antes seleccionada
    filter(){
        var productos = [];
        var dataSource = this.state.dataSource;
        for(var i = 0; i < dataSource.length; i++){
            if(this.state.category == dataSource[i].category){
                productos.push(
                    dataSource[i]
                );
            }
        }
        console.log('CATEGORÍA: ' + this.state.category);
        console.log('Los productos: ' + productos);
        return productos;
    }

    insertaraBaseDeDatos() {
      fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/GET_product.php',
      {
        method: 'POST',
        headers:
        {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_user: getUser().id
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({dataSource: responseJson, isLoading: false, refresh: false});
          console.log('Obuste los productos de: ' + getUser().name)
        }).catch((error) => {
          console.error(error);
        });
    }
    componentDidMount() {
        this.insertaraBaseDeDatos();
    }

    //Detecta qué producto fue seleccionado y te dirige a la pantalla de detalles del mismo, mandándole los props que ocupa la pantalla de detalles
	handlePress(item){
	  Actions.DetailProduct({product: item.name, photo: item.photo, price: item.price, description: item.description})
	}

	render(){

        //Si está cargando los datos muestra cargando y si no muestra la lista completa de estos.
        if(this.state.isLoading){
            console.log('cargando');
            return(<Text>Cargando</Text>);
        }else{
            return( 
                <View style={{flex:1}}>
                    <FlatList
                        columnWrapperStyle
                        numColumns = {2}
                        data={this.filter()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.handlePress(item)} style={{flex: 1}}>
                                <ProductBox photo={item.photo} price={item.price} name={item.name}/>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />
                    <Image
                      style={styles.photo}
                      source={require('../assets/icons/logo-dailywork.png')}
                      resizeMode='contain'
                    />
                </View>
            );
        }
		
	}

}

const styles = StyleSheet.create({
  photo: {
    width: 250,
    bottom: -160,
    alignSelf: 'center',
    position: 'absolute',
  },
});

export default ProductsList;