import React, { useState } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const{width, height} = Dimensions.get('window')

const AddCart2 = ({ id, addCart, decreaseCart}) => {

    
    
    const cartList = useSelector(x=>x.cart.list)
    
    console.log("iddddd", cartList)
    

    return(
        
        <Pressable onPress={!cartList[id]?addCart:null} style={{width:120, padding:4, borderRadius:8,backgroundColor:'#3DAB85', marginVertical:6}}>
        {!cartList[id]?<Text style={{fontFamily:'book',fontSize:20, color:'white', alignSelf:'center'}}>Add</Text>:
        <View style={{width:'100%', flexDirection:'row-reverse',justifyContent:'space-between'}}>
        <Entypo onPress={addCart} name="plus" size={16} color="white" />
        <Text style={{fontFamily:'book', fontSize:14, color:'white', alignSelf:'center'}}>{cartList[id].quantity}</Text>         
        <Entypo onPress={decreaseCart} name="minus" size={16} color="white" />
        </View>}
        </Pressable>
    )

}

export default AddCart2