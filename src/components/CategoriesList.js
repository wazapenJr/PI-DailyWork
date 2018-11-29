import React, { Component } from 'react';
import { Constants } from 'expo';
import { Text, FlatList, ListView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CategorieBox from './CategorieBox';
import {Actions} from 'react-native-router-flux';
import { getUser } from '../screens/SignInScreen';

var servidor ='angel140496.ddns.net'

function getCategories(){
    return categories;
}
var categories;

//Regresa la lista completa de las categorías obtenidas de la base de datos y las muestra con el diseño del CategorieBox
class CategoriesList extends Component {
	constructor(props){
	  super(props);
	  
      this.state = {
        dataSource: '', //Guarda la lista completa de categorías
		isLoading: true, //Muestra si todavía están o no cargando los datos
      };
	}
	insertaraBaseDeDatos() {
	  fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/GET_category.php',
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
	      categories = responseJson;
	      console.log('Obuste las categorías de: ' + getUser().name)
	    }).catch((error) => {
	      console.error(error);
	    });
	}
	componentWillReceiveProps() {
	  this.insertaraBaseDeDatos();
	}
	//Actualiza las categorías cada que se muestra este componente
	componentDidMount() {
		this.insertaraBaseDeDatos();
	}

	//Controla la categoría que fue presioanda y te manda a la pantalla de productos que contiene esa categoría
	handlePress(item){
	  //Abre la pantalla de productos mandándole las props de categoría y foto de la categoría presionada
	  Actions.Products({id: item.id, categorie: item.title, photo: item.photo})
	}

	render(){
		
		console.log('JSOOOOON:  \n'+this.state.dataSource);
		//Si está cargando los datos muestra cargando y si no muestra la lista completa de estos.
		if(this.state.isLoading){
			console.log('cargando');
			return(<Text>Cargando</Text>);
		}else{
			return(	
				<View style={{flex:1}}>
					<FlatList
				        data={this.state.dataSource}
				        renderItem={({ item }) => (
				        	<TouchableOpacity onPress={() => {this.handlePress(item), console.log('Le picaste a: ' + item.title)}}>
				          		<CategorieBox photo={item.photo} title={item.title}/>
				          	</TouchableOpacity>
				        )}
				        keyExtractor={item => item.title}
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

export { getCategories };
export default CategoriesList;