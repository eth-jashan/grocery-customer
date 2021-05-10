import React from 'react'
import {View, Text, StyleSheet, Dimensions, Image, FlatList, Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import CartModel from '../../model/CartModel'
const {width, height} = Dimensions.get('window')
import { AntDesign } from '@expo/vector-icons';
import * as cartAction from '../../store/action/cart'
import { Entypo } from '@expo/vector-icons';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

const CartScreen = ({navigation}) => {

    const dispatch = useDispatch()
    
    const addItem = (item) => {
        dispatch(cartAction.addItem(item))
    }

    const decreaseItem = (item) => {
        dispatch(cartAction.decreaseItem(item))
    }

    const cartItems = useSelector(x=>x.cart.list)
    const cartWorth = useSelector(x=>x.cart.cartPrice)
    let cartList = []
    for (let keys in cartItems){    
        cartList.push(new CartModel(cartItems[keys].id, cartItems[keys].name, cartItems[keys].price, cartItems[keys].wt, cartItems[keys].description, cartItems[keys].category, cartItems[keys].catid, cartItems[keys].image, cartItems[keys].quantity))
    }
    if(cartList.length === 0){
        return(<SafeAreaView style={{backgroundColor:'white', height:Dimensions.get('screen').height, width:Dimensions.get('screen').width}}>
        <Text style={{fontFamily:'medium', fontSize:30, alignSelf:'center', marginVertical:12}}>Your Basket</Text>
            <Image
                source={require('../../assets/cart.jpg')}
                style={{width:width, height:height*0.5}}
            />
            <Text style={{fontFamily:'book', fontSize:20, alignSelf:'center', marginVertical:12}}>No Items in cart</Text>
            <Pressable onPress={()=>navigation.navigate('Home')} style={{width:width*0.8, borderRadius:10, padding:10, backgroundColor:'#33a466', alignSelf:'center'}}>
                <Text style={{alignSelf:'center', color:'white', fontFamily:'book', fontSize:18}}>Start Shopping</Text>
            </Pressable>
        </SafeAreaView>)
    }
    return( 
        <SafeAreaView>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        
            <Text style={{fontFamily:'medium', fontSize:24, alignSelf:'center'}}>Your Basket</Text>
        </View>    
            <FlatList
                data={cartList}
                keyExtractor={x=>x.id}
                renderItem={({item})=>{
                    return<View style={{width:width*0.9, borderRadius:10, backgroundColor:'white',alignSelf:'center',padding:8,flexDirection:'row', margin:12}}>
                    <View>
                    <Image
                        resizeMode='contain'
                        style={{width:100, height:100}}
                        source={{uri:item.image}}
                    />
                    </View>
                    <View style={{alignSelf:'center', marginLeft:24}}>
                    <View style={{margin:10}}>
                    <Text  numberOfLines={1} style={{fontFamily:'medium', fontSize:18, textAlign:'left'}}>{item.name}</Text>
                    <Text numberOfLines={1} style={{fontFamily:'book', fontSize:16, textAlign:'left'}}>₹ {item.price}</Text>
                    </View>
                    <View style={{width:'100%',flexDirection:'row', margin:10}}>
                    <AntDesign style={{alignSelf:'center'}} onPress={()=>addItem(item)} name="pluscircle" size={30} color="#33a466" />
                    <Text style={{fontFamily:'book', fontSize:22, marginHorizontal:12, alignSelf:'center'}}>{item.quantity}</Text>
                    <AntDesign style={{alignSelf:'center'}} onPress={()=>decreaseItem(item)} name="minuscircle" size={30} color="#33a466" />
                    </View>
                    </View>
                </View>
                }}
            />

        <View style={{flexDirection:'row', width:width*0.9, borderWidth:0.75, borderColor:"#909090", padding:12, alignSelf:'center', borderRadius:8, borderStyle:'dashed',justifyContent:'space-between'}}>
            <View>
                <Text style={{fontFamily:'book', fontSize:18}}>Cart Total :</Text>
                <Text style={{fontFamily:'medium', fontSize:22}}>₹ {cartWorth}</Text>
            </View>
            <Pressable onPress={()=>navigation.navigate('Address')} style={{width:'50%', backgroundColor:"#33a466", borderRadius:10, padding:10}}>
                <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center'}}>Add Address</Text>
            </Pressable>
        </View>
            
        </SafeAreaView>
    )

}

export default CartScreen