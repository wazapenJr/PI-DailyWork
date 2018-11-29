import React, { Component } from 'react';
import { Constants, LinearGradient } from 'expo';
import { Text, View, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';

//Define los estilos con los que se mostrará cada producto en la lista del carrito así como la posibilidad de eliminarse
class ProductChartBox extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    
	  }
	}

	//Elimina un elemento del carrito, cada elemento tiene esta función para eliminarse de la lista
	insertaraBaseDeDatos() {
	  const { name }  = this.state ;
	  const { photo } = this.state;
	  fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/DELETE_carrito.php',
	  {
	    method: 'POST',
	    headers:
	    {
	     'Accept': 'application/json',
	     'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({
	      id_user: getUser().id,
	      title: name,
	      photo: photo
	    })
	  }).then((response) => response.json())
	    .then((responseJson) => {
	      Alert.alert(responseJson + ' para: ' + getUser().name);
	    }).catch((error) => {
	      console.error(error);
	    });
	}


	render(){

		return(	
			<View style={styles.viewStyle}>
				<View style={styles.image} >
					<Image
					  style={styles.image}
					  source={this.props.photo}
					  resizeMode='contain'
					/>
					<LinearGradient 
						style={styles.imageContainer}
						colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.6)']}
					/>
				</View>
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
					<View style={styles.textContainer}>
						<View style={{flex: 1, marginRight: 10}}>
							<Text style={[styles.title, {textAlign: 'left'}]}>{this.props.name}</Text>
						</View>
						<View style={{flex: 1, marginRight: 10}}>
							<Text style={[styles.subtitle, {textAlign: 'right', color:colores.azul.color}]}>{this.props.price}</Text>
						</View>
						<View style={{marginRight: 10}}>
							<Text style={[styles.subtitle, {textAlign: 'right'}]}>|  {this.props.cantidad}  |</Text>
						</View>
						<TouchableOpacity onPress={() => {Alert.alert('Hola mundo')}} >
							<Image
							  style={{width: 25, height: 25}}
							  source={this.props.delete}
							  resizeMode='contain'
							/>
						</TouchableOpacity>
					</View>
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

const borderRadius = 8;

const styles = StyleSheet.create({
	viewStyle:{
		backgroundColor: 'rgba(255, 255, 255, 1)',
		height: 80,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		flex: 1,
		borderRadius: borderRadius,
		borderWidth: 0,
		borderColor: '#C4C4C4',
		shadowColor: colores.gris.color,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3, 
		elevation: 2,
		margin: 10,
		padding: 20,
		paddingRight: 10
	},
	image: {
		alignSelf: 'center',
		width: 60,
		height: 60,
		borderRadius: borderRadius,
	},
	textContainer: {
		flex: 1,
		marginLeft: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: 8,
		paddingRight: 8
	},
	title: {
		color: colores.gris.color,
		fontSize: 20,
		fontWeight: 'normal',
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
		bottom: 0,
		position: 'absolute',
		flex: 1,
		backgroundColor: 'transparent',
		borderRadius: borderRadius,
	}
});

export default ProductChartBox;