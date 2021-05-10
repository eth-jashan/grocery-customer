import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as categoryaction from '../../store/action/category'
import ProductCard from '../component/productCard'

const ProductScreen = ({navigation,route}) => {

    const list = useSelector(x=>x.product.productList)
    const {id, name} = route.params
    const product = list.filter(x=>x.catid === id)
    
    console.log('Category', id, name)

    return(
        <SafeAreaView style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height, flex:1}}>
        <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>{name}</Text>

        <FlatList
            numColumns={2}
            data={product}
            keyExtractor={x=>x.id}
            renderItem={({item}) => {
                return<ProductCard
                    item={item}
                />

            }}
        />
        
        </SafeAreaView>
    )

}

export default ProductScreen