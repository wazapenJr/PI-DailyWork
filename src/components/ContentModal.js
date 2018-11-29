import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

const ContentModal = (props) => {

//La variable header recibe el componente header que manda a llamar el modal
show = (header) => {
	//Si no es el header 'back' entonces ocultará el modal1 que corresponde al header 'noback'
	if(header != 'back')
		props.showModal(false);
	else
		props.showModal2(false);
}

	return (
			<View style={styles.container}>
		<ScrollView>
		  		<View style={styles.profile}>
		  		 <View style={{height: 15}}/>
		  		    <Image
		  		    	style={styles.profilePhoto}
		  		    	source={{uri: props.photo}}
		  		    	resizeMode='contain'
		  		    />
		  		    <Text style={styles.welcomeText}>¡Te damos la bienvenida {props.profileName}!</Text>
		  			{/* Al presionarse oculta el header correspondiente y te manda a la pantalla de editar perfil que recibe ciertos datos ya definidos */}
		  		    <TouchableOpacity onPress={() => {this.show(props.header), Actions.EditProfile({id: props.id, username: props.username, photo: props.photo, profileName: props.fullName, email: props.email, pwd: props.pwd})}}>
		  		    	<Text style={styles.editText}>Editar perfil</Text>
		  		    </TouchableOpacity>
		  		</View>
		  		<View style={styles.add}>
		  			{/* Al presionarse oculta el header correspondiente y te manda a la pantalla de agregar cliente */}
		  		    <TouchableOpacity onPress={() => {this.show(props.header), Actions.AddClient()}}>
		  		    	<Text style={styles.addText}>Agregar cliente</Text>
		  		    </TouchableOpacity>
		  			{/* Al presionarse oculta el header correspondiente y te manda a la pantalla de agregar producto */}
		  		    <TouchableOpacity onPress={() => {this.show(props.header), Actions.AddProduct()}}>
		  		    	<Text style={styles.addText}>Agregar producto</Text>
		  		    </TouchableOpacity>
		  			{/* Al presionarse oculta el header correspondiente y te manda a la pantalla de agregar marca */}
		  		    <TouchableOpacity onPress={() => {this.show(props.header), Actions.AddBrand()}}>
		  		    	<Text style={styles.addText}>Agregar categoría</Text>
		  		    </TouchableOpacity>
		  		</View>
		  		<View style={styles.data}>
		  			<Text style={styles.nameText}>{props.fullName}</Text>

		  			<View style={styles.dataRow}>
	  					<Text style={styles.dataText}>Clientes:</Text>
	  					{/* Al presionarse oculta el header correspondiente y te manda a la pantalla de clientes */}
	  					<TouchableOpacity onPress={() => {this.show(props.header), Actions.Clientes()}}>
	  						<Text style={[styles.dataText, {color: colores.azul.color, textAlign: 'right'}]}>45</Text>
	  					</TouchableOpacity>
		  			</View>
		  			<View style={styles.dataRow}>
	  					<Text style={styles.dataText}>Deudores:</Text>
	  					{/* Al presionarse oculta el header correspondiente y te manda a la pantalla de pagos */}
	  					<TouchableOpacity onPress={() => {this.show(props.header), Actions.Pagos()}}>
	  						<Text style={[styles.dataText, {color: colores.azul.color, textAlign: 'right'}]}>20</Text>
	  					</TouchableOpacity>
		  			</View>
		  			<View style={styles.dataRow}>
	  					<Text style={styles.dataText}>Tus productos:</Text>
	  					{/* Al presionarse oculta el header correspondiente y te manda a la pantalla de home */}
	  					<TouchableOpacity onPress={() => {this.show(props.header), Actions.Home()}}>
	  						<Text style={[styles.dataText, {color: colores.azul.color, textAlign: 'right'}]}>210</Text>
	  					</TouchableOpacity>
		  			</View>
		  		</View>
		</ScrollView>
		  		<View style={styles.footer}>
		  			{/* Al presionarse oculta el header correspondiente y te manda a la pantalla de bienvenida */}
		  			<TouchableOpacity onPress={() => {this.show(props.header), Actions.Welcome()}}>
		  				<Text style={styles.closeText}>Cerrar sesión</Text>
		  			</TouchableOpacity>
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
	container: {
		justifyContent: 'space-between',
		flex: 1
	},
	profile: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
		marginBottom: 5,
	},
	editText: {
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
		color: colores.naranja.color,
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid',
		textDecorationColor: colores.naranja.color
	},
	add: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: 25,
		paddingBottom: 5,
		borderColor: colores.gris.color,
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	addText: {
		fontSize: 22,
		fontFamily: 'Poppins-Regular',
		marginBottom: 20,
		color: colores.azul.color,
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
		fontSize: 22,
		fontFamily: 'Poppins-Regular',
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
		color: colores.azul.color,
		fontFamily: 'Poppins-Regular',
	},
}

export default ContentModal;
