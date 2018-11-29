import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ReviewClient from './ReviewClient';

//Regresa el contenido del modal del cliente
const ClientModal = (props) => {
	return (
			<View style={styles.container}>
		<ScrollView>
		  		<View style={styles.profile}>
		  		    <Image
		  		    	style={styles.profilePhoto}
		  		    	source={{uri: props.photo}}
		  		    	resizeMode='contain'
		  		    />
		  		    <Text style={styles.welcomeText}>{props.profileName}</Text>
		  		    <Text style={styles.welcomeText}>Pagos pendientes:  <Text style={[styles.welcomeText, {color: colores.azul.color}]}>{props.deuda}</Text> </Text>
		  		</View>
		  		<View style={styles.add}>
	  		    	<Text style={[styles.addText,{marginBottom:5}]}>Dirección:</Text>
	  		    	<Text style={[styles.addText,{color: 'black'}]}>{props.address}</Text>

	  		    	<Text style={[styles.addText,{marginBottom:5}]}>Teléfono:</Text>
	  		    	<Text style={[styles.addText,{color: 'black'}]}>{props.phone}</Text>

	  		    	{/*Muestra solo los productos que no se han pagado en la sección de Adeudos*/}
	  		    	<Text style={[styles.addText,{marginBottom:5}]}>Adeudos:</Text>
  		    		<FlatList
  		    	        data={props.products}
  		    	        renderItem={({item}) => {
  		    	        	return(
  		    	        		<ReviewClient foto={item.photo_history} name={item.name_history} price={`$${item.price}`}/>
		    	        		);
  		    	        }}
  		    	        keyExtractor={item => item.id_history}
  		    		/>

	  		    	<View style={{height: 20}}/>
		  		</View>
		</ScrollView>
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
	container: {
		justifyContent: 'space-between',
		flex: 1,
	},
	profile: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 25,
		padding: 15,
		paddingBottom: 25
	},
	profilePhoto: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginBottom: 10,
		borderColor: colores.azul.color,
		borderWidth: 0.5
	},
	welcomeText: {
		fontSize: 20,
		fontFamily: 'Poppins-Regular',
		color: colores.gris.color,
		textAlign: 'center',
		marginBottom: 5
	},
	add: {
		flex: 1,
		padding: 25,
		paddingBottom: 5,
		borderColor: colores.gris.color,
		borderTopWidth: 1,
	},
	addText: {
		fontSize: 20,
		fontFamily: 'Poppins-Regular',
		marginBottom: 20,
		color: colores.gris.color,
	},
	data: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 25,
	},
	dataRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	nameText: {
		fontSize: 22,
		fontFamily: 'Poppins-Regular',
		marginBottom: 20,
		textAlign: 'center',
		color: colores.gris.color,
	},
	dataText: {
		flex: 1,
		fontFamily: 'Poppins-Regular',
		fontSize: 22,
		marginBottom: 10,
		color: colores.gris.color,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 25,
		borderColor: colores.gris.color,
		borderTopWidth: 1,
		height: 60
	},
	closeText: {
		fontSize: 25,
		fontFamily: 'Poppins-Regular',
		color: colores.azul.color,
	},
}

export default ClientModal;
