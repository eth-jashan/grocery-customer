import React, {useState} from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as orderAction from '../../store/action/order'
import * as cartAction from '../../store/action/cart'
// import AddressModel from '../../model/AddressModel'
import RazorpayCheckout from 'react-native-razorpay';
import { Ionicons,AntDesign  } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
const {width, height} = Dimensions.get('window')
const PaymentMode = ({navigation, route}) => {

    const{total, cartList, addressList} = route.params
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    
    const orderHandler = async() => {
        setLoad(true)
        await dispatch(orderAction.createOrder(addressList, "Cash", cartList, total))
        await dispatch(cartAction.clearCart())
        setLoad(false)
        navigation.navigate('Home')

    }
    let username = 'rzp_live_RayLD1sy44YCyI';
    let password = 'NsWMfAbyq0rDh66RV0ppOaqb';
    const orderId = useSelector(x=>x.order.id)
    console.log('id inside', orderId)
    const checkoutHandler = () => {
        var options = {
            description: 'Scan towards hassle free dine in',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: username,
            amount: '500',//(parseFloat(total)*100).toString()
            name: 'Mogambo',
            order_id: orderId,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            
            theme: {color: '#33a466'}
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            dispatch(orderAction.confirmOrder(orderId))
            dispatch(cartAction.clearCart())
            navigation.navigate('Home')
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }
    const onlineHandler = async() => {
        setLoad(true)
        console.log('Strat')
        await dispatch(orderAction.onlineOrder(addressList, "Online", cartList, total))
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
        <SafeAreaView style={{flex:1}}>
            <Text style={{fontFamily:'medium', fontSize:28, alignSelf:'center', marginVertical:20}}>Select A Mode</Text>
            <TouchableOpacity onPress={orderHandler}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row' }}>
            <View style={{width:50, height:50, backgroundColor:'#33a466', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name="ios-cash-outline" size={24} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>₹ {total}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Pay On delivery</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onlineHandler}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row', marginTop:16 }}>
            <View style={{width:50, height:50, backgroundColor:'#33a466', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <AntDesign name="creditcard" size={24} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>₹ {total}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Pay Online</Text>
            </View>
            </View>
            </TouchableOpacity>

        </SafeAreaView>
    )

}
export default PaymentMode