import React, { Component } from 'react';
import { Constants } from 'expo';
import { Text, FlatList, ListView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProductChartBox from './ProductChartBox';
import {Actions} from 'react-native-router-flux';

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
		          		<ProductChartBox photo={item.photo} title={item.name}/>
		          	</View>
		        )}
		        keyExtractor={item => item.id}
			/>
		);
	}

}

export default ChartList;