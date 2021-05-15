import React from 'react'
import {View, Text, Dimensions, Image, Pressable, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const OrderScreen = ({navigation}) => {

    const order = useSelector(x=>x.order.list)
    

    const backgroundColor = (item) => {

        if(item.status === 'Not Confirmed'){
            return 'red'
        }else if(item.status === 'Confirmed'){
            return 'orange'
        }else if(item.status === 'Out For Delivery'){
            return 'orange'
        }else if(item.status === 'Delivered'){
            return 'green'
        }

    }

    if(order.length === 0){
        return(<SafeAreaView style={{backgroundColor:'white', height:Dimensions.get('screen').height, width:Dimensions.get('screen').width}}>
        <Text style={{fontFamily:'medium', fontSize:30, alignSelf:'center', marginVertical:12}}>Your Basket</Text>
            <Image
                source={require('../../assets/cart.jpg')}
                style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height*0.5}}
            />
            <Text style={{fontFamily:'book', fontSize:20, alignSelf:'center', marginVertical:12}}>Not Placed Any Orders</Text>
            <Pressable style={{width:Dimensions.get('screen').width*0.8, borderRadius:10, padding:10, backgroundColor:'#33a466', alignSelf:'center'}}>
                <Text style={{alignSelf:'center', color:'white', fontFamily:'book', fontSize:18}}>Start Shopping</Text>
            </Pressable>
        </SafeAreaView>)
    }

    return(
        <SafeAreaView>
            <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>Your Order</Text>
            <FlatList
                style={{marginVertical:10}}
                data={order}
                keyExtractor={x=>x.id}
                renderItem={({item}) => {
                    
                    return<View style={{marginVertical:8, width:Dimensions.get('window').width*0.9, padding:8, borderRadius:8, backgroundColor:backgroundColor(item),alignSelf:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:4}}>
                        <Text style={{fontFamily:'book', fontSize:18, color:'white'}}>{item.date}</Text>
                        <Text style={{fontFamily:'book', fontSize:18, color:'white'}}>{item.status}</Text>
                        </View>
                        <View style={{width:'90%', padding:8, borderRadius:8, backgroundColor:'white',marginVertical:8, alignSelf:'center'}}>
                            <FlatList
                                data={item.order}
                                keyExtractor={x=>x.id}
                                renderItem={({item}) =>{
                                    return<View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                    <View style={{width:'40%'}}>
                                    <Text numberOfLines={1}>{item.name}</Text>
                                    </View>
                                    <Text>{item.quantity}</Text>
                                    <Text>₹ {item.price}</Text>

                                    </View>
                                }}
                            />
                        </View>
                        <Text style={{fontFamily:'book', fontSize:20, color:'white',marginVertical:4}}>₹ {item.orderTotal}</Text>
                    </View>
                }}
            />

        </SafeAreaView>
    )

}

export default OrderScreen