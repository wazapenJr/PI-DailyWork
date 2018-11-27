import React, {Component} from 'react';
import { Font } from 'expo';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

import WelcomeScreen from './src/screens/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import Header from './src/components/Header';
import HeaderBack from './src/components/HeaderBack';

import CategoriesScreen from './src/screens/HomeScreen/CategoriesScreen';
import ProductsScreen from './src/screens/HomeScreen/ProductsScreen';
import DetailProductScreen from './src/screens/HomeScreen/DetailProductScreen';
import ChartScreen from './src/screens/HomeScreen/ChartScreen';

import EditProfileScreen from './src/screens/EditProfileScreen';

import AddClientScreen from './src/screens/AddClientScreen';
import EditClientScreen from './src/screens/EditClientScreen';

import AddProductScreen from './src/screens/AddProductScreen';
import EditProductScreen from './src/screens/EditProductScreen';

import AddBrandScreen from './src/screens/AddBrandScreen';
import EditBrandScreen from './src/screens/EditBrandScreen';

import ListClientsScreen from './src/screens/ClientsScreen/ListClientsScreen';
import DetailClientScreen from './src/screens/ClientsScreen/DetailClientScreen';

import ListBillsScreen from './src/screens/ReportsScreen/ListBillsScreen';
//import DetailBillScreen from './src/screens/ReportsScreen/DetailBillScreen';
//OR
//import DetailClientScreen from './src/screens/ReportsScreen/Screen';

import TodayBillsScreen from './src/screens/TodayBillsScreen/TodayBillsScreen';
//import DetailBillScreen from './src/screens/TodayBillsScreen/DetailBillScreen';
//OR
//import DetailClientScreen from './src/screens/TodayBillsScreen/Screen';

//Objeto con todos los iconos seleccionados
const focusedIcons = {
  home: require('./src/assets/icons/home-azul.png'),
  clients: require('./src/assets/icons/clientes-azul.png'),
  reports: require('./src/assets/icons/reporte-azul.png'),
  bills: require('./src/assets/icons/deudores-azul.png'),
}

//Objeto con todos los iconos deseleccionados
const unfocusedIcons = {
  home: require('./src/assets/icons/home.png'),
  clients: require('./src/assets/icons/clientes.png'),
  reports: require('./src/assets/icons/reporte.png'),
  bills: require('./src/assets/icons/deudores.png'),
}

//Escoge los iconos para cada pestaña de navegación dependiendo el título y si está o no seleccionada (con la variable focused)
const TabIcon= ({ title, focused }) => {
    let image;

    switch (title) {
        case 'Home':
            image = focused ? focusedIcons.home : unfocusedIcons.home;
            break;
        case 'Clientes':
            image = focused ? focusedIcons.clients : unfocusedIcons.clients;
            break;
        case 'Reportes':
            image = focused ? focusedIcons.reports : unfocusedIcons.reports;
            break;
        case 'Pagos':
            image = focused ? focusedIcons.bills : unfocusedIcons.bills;
            break;
    }

    //Regresa el icono a mostrar
    return ( <Image style={styles.closeModal} resizeMode = 'contain' source={image} /> );
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

const scenes = Actions.create(
  <Scene key="root">

    <Scene key="Welcome" component={WelcomeScreen} hideNavBar />
    <Scene key="SignIn" navTransparent component={SignInScreen}/>
    <Scene key="SignUp" navTransparent component={SignUpScreen}/>

    <Scene key="EditProfile" navTransparent component={EditProfileScreen}/>
    
    <Scene key="EditClient" navTransparent component={EditClientScreen}/>

    <Scene key="AddClient" navTransparent component={AddClientScreen}/>

    <Scene key="EditProduct" navTransparent component={EditProductScreen}/>

    <Scene key="AddProduct" navTransparent component={AddProductScreen}/>

    <Scene key="EditBrand" navTransparent component={EditProductScreen}/>

    <Scene key="AddBrand" navTransparent component={AddBrandScreen}/>

    <Scene key="tabbar"  tabs labelStyle={{fontSize: 17}} inactiveTintColor={'#C0C0C0'} activeTintColor={colores.azul.color}
      tabBarStyle={
        {
          backgroundColor: 'white',
          borderTopWidth: 2,
          borderTopColor: colores.gris.color,
          height: 60,
          shadowColor: colores.gris.color,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.0, 
          elevation: 3
        }
      } 
      hideNavBar>
      <Scene key="Home" title="Home" icon={TabIcon}>
        <Scene key="Categories" navBar={Header} title="" component={CategoriesScreen}/>
        <Scene key="Products" title="" navBar={HeaderBack} component={ProductsScreen}/>
        <Scene key="DetailProduct" title="" navTransparent component={DetailProductScreen}/>
        <Scene key="Chart" title="" navTransparent component={ChartScreen}/>
      </Scene>
      <Scene key="Clientes"  title="Clientes" icon={TabIcon}>
        <Scene key="ListClients" navBar={Header} title="" component={ListClientsScreen}/>
        <Scene key="DetailClient" title="" navTransparent component={DetailClientScreen}/>
      </Scene>
      <Scene key="Reportes" title="Reportes"  icon={TabIcon}>
        <Scene key="ListBills" navBar={Header} component={ListBillsScreen}/>
      </Scene>
      <Scene key="Pagos" title="Pagos" icon={TabIcon}>
        <Scene key="TodayBills" navBar={Header} component={TodayBillsScreen}/>
      </Scene>
    </Scene>
  </Scene>
);

type Props = {};
export default class App extends Component<Props> {
  async componentWillMount() {
    await Font.loadAsync({
      'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
      
    });
    this.setState({fontLoad: true, loading: false});
  }
  render() {
    return (
      <Router scenes={scenes}/>
    );
  }
} 

const styles = StyleSheet.create({
  closeModal: {
    width: 30,
    height: 30,
  },
  navBar: {
    backgroundColor: 'transparent',
  },
});