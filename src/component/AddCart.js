import React, { useState } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const{width, height} = Dimensions.get('window')

const AddCart = ({ id, addCart, decreaseCart}) => {

    
    
    const cartList = useSelector(x=>x.cart.list)
    
    console.log("iddddd", cartList)
    

    return(
        
        <Pressable onPress={addCart} style={{width:"100%", padding:10, borderRadius:8,backgroundColor:'#3DAB85', alignSelf:'center',marginVertical:12}}>
        {!cartList[id]?<Text style={{fontFamily:'book',fontSize:20, color:'white', alignSelf:'center'}}>Add To Cart</Text>:
        <View style={{width:"100%", flexDirection:'row-reverse',justifyContent:'space-between'}}>
        <Entypo onPress={addCart} name="plus" size={24} color="white" />
        <Text style={{fontFamily:'book', fontSize:20, color:'white', alignSelf:'center'}}>{cartList[id].quantity}</Text>         
        <Entypo onPress={decreaseCart} name="minus" size={24} color="white" />
        </View>}
        </Pressable>
    )

}

export default AddCart

{/*  */}