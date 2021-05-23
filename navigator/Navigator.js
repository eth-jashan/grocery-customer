import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo, Feather  } from '@expo/vector-icons';
import LoginScreen from '../src/screen/LoginScreen';
import React,{useState} from 'react';
import HomeScreen from '../src/screen/HomeScreen';
import CategoryScreen from '../src/screen/CategoryScreen';
import DetailScreen from '../src/screen/DetailScreen';
import CartScreen from '../src/screen/CartScreen';
import AddressScreen from '../src/screen/AddressScreen';
import CheckoutScreen from '../src/screen/CheckoutScreen';
import OrderScreen from '../src/screen/OrderScreen';
import StartUpScreen from '../src/screen/StartupScreen';
import ProductScreen from '../src/screen/ProductList';
import DrawerScreen from '../src/screen/DrawerScreen';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../store/action/auth'
import {Linking} from 'react-native'
import PaymentMode from '../src/screen/PaymnetMode';



const AuthStack = createStackNavigator()
const Auth = () => {
return(
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
        <AuthStack.Screen name='Login' component={LoginScreen} />
    </AuthStack.Navigator>
    )
}

const FlowStack = createStackNavigator()
const Flow = () => {
return(
    <FlowStack.Navigator screenOptions={{headerShown:false}}>
        <FlowStack.Screen name='Home' component={DrawerStack}/>
        <FlowStack.Screen name = 'Detail' component={DetailScreen}/>
        <FlowStack.Screen name='Address' component={AddressScreen} />
        <FlowStack.Screen name='Checkout' component={CheckoutScreen} />
        <FlowStack.Screen name='ProductList' component={ProductScreen} />
        <FlowStack.Screen name='DrawerScreen' component={DrawerScreen} />
        <FlowStack.Screen name='Payment' component={PaymentMode} />
    </FlowStack.Navigator>
    )
}

const Drawer = createDrawerNavigator();


const DrawerStack = () => {
  const navigation = useNavigation()
  const number = useSelector(x=>x.auth.cust_num)
  const dispatch = useDispatch()
  const openWhatsApp = () => {
    let url = "whatsapp://send?text=" +
          "I would like to order" +
          "&phone=91" +
          '9820769479';
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened successfully " + data);  //<---Success
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");  //<---Error
          });
  }
  const logoutHandler = async() => {
    await dispatch(authAction.logout())
    navigation.navigate('Login')
  }
return(
  <Drawer.Navigator drawerType='slide' drawerContentOptions={{activeTintColor:'green'}} drawerContent={props=>{
    return(
      <View style={{flex:1, paddingTop:20}}>
        <SafeAreaView style={{height:Dimensions.get('screen').height}}>
        <Text style={{fontFamily:'logo', fontSize:45, color:'#33a466', alignSelf:'center'}}>Mogambo</Text>
        <TouchableOpacity style={{width:'100%', marginVertical:20, padding:8, flexDirection:'row', }}>
        <Avatar.Image size={50} source={{uri:'https://i.pinimg.com/originals/06/8e/ea/068eea65c010214efc175f988ec4c69b.png'}} />
        <View style={{alignSelf:'center',marginHorizontal:12}}>
        <Text style={{fontFamily:'book', fontSize:18}}>Hello,</Text>
        <Text style={{fontFamily:'medium', fontSize:20}}>{number}</Text>
        </View>
        </TouchableOpacity>
          <DrawerItemList {...props}/>
          <Pressable onPress={()=>Linking.openURL(`tel:${9820769479}`)} style={{width:'90%', backgroundColor:'#33a466', padding:8, borderRadius:4, alignSelf:'center', marginTop:16}}>
            <Text style={{fontFamily:'book', color:'white', alignSelf:'center'}}>Call Us</Text>
          </Pressable>
          <Pressable onPress={openWhatsApp} style={{width:'90%', borderColor:'#33a466', padding:8, borderRadius:4, alignSelf:'center', marginVertical:8, borderWidth:1}}>
            <Text style={{fontFamily:'book', color:'#33a466', alignSelf:'center',}}>WhatsApp Us</Text>
          </Pressable>
          <Pressable onPress={()=>Linking.openURL(`tel:${9820769479}`)} style={{width:'90%', backgroundColor:'#33a466', padding:8, borderRadius:4, alignSelf:'center', marginBottom:16}}>
            <Text style={{fontFamily:'book', color:'white', alignSelf:'center'}}>Logout</Text>
          </Pressable>
          <Text style={{top:100, alignSelf:'center',fontFamily:'book',}}>made by UIpro with ❤️</Text>
        </SafeAreaView>
      </View>
    )
  }}>
    <Drawer.Screen name='Home' component={BottomStack} options={{drawerIcon:props=>{return<Entypo name="home" size={24} color={props.color} />}, drawerLabel:'Home'}} />
    <Drawer.Screen name='Category' component={CategoryScreen} options={{drawerIcon:props=>{return<Feather name="list" size={24} color={props.color} />}, drawerLabel:'Categories'}} />
    <Drawer.Screen name='Cart' component={CartScreen} options={{drawerIcon:props=>{return<Feather name="shopping-cart" size={24} color={props.color} />}, drawerLabel:'Cart'}} />
    <Drawer.Screen name='Order' component={OrderScreen} options={{drawerIcon:props=>{return<Entypo name="shopping-bag" size={24} color={props.color} />}, drawerLabel:'Your Orders'}} />
  </Drawer.Navigator>
)

}


const Tab = createMaterialBottomTabNavigator();

const BottomStack = () => {
    const count  = useSelector(x=>x.cart.cartTotal)
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#33a466"
          barStyle={{ backgroundColor: 'white' }}
          shifting={true}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Category"
            component={CategoryScreen}
            options={{
              tabBarLabel: 'Category',
              tabBarIcon: ({ color }) => (
              <View>                
                <Feather  name="list" size={24} color={color}/>
              </View>
              ),
            }}
          />

          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({ color }) => (
                count>0?<View>
                <View style={{elevation:4, height:16, width:16, backgroundColor:'red', borderRadius:10, left:20, bottom:4, justifyContent:'center'}}>
                  <Text style={{fontFamily:'book',color:'white', fontSize:8, alignSelf:'center'}}>{count}</Text>
                </View>
                <Feather style={{position:'absolute'}} name="shopping-cart" size={24} color={color}/>
                </View>:<Feather style={{position:'absolute'}} name="shopping-cart" size={24} color={color}/>
              ),
            }}
          />
          
          <Tab.Screen
            name="Order"
            component={OrderScreen}
            options={{
              tabBarLabel: 'Orders',
              tabBarIcon: ({ color }) => (
                <Entypo name="shopping-bag" size={24} color={color}/>
              ),
            }}
          />

        </Tab.Navigator>)

}

const MainStack = createStackNavigator()
const AppNav = () => {
    return(
        <NavigationContainer>
        <MainStack.Navigator screenOptions={{headerShown:false}}>
        <MainStack.Screen name='Startup' component={StartUpScreen}/>
        <MainStack.Screen name='Login' component={Auth} />
        <MainStack.Screen name='Main' component={Flow} />
        </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNav
