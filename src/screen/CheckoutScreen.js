import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Dimensions, Image, FlatList, Pressable, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import CartModel from '../../model/CartModel'
const {width, height} = Dimensions.get('window')
import { AntDesign } from '@expo/vector-icons';
import * as orderAction from '../../store/action/order'
import * as cartAction from '../../store/action/cart'
// import AddressModel from '../../model/AddressModel'
// import RazorpayCheckout from 'react-native-razorpay';


const CheckoutScreen = ({navigation, route}) => {

    const dispatch = useDispatch()
    const {address} = route.params
   

    const cartItems = useSelector(x=>x.cart.list)
    const cartWorth = useSelector(x=>x.cart.cartPrice)
    let cartList = []
    let addressList = []
    for (let keys in cartItems){    
        cartList.push(new CartModel(cartItems[keys].id, cartItems[keys].name, cartItems[keys].price, cartItems[keys].wt, cartItems[keys].description, cartItems[keys].category, cartItems[keys].catid, cartItems[keys].image, cartItems[keys].quantity))
    }
    useEffect(()=>{addressList.push(address)},
    [])
    
    
    const [load, setLoad] = useState(false)
    
    const orderHandler = async() => {
        setLoad(true)
        await dispatch(orderAction.createOrder(addressList, "Cash", cartList, cartWorth))
        await dispatch(cartAction.clearCart())
        setLoad(false)
        navigation.navigate('Home')

    }
    let username = 'rzp_live_oTfAV52ZxEFWd9';
    let password = 'NsWMfAbyq0rDh66RV0ppOaqb';
    const orderId = useSelector(x=>x.order.id)
    // const checkoutHandler = () => {
    //     var options = {
    //         description: 'Scan towards hassle free dine in',
    //         image: 'https://i.imgur.com/3g7nmJC.png',
    //         currency: 'INR',
    //         key: username,
    //         amount: (5*100).toString(),
    //         name: 'Mogambo',
    //         order_id: orderId,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
    //         prefill: {
            
    //         },
    //         theme: {color: '#009efd'}
    //     }
    //     RazorpayCheckout.open(options).then((data) => {
    //         // handle success
    //         alert(`Success: ${data.razorpay_payment_id}`);
    //         dispatch(cartAction.clearCart())
    //         navigation.navigate('Home')
    //     }).catch((error) => {
    //         // handle failure
    //         alert(`Error: ${error.code} | ${error.description}`);
    //     });
    // }
    const onlineHandler = async() => {
        setLoad(true)
        console.log('Strat')
        await dispatch(orderAction.onlineOrder(addressList, "Online", cartList, cartWorth))
        await checkoutHandler()
        
        setLoad(false)
        
    }
    const cancelHandler = async() => {

    }

    if(load){

        return<SafeAreaView style={{width:width, height:height, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator
                animating={load}
                size='large'
                color='green'
            />
        </SafeAreaView>

    }
    
    return( 
        <SafeAreaView>
            <Text style={{fontFamily:'medium', fontSize:24, alignSelf:'center'}}>Order Checkout</Text>
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
                    <Text numberOfLines={1} style={{fontFamily:'book', fontSize:16, textAlign:'left'}}>x {item.quantity}</Text>
                    </View>
                    <View style={{width:'100%',flexDirection:'row', marginVertical:6}}>
                    <Text style={{fontFamily:'book', fontSize:22, marginHorizontal:12, alignSelf:'center'}}>₹ {item.price}</Text>
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
            <Pressable onPress={()=>navigation.navigate('Payment',{total:cartWorth, cartList, addressList})} style={{width:'50%', backgroundColor:"#33a466", borderRadius:10, padding:10}}>
                <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center'}}>Payment Mode</Text>
            </Pressable>
        </View>
            
        </SafeAreaView>
    )

}

export default CheckoutScreen