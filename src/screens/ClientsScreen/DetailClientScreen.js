import React, {Component} from 'react';
import { StyleSheet, ScrollView, Image, FlatList, Text, View } from 'react-native';
import ReviewClient from '../../components/ReviewClient';

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

type Props = {};
export default class DetailClientScreen extends Component<Props> {
    constructor(props){
      super(props);
      this.state = {
        //Guarda el historial de productos que contiene el cliente que se detalla en esta pantalla
        dataSource: this.props.history
      };
    }
  
  render() {
    var pagosPendientes = this.state.dataSource.length;
    for(var i = 0; i < this.state.dataSource.length; i++){
      if(this.state.dataSource[i].paid == 1)
        pagosPendientes--;
    }
    return (
        <ScrollView style={{backgroundColor: 'white'}} >
      <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              style={styles.profilePhoto}
              source={{uri: this.props.photo}}
              resizeMode='contain'
            />
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}} >
              <Text style={styles.welcomeText}>{this.props.nameClient}</Text>
              <Text style={[styles.welcomeText, {color: colores.gris.color, fontSize: 17}]}>Pagos pendientes:  <Text style={[styles.welcomeText, {fontSize: 17, color: colores.azul.color}]}>{pagosPendientes}</Text> </Text>
            </View>
          </View>
          <View style={styles.add}>
            <Text style={[styles.addText,{marginBottom:5}]}>Dirección:</Text>
            <Text style={[styles.addText,{color: 'black'}]}>{this.props.address}</Text>

            <Text style={[styles.addText,{marginBottom:5}]}>Correo electrónico:</Text>
            <Text style={[styles.addText,{color: 'black'}]}>{this.props.email}</Text>

            <Text style={[styles.addText,{marginBottom:5}]}>Teléfono:</Text>
            <Text style={[styles.addText,{color: 'black'}]}>{this.props.phone}</Text>

            <Text style={[styles.addText,{marginBottom:5, color: colores.azul.color}]}>Historial:</Text>
          </View>
          <View style={styles.add}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => {
                  var paid = '';
                  if(item.paid == 1){
                    paid = 'Pagado';
                  }
                  else{
                    paid = 'Adeudo';
                  }
                return(
                  <ReviewClient foto={item.photo_history} name={item.name_history} subtitle={`$${item.price}`} price={paid}/>
                );
              }}
              keyExtractor={item => item.id_history}
            />
            <View style={{height: 20}}/>
          </View>
      </View>
        </ScrollView>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'white',
    padding: 40
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    paddingLeft: 0,
    paddingRight: 0,
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
    fontSize: 25,
    color: 'black',
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular'
  },
  add: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 25,
    paddingBottom: 5,
    borderColor: colores.gris.color,
    borderTopWidth: 1,
  },
  addText: {
    fontSize: 20,
    marginBottom: 20,
    color: colores.gris.color,
    fontFamily: 'Poppins-Regular'
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
    marginBottom: 20,
    textAlign: 'center',
    color: colores.gris.color,
    fontFamily: 'Poppins-Regular'
  },
  dataText: {
    flex: 1,
    fontSize: 22,
    marginBottom: 10,
    color: colores.gris.color,
    fontFamily: 'Poppins-Regular'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 25,
    borderColor: colores.gris.color,
    borderTopWidth: 1,
    height: 60
  },
  photo: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
    //borderColor: 'red',
    //borderWidth: 1,
  },
}