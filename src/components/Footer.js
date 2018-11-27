import React, { Component } from 'react';
import { Constants } from 'expo';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, Button, TouchableHighlight } from 'react-native';
import ContentModal from './ContentModal';
import SearchInput from './SearchInput';
import {Actions} from 'react-native-router-flux';

class Footer extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    modalVisible: false,
	    chart: this.props.chart
	  }
	}

	//Te dirige a la pantalla de carrito con el contenido actual del carrito
	chart(carrito){
		Actions.Chart({chart: carrito});
	}

	render(){
		return(
			<View style={styles.viewStyle}>		
				<TouchableOpacity
					onPress={() => {this.chart(this.state.chart)}}
					style={styles.containerButton}
				>
				  <Image
				    style={styles.button}
				    source={require('../assets/icons/carrito.png')}
				    resizeMode='contain'
				  />
				</TouchableOpacity>
			</View>
		);
	}

}
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

const styles = StyleSheet.create({
	viewStyle:{
		backgroundColor: 'rgba(255, 255, 255, 0)',
		height: 70,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: 15,
		flexDirection: 'row',
	},
	containerButton:{
	    shadowColor:'black',
	    shadowOffset: { width: 0, height: 2 },
	    shadowOpacity: 0.3,
	},
	button: {
		width: 45,
		height: 45,
	},
});

export default Footer;