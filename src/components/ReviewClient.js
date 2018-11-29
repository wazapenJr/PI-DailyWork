import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

//Regresa una tarjeta estilizada con la vista previa del cliente
const ReviewClient = (props) => {
	const {container, photo, containerDetailText, containerDetail, textTitle, textSubtitle, arrow} = styles; 
	return (
			<View style={container}>
				<Image
				  style={photo}
				  source={{uri: props.foto}}
				  resizeMode='contain'
				/>
				<View style={containerDetail}>
					<View style={containerDetailText}>
						<Text numberOfLines={1} style={textTitle}>{props.name}</Text>
						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text numberOfLines={1} style={textSubtitle}>{props.subtitle}</Text>
							<Text numberOfLines={1} style={[textSubtitle, {textAlign: 'right', color: colores.azul.color}]}>{props.price}</Text>
						</View>
					</View>
					<Text style={arrow}>{props.arrow}</Text>
				</View>
			</View>
	);
};
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

const styles = {
	container:{
		marginLeft: 10,
		marginRight: 20,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
	},
	photo: {
		width: 60,
		height: 60,
		marginRight: 10,
		borderRadius: 30,
		//borderColor: 'red',
		//borderWidth: 1,
	},
	containerDetail: {
		borderTopWidth: 0,
		borderTopColor: colores.gris.color,
		borderBottomWidth: 1,
		borderBottomColor: colores.gris.color,
		marginBottom: 0,
		paddingTop: 12,
		paddingBottom: 12,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
	},
	containerDetailText:{
		justifyContent: 'flex-start',
		flexDirection: 'column',
		flex: 1,
	},
	textTitle: {
		color: colores.azul.color,
		marginBottom: 4,
		fontWeight: 'bold',
		fontSize: 20,
		
	},
	textSubtitle: {
		color: colores.gris.color,
		fontWeight: 'normal',
		fontSize: 17,
		fontFamily: 'Poppins-Regular'
	},
	arrow: {
		color: colores.rosa.color,
		fontWeight: 'normal',
		fontSize: 20,
		fontFamily: 'Poppins-Regular'
	}
}

export default ReviewClient;
