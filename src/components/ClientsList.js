import React, { Component } from 'react';
import { Constants } from 'expo';
import { Text, KeyboardAvoidingView, TextInput, FlatList, ListView, View, Image, TouchableOpacity, Alert, Modal, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ReviewClient from './ReviewClient';
import ClientModal from './ClientModal';
import {Actions} from 'react-native-router-flux';
import { getUser } from '../screens/SignInScreen';

var servidor ='angel140496.ddns.net';
var modalClient = {"id":"2","name":"Angel Torres","address":"Degollado # 70 Comala,Col","phone":"312-111-68-38","email":"jtorres24@ucol.mx","deuda":"2300.00","abono":"1000.00","photo":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","history":[{"id_history":"3","name_history":"Lenovo","price":"999","paid":"0","photo_history":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","email_user":"jtorres24@ucol.mx"},{"id_history":"4","name_history":"hola","price":"230","paid":"0","photo_history":"http://angel140496.ddns.net/Pulgas/images/chest.png","email_user":"jtorres24@ucol.mx"}]};
//Este componente regresa la lista completa de clientes obtenida de la base de datos y la muestra con el diseño del componente ReviewClient
class ClientsList extends Component {
	constructor(props){
	  super(props);
    this.state = {
      dataSource: ''
      /*[
        {"id":"2","name":"Angel Torres","address":"Degollado # 70 Comala,Col","phone":"312-111-68-38","email":"jtorres24@ucol.mx","deuda":"2300.00","abono":"1000.00","photo":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","history":[{"id_history":"3","name_history":"Lenovo","price":"999","paid":"1","photo_history":"http://angel140496.ddns.net/Pulgas/images/Andrea.jpeg","email_user":"jtorres24@ucol.mx"},{"id_history":"4","name_history":"hola","price":"230","paid":"0","photo_history":"http://angel140496.ddns.net/Pulgas/images/chest.png","email_user":"jtorres24@ucol.mx"}]}
      ]*/, //Guarda la lista de clientes completa sin su historial por primera vez, después se actualiza
  		dataSourceHistory: '', //Guarda todos los historiales de los clientes
      fullClients: '',
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
    for(var i = 0; i < item.history.length; i++){ //Resta los productos pagados para disminuir la cantidad de productos adeudados
      if(item.history[i].paid == 1)
        pagosPendientes--;
    }
    item.deuda = pagosPendientes; //La deuda del cliente se actualiza con el resultado final de los clientes 
    modalClient = item;

    var showNonPaid = [];
    if(modalClient.deuda == 0)
      modalClient.history = null
    else{
      for(var x = 0; x < modalClient.history.length; x++){ //Agrega a cada cliente en su atributo history su historial de compras correspondiente
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
          id: item.id,
		  		nameClient: item.name,
		  		photo: item.photo,
		  		deuda: item.deuda,
		  		address: item.address,
		  		email: item.email,
		  		phone: item.phone,
		  		history: item.history[0]
		  	}
	  	)
	}

  /*Se encarga de filtrar la información recibida ya sea por mes, semana o día.
   *Al mismo tiempo agrega el historial de cada cliente y regresa los clientes que se mostrarán  
  */
  filter() {
      console.log(clients)
      return clients;
  }

  //Actualiza el state FullClientes con la lista de clientes completa con su historial correspondiente para cada uno
  getFullClients(clients, history){
    var clientes = [];
    clientes.push(clients);
    var historial = [];
    var obj = {};
    for (var i = 0; i < clientes.length; i++) {
      clientes[i].history = []
    }
    
      obj["id_history"] = history[0].id_history
      obj["name_history"] = history[0].name_history
      obj["price"] = history[0].price
      obj["paid"] = history[0].paid
      obj["photo_history"] = history[0].photo_history
      obj["email_user"] = history[0].email_user
      historial.push(obj);
      clientes[0].history.push(historial[0])
    
    
    console.log('Clientes salvajes: ' + clientes[0].history[0].name_history);
    this.setState({fullClients: clientes[0]})
  }

  //Obtiene los clientes y el historial de todos los clientes en la base de datos
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
        this.setState({dataSource: JSON.parse(responseJson[0]), dataSourceHistory: JSON.parse(responseJson[1]), isLoading: false, refresh: false});
        this.getFullClients(this.state.dataSource, this.state.dataSourceHistory);
      }).catch((error) => {
        console.error(error);
      });
  }

  //Cada que se muestra el componente actualiza los datos
  componentDidMount() {
      this.insertaraBaseDeDatos();
  }

  //Sirve para actualizar la pantalla
  componentWillReceiveProps() {
    this.insertaraBaseDeDatos();
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
				break;
			case 'monto':
				return(	
              //El tipo de vista previa sería un botón con foto, nombre, monto a pagar (se agrega como subtitulo abajo del nombre) junto con la cantidad de este en el mismo renglón, sin flechita
              //Este botón al presionarse muestra un modal con ciertos datos importantes del cliente
		        	<TouchableOpacity onPress={() => {this.modalContent(item)}}>
		          		<ReviewClient foto = {item.photo} name={item.name} subtitle={'Monto a pagar:'} price={`$${item.deuda}`}/>
		          	</TouchableOpacity>
				);
				break;
			case 'total':
				return(	
              //El tipo de vista previa sería un botón con foto, nombre, total a pagar (se agrega como subtitulo abajo del nombre) junto con la cantidad de este en el mismo renglón, sin flechita
              //Este botón al presionarse muestra un modal con ciertos datos importantes del cliente
		        	<TouchableOpacity onPress={() => {this.modalContent(item)}}>
		          		<ReviewClient foto = {item.photo} name={item.name} subtitle={'Total a pagar:'} price={`$${item.deuda}`}/>
		          	</TouchableOpacity>
				);
				break;
		}
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
		        	<KeyboardAvoidingView 
		        		behavior="padding" enabled
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
                  <View style={{ backgroundColor: 'white',   shadowColor: colores.azul.color,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,}}>
                  <FormLabel labelStyle={styles.inputLabelStyleModal}>Dinero abonado:</FormLabel>
                  <TextInput
                    style={styles.inputContainerStyleModal}
                    value={this.state.abono}
                    onChangeText={(abono) => this.setState({abono: abono})}
                    returnKeyType={'done'}
                  />
                  <TouchableOpacity style={[styles.button, {backgroundColor: colores.azul.color, borderColor: colores.azul.color}]} onPress={this.ingresar}> 
                    <Text style={[styles.buttonText, {color: 'white'}]}>Abonar</Text> 
                  </TouchableOpacity>
                  </View>
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
		        	</KeyboardAvoidingView>
		        </Modal>
        {/* Lista de botones de vista previa */}
				<FlatList
			        data={ this.state.fullClients}
			        renderItem={({item}) => this.choseType(item)}
			        
              keyExtractor={(item) => item.id}
				/>

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
    bottom: -210,
    alignSelf: 'center',
    position: 'absolute',
  },
  button: {
    borderRadius: 50,
    borderWidth: 2,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  inputContainerStyleModal: {
    alignSelf: 'center',
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 20,
    borderColor: colores.gris.color,
    width: 200,
    fontSize: 20,
    color: 'black'
  },
  inputLabelStyleModal: {
    color: colores.azul.color,
    fontSize: 17,
    fontWeight: 'normal', 
    marginBottom: 10,
    textAlign: 'center'
  },
});


export default ClientsList;