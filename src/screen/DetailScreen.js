import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import {View, Image, Text, Dimensions, Pressable, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import CustomBackground from '../component/backgroundComponent'
import ProductCard from '../component/productCard';
import { useDispatch, useSelector } from 'react-redux';
import * as cartAction from '../../store/action/cart'
const {width, height} = Dimensions.get('window')
import { Entypo } from '@expo/vector-icons';
import CartModel from '../../model/CartModel';
import AddCart from '../component/AddCart';

const DetailScreen = ({route, navigation}) => {
    
    
    const{name, item} = route.params
   
    const data = useSelector(x=>x.product.productList)
    const dispatch = useDispatch()

    

    

    const addCart = async() => {
        
        await dispatch(cartAction.addItem(item))
        
    }

    const decreaseCart = async() => {
        

       await dispatch(cartAction.decreaseItem(item))
        
    }
    
    const cart = useSelector(x=>x.cart.list)
    
    const cartCount = useSelector(x=>x.cart.cartTotal)
    
    let cartList = []
    
    for (let keys in cart){    
        cartList.push(new CartModel(cart[keys].id, cart[keys].name, cart[keys].price, cart[keys].wt, cart[keys].description, cart[keys].category, cart[keys].catid, cart[keys].image, cart[keys].quantity))
    }

    const [isThere, setThere] = useState((cartList.filter(x=>x.id === item.id)).length>0?true:false)
    

    const cartAvailable = () => {
        if((cartList.filter(x=>x.id === item.id)).length>0){
            setThere(true)
            
        }else{
            setThere(false)
            
        }
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <ScrollView>
        <View style={{width:width, height:height*0.5,backgroundColor:'white', overflow:'hidden'}}>
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',padding:16}}>
        <View style={{width:30, height:30, borderWidth:2, borderColor:'black', borderRadius:8}}>
        <Ionicons name="arrow-back" size={24} color="black" />
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
        <View style={{width:30, height:30, borderWidth:cartCount>0?0:2, borderColor:cartCount>0?null:'black', borderRadius:8, backgroundColor:cartCount>0?'red':null, alignItems:'center',justifyContent:'center'}}>
        <Ionicons name="cart" size={24} color="black" />
        </View>
        </TouchableOpacity>
        </View>
            <Image
                resizeMode='contain'
                style={{width:'100%', height:'100%',alignSelf:'center', justifyContent:'center'}}
                source={{uri:item.image}}
            />
        </View>
        
        <View style={{flexDirection:'row', justifyContent:'space-between', padding:12}}> 
        <View style={{alignSelf:'center'}}>
        <Text style={{fontFamily:'medium', fontSize:28}}>{item.name}</Text>
        <Text style={{fontFamily:'book', fontSize:20, color:'#33a466'}}>{`1 Package - ${item.wt}`}</Text>
        <Text style={{fontFamily:'medium', fontSize:30, alignItems:'center'}}>₹ {item.price}</Text>
        </View>

        <View style={{alignSelf:'center'}}>
        <View style={{width:40, height:40, alignItems:'center', justifyContent:'center', backgroundColor:'white',borderRadius:10,alignItems:'center'}}>
        <Ionicons name="heart" size={24} color="red" />
        </View>
        
        </View>
        </View>
        <View style={{borderWidth:1, borderColor:'white', width:'90%', borderRadius:10, margin:16}}/>
        <View style={{paddingHorizontal:12}}>
        <Text style={{fontSize:25, fontFamily:'medium'}}>Description</Text>
        <Text style={{fontFamily:'light', fontSize:18}}>{item.description}</Text>
        </View>
        {/*  */} 

        <AddCart
            addCart={addCart}
            decreaseCart={decreaseCart}
            item={item}
            
        />

        
        
        

        <Text style={{fontSize:25, fontFamily:'medium', padding:12}}>Similar Product</Text>
        <FlatList
            data={data}
            keyExtractor={x=>x.id}
            horizontal
            
            renderItem={({item}) => {
                
                return<ProductCard
                    item={item}
                />
            }}
        />
        </ScrollView>
        </SafeAreaView>
    )

}

export default DetailScreen