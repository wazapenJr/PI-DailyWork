import React, { Component } from 'react';
import { Constants } from 'expo';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, Button, TouchableHighlight } from 'react-native';
import ContentModal from './ContentModal';
import SearchInput from './SearchInput';
import { getUser } from '../screens/SignInScreen';

//Es el componente que se muestra en la parte superior que nos permite acceder al modal de nuestro usuario y diferentes funciones
class Header extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    modalVisible: false, //Muestra o no el modal lateral del usuario
	    profilePhoto: getUser().photo, //Guarda la foto del usuario
	    fullProfileName: getUser().name, //Guarda el nombre completo del usuario
	    email: getUser().email,
	    pwd: getUser().password
	  }

	  //Combina el método showModal() de este componente con el de su hijo para que su hijo también controle el comportamiento
	  this.showModal = this.showModal.bind(this)
	}

	//Muestra o no el modal
	showModal(visible){
		this.setState({modalVisible: visible});
	}
	render(){
		return(
			<View style={styles.viewStyle}>	
				{/* Aquí se define el modal del usuario, su contenido, sus estilos y comportamiento */}	
		        <Modal
		        	animationType="fade"
		        	transparent={true}
		        	visible={this.state.modalVisible}
		        	onRequestClose={() => {
		        	  this.showModal(false);
		        	}}>
		        	<View 
		        		
		        		style={styles.modalBackground}>
		        		{/* Apartir de aquí en el View con estilo containerModal es el contenido */}
		        		<View style={styles.containerModal}>
		        			{/* Componente que organiza el contenido recibiendo ciertos datos necesarios */}
			        		<ContentModal id={1} username={'hola'} photo={this.state.profilePhoto} header={'noback'} showModal={this.showModal} profileName={this.state.profileName} fullName={this.state.fullProfileName} email={this.state.email} pwd={this.state.pwd} />
    		        		<View style={[styles.containerCloseModal, {position: 'absolute', top: 0, left:0, right:0}]}>
    			        		<TouchableOpacity
    			        			onPress={() => {
    			        				this.showModal(false);
    			        			}}>
    			        			<View style={styles.closeModal}>
    			        				<Text style={{fontSize: 30, fontWeight: 'normal', color: colores.rosa.color}}> x </Text>
    			        			</View>
    			        		</TouchableOpacity>
    		        		</View>
		        		</View>
		        	</View>
		        </Modal>
				<TouchableOpacity
					onPress={() => {this.showModal(true)}}
				>
				  <Image
				    style={styles.button}
				    source={require('../assets/icons/menu.png')}
				    resizeMode='contain'
				  />
				</TouchableOpacity>
				<View style={[styles.buttonContainer, {borderColor: colores.rosa.color, borderTopWidth: 0, borderBottomWidth: 0}]}> 
				  <Text style={[styles.buttonText, {color: colores.rosa.color}]}>¡Ten un buen día! :D</Text>
				</View>
				{/*<SearchInput placeHolderText={'Search'}/>*/}
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
		backgroundColor: 'rgba(255, 255, 255, 1)',
		height: 47+Constants.statusBarHeight,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: Constants.statusBarHeight,
		paddingLeft: 10,
		paddingRight: 15,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: colores.gris.color,
		shadowColor: colores.gris.color,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.0, 
		elevation: 3
	},
	button:{
	    width: 45,
	    height: 45,
		//marginLeft: 20,
		//marginRight: 20
	},
	modalBackground: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		marginTop: Constants.statusBarHeight,
	},
	containerModal: {
		backgroundColor: 'rgba(255, 255, 255, 1)',
		marginRight: 80, 
		flex: 1,
		justifyContent: 'flex-start',
		shadowColor: colores.naranja.color,
		shadowOffset: { width: 8, height: 5 },
		shadowOpacity: 0.2,
		elevation: 2,
	},
	containerCloseModal: {
		justifyContent: 'flex-end',
		marginTop: 5,
		marginRight: 10,
		flexDirection: 'row'
	},
	closeModal: {
		width: 30,
		height: 30,
		marginBottom: 0,
		borderRadius: 8,
		borderBottomWidth: 1,
		borderColor: colores.rosa.color,
		alignItems: 'center',
	},
	buttonContainer: {
	  borderRadius: 50,
	  borderWidth: 2,
	  paddingLeft: 30,
	  paddingRight: 30,
	  paddingTop: 5,
	  paddingBottom: 5,
	},
	buttonText: {
	  fontSize: 20,
	  color: 'black',
	  textAlign: 'center',
	},
});

export default Header;