import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as categoryaction from '../../store/action/category'
import ProductCard from '../component/productCard'
import ProductCard2 from '../component/productCard2'
import { Feather } from '@expo/vector-icons';

const ProductScreen = ({navigation,route}) => {

    const list = useSelector(x=>x.product.productList)
    const {id, name} = route.params
    const product = list.filter(x=>x.catid === id)
    const count  = useSelector(x=>x.cart.cartTotal)
    
    console.log('Category', id, name)

    return(
        <SafeAreaView style={{width:Dimensions.get('window').width, height:Dimensions.get('screen').height, flex:1}}>
        <View style={{width:'100%',padding:8, flexDirection:'row', margin:12, justifyContent:'space-between', alignSelf:'center'}}>
        <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>{name}</Text>
        
        <Feather onPress={()=>navigation.navigate('Cart')} name="shopping-cart" size={24} color={count>0?'#33a466':'black'}/>
        
        </View>
        <FlatList
            
            data={product}
            keyExtractor={x=>x.id}
            renderItem={({item}) => {
                return<ProductCard2
                    item={item}
                />

            }}
        />

        
        
        </SafeAreaView>
    )

}

export default ProductScreen