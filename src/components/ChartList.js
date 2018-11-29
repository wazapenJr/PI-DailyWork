import React, { Component } from 'react';
import { Constants } from 'expo';
import { Text, FlatList, ListView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProductChartBox from './ProductChartBox';
import {Actions} from 'react-native-router-flux';

//Regresa la lista completa de los productos en el carrito obtenidos de la base de datos y los muestra con el diseño del ProductChartBox
class ChartList extends Component {
	constructor(props){
	  super(props);
	  
      this.state = {
        dataSource: this.props.data, //Guarda la lista de productos en el carrito
		anotherState: '',
      };
	}

	//Todavía no hace nada xD
	handlePress(title){
	  Actions.Products({categorie: title})
	}

	//Regresa la lista completa de productos en el carrito
	render(){
		return(	
			<FlatList
		        data={this.state.dataSource}
		        renderItem={({ item }) => (
		        	<View>
		          		<ProductChartBox photo={item.photo} name={item.name} price={item.price} cantidad={1} delete={require('../assets/icons/delete.png')} />
		          	</View>
		        )}
		        keyExtractor={item => item.id}
			/>
		);
	}

}

export default ChartList;