import React, { Component } from 'react';
import { Constants } from 'expo';
import { Text, FlatList, ListView, View, Image, TouchableOpacity, Alert, Modal, StyleSheet } from 'react-native';
import ReviewClient from './ReviewClient';
import ClientModal from './ClientModal';
import {Actions} from 'react-native-router-flux';
import { getUser } from '../screens/SignInScreen';

var showTotal = false;
var servidor ='angel140496.ddns.net';
var modalClient = {"id":"2","name":"Angel Torres","address":"Degollado # 70 Comala,Col","phone":"312-111-68-38","email":"jtorres24@ucol.mx","deuda":"2300.00","abono":"1000.00","photo":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","history":[{"id_history":"3","name_history":"Lenovo","price":"999","paid":"0","photo_history":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","email_user":"jtorres24@ucol.mx"},{"id_history":"4","name_history":"hola","price":"230","paid":"0","photo_history":"http://angel140496.ddns.net/Pulgas/images/chest.png","email_user":"jtorres24@ucol.mx"}]};
class ClientsList extends Component {
	constructor(props){
	  super(props);
    this.state = {
      dataSource: ''
      /*[
        {"id":"2","name":"Angel Torres","address":"Degollado # 70 Comala,Col","phone":"312-111-68-38","email":"jtorres24@ucol.mx","deuda":"2300.00","abono":"1000.00","photo":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","history":[{"id_history":"3","name_history":"Lenovo","price":"999","paid":"1","photo_history":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","email_user":"jtorres24@ucol.mx"},{"id_history":"4","name_history":"hola","price":"230","paid":"0","photo_history":"http://angel140496.ddns.net/Pulgas/images/chest.png","email_user":"jtorres24@ucol.mx"}]}
      ]*/, //Guarda la lista de clientes completa sin su historial por primera vez, después se actualiza
  		dataSourceHistory: '', //Guarda todos los historiales de los clientes

  		showTotal: false, //En teoría no hace nada
  		modalVisible: false, //Valor usado para mostrar el modal de los clientes o no
  		modalPhoto: null, //De aquí en adelante aon los datos mostrados en el modal
  		modalName: '',
  		modalBill: '',
  		modalAddress: '',
  		modalPhone: '',
  		modalProducts: '',
      isLoading: true, //Muestra si todavía están o no cargando los datos
      //Recibe true desde su padre para actualizarse cada que se vuelve a mostrar este componente
      refresh: true
    };
	}

  //Actualiza el contenido a mostrar en el modal del cliente con el'item' que recibe qué cliente fue presionado para ser mostrado
	modalContent(item){

    var pagosPendientes = item.history.length;
    console.log('Al fin: ' + pagosPendientes)
    for(var i = 0; i < item.history.length; i++){
      if(item.history[i].paid == 1)
        pagosPendientes--;
    }
    item.deuda = pagosPendientes;
    modalClient = item;

    var showNonPaid = [];
    if(modalClient.deuda == 0)
      modalClient.history = null
    else{
      for(var x = 0; x < modalClient.history.length; x++){
        if(modalClient.history[x].paid == 0)
          showNonPaid.push(modalClient.history[x]);
      }
      modalClient.history = showNonPaid
    }
    this.setState({modalVisible: true,})
	}

  //Detecta qué cliente fue seleccionado y te dirige a la pantalla de detalles del mismo, mandándole los props que ocupa la pantalla de detalles
	handlePress(item){
	  	Actions.DetailClient(
		  	{
		  		nameClient: item.name,
		  		photo: item.photo,
		  		deuda: item.deuda,
		  		address: item.address,
		  		email: item.email,
		  		phone: item.phone,
		  		history: item.history
		  	}
	  	)
	}

  /*Se encarga de filtrar la información recibida ya sea por mes, semana o día.
   *Al mismo tiempo agrega el historial de cada cliente y regresa los clientes que se mostrarán  
  */
  filter(){
      var clientes = [];
      var clients = this.state.dataSource;
      
      for(var i = 0; i < clients.length; i++){
        clientes.push(
          clients[i]
        );
      }
      return clientes;
  }

  insertaraBaseDeDatos() {
    fetch('http://' + `${servidor}` + '/Pulgas/pulgasBackEnd/GET_client.php',
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
        this.setState({dataSource: responseJson[0], isLoading: false, refresh: false});
        console.log('Obtuviste los clientes de: ' + getUser().name)
      }).catch((error) => {
        console.error(error);
      });
  }

  //Cada que se muestra el componente actualiza los datos
  componentDidMount() {
      this.insertaraBaseDeDatos();
  }

  //Muestra o no el total de la deuda total de los clientes
	setShowTotal(show){
		showTotal = show;
	}

  //Elige el tipo de vista previa que tendrá la lista de clietnes dependiendo en qué pantalla se mostrará
	choseType(item){
    //La pantalla seleccionada manda el tipo de información que mostrará cada vista previa de cliente
    switch(this.props.type){
      case 'address':
				return(	
              //El tipo de vista previa sería un botón con foto, nombre, dirección (se agrega como subtitulo abajo del nombre) y una flechita
              //Este botón al presionarse muestran la pantalla con los detalles completos del cliente
		        	<TouchableOpacity onPress={() => this.handlePress(item)}>
		          		<ReviewClient foto = {item.photo} name={item.name} subtitle={item.address} arrow={'>'}/>
		          	</TouchableOpacity>
				);
				this.setShowTotal(false);
				break;
			case 'monto':
				return(	
              //El tipo de vista previa sería un botón con foto, nombre, monto a pagar (se agrega como subtitulo abajo del nombre) junto con la cantidad de este en el mismo renglón, sin flechita
              //Este botón al presionarse muestra un modal con ciertos datos importantes del cliente
		        	<TouchableOpacity onPress={() => {this.modalContent(item)}}>
		          		<ReviewClient foto = {item.photo} name={item.name} subtitle={'Monto a pagar:'} price={`$${item.deuda}`}/>
		          	</TouchableOpacity>
				);
				this.setShowTotal(true);
				break;
			case 'total':
				return(	
              //El tipo de vista previa sería un botón con foto, nombre, total a pagar (se agrega como subtitulo abajo del nombre) junto con la cantidad de este en el mismo renglón, sin flechita
              //Este botón al presionarse muestra un modal con ciertos datos importantes del cliente
		        	<TouchableOpacity onPress={() => {this.modalContent(item)}}>
		          		<ReviewClient foto = {item.photo} name={item.name} subtitle={'Total a pagar:'} price={`$${item.deuda}`}/>
		          	</TouchableOpacity>
				);
				this.setShowTotal(true);
				break;
		}
	}

  //No hace nada por el momento
	search(){
		var data;	
		switch(this.props.type){
			case 'address':
				data = this.state.dataSource;
				this.setShowTotal(false);
				break;
			case 'monto':
				data = this.state.dataSource;
				this.setShowTotal(true);
				break;
			case 'total':
				data = this.state.dataSource;
				this.setShowTotal(true);
				break;
		}
		return data;
	}

  //Obtiene el total a mostrar de la deuda que está al final de la lista de clientes
  //Por el momento no actualiza un valor dinámico
	getTotal(){
		return <Text style={styles.totalNumber}>$500</Text> 
	}

  //Muestra el total de la deuda actualizada
	showTotal(){
		if(showTotal)
			return <Text style={styles.totalText}>Total:  {this.getTotal()}</Text>
	}
	render(){
		return(	
			<View style={{flex:1}}>
            {/* Aquí se define el modal del cliente, su contenido, sus estilos y comportamiento */}
		        <Modal
		        	animationType="slide"
		        	transparent={true}
		        	visible={this.state.modalVisible}
		        	onRequestClose={() => {
		        	  this.setState({ modalVisible: false })
		        	}}>
		        	<View 
		        		
		        		style={styles.modalBackground}>
                {/* Apartir de aquí en el View con estilo containerModal es el contenido */}
		        		<View style={styles.containerModal}>
                  {/* Componente que organiza el contenido recibiendo ciertos datos necesarios */}
			        		<ClientModal
			        			photo={modalClient.photo}
			        			profileName={modalClient.name}
			        			deuda={modalClient.deuda}
			        			phone={modalClient.phone}
			        			address={modalClient.address}
			        			products={modalClient.history}
			        		/>
    		        		<View style={[styles.containerCloseModal, {position: 'absolute', top: 0, left:0, right:0}]}>
    			        		<TouchableOpacity
    			        			onPress={() => {
    			        				this.setState({ modalVisible: false })
    			        			}}>
    			        			<View style={styles.closeModal}>
    			        				<Text style={{fontSize: 30, fontWeight: 'normal', color: colores.rosa.color}}> x </Text>
    			        			</View>
    			        		</TouchableOpacity>
    		        		</View>
		        		</View>
		        	</View>
		        </Modal>
        {/* Lista de botones de vista previa */}
				<FlatList
			        data={this.state.dataSource}
			        renderItem={({item}) => this.choseType(item)}
			        keyExtractor={item => item.id}
				/>
        {/* Muesta el total al final de la lista dependiendo la pantalla que llame este componente */}
				{this.showTotal()}

        {/* Logo de app al final del contenido mostrado en pantalla */}
				<Image
				  style={styles.photo}
				  source={require('../assets/icons/logo-dailywork.png')}
				  resizeMode='contain'
				/>
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
  container:{
    backgroundColor: 'white',
    flex: 1,
  },
  totalText: {
  	textAlign: 'right',
  	color: colores.rosa.color,
  	fontWeight: 'bold',
  	fontSize: 17,
  	marginRight: 20,
  	margin: 15,
    fontFamily: 'Poppins-Regular'
  },
  totalNumber:{
  	color: colores.azul.color,
  	fontWeight: 'normal',
    fontFamily: 'Poppins-Regular'
  },
  modalBackground: {
  	flex: 1,
  	backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  containerModal: {
  	backgroundColor: 'rgba(255, 255, 255, 1)',
  	margin: 80, 
  	marginRight: 30,
  	marginLeft: 30,
  	flex: 1,
  	justifyContent: 'center',
  	shadowColor: colores.naranja.color,
  	shadowOffset: { width: 0, height: 0 },
  	shadowOpacity: 0.5,
  	elevation: 3,
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
  photo: {
    width: 250,
    bottom: -160,
    alignSelf: 'center',
    position: 'absolute',
  }
});


export default ClientsList;