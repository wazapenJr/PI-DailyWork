import React, { Component } from 'react';
import { Constants, LinearGradient } from 'expo';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ContentModal from './ContentModal';
import SearchInput from './SearchInput';

//Distribuye y estructura la información del producto mostrándo una vista previa del mismo, este comoponente define los estilos para mostrar la review de cada producto
class ProductBox extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    
	  }
	}


	render(){

		return(	
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
				<View style={{height: 70, alignItems: 'center',}}>
					<View style={styles.textContainer}>
						<View style={{flex: 1, marginRight: 5}}>
							<Text style={[styles.subtitle, {textAlign: 'left'}]}>{this.props.name}</Text>
						</View>
						<Text style={[styles.subtitle, {textAlign: 'right'}]}>${this.props.price}</Text>
					</View>
					<TouchableOpacity onPress={this.props.addProduct} style={[styles.textContainer, {height: 30, flex: 0}]}>
						<Text style={[styles.title, {textAlign: 'left'}]}>Agregar</Text>
						<Text style={[styles.title, {width: 30, textAlign: 'right', color: colores.gris.color}]}>[ 51 ]</Text>
					</TouchableOpacity>
				</View>
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

const borderRadius = 4;

const styles = StyleSheet.create({
	viewStyle:{
		backgroundColor: 'rgba(255, 255, 255, 1)',
		height: 180,
		justifyContent: 'space-between',
		flex: 1,
		borderRadius: borderRadius,
		borderWidth: 0,
		borderColor: '#C4C4C4',
		shadowColor: colores.gris.color,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3, 
		elevation: 2,
		margin: 10,
	},
	image: {
		width: 125,
		flex: 1,
		borderTopRightRadius: borderRadius,
		borderTopLeftRadius: borderRadius,
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 8,
		paddingRight: 8
	},
	title: {
		color: colores.azul.color,
		fontSize: 20,
		fontWeight: 'normal',
		textAlign: 'center',
		flex: 1,
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
	}
});

export default ProductBox;