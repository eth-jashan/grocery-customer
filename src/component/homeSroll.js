import { useNavigation } from '@react-navigation/core'
import React from 'react'
import {View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native'
import { useSelector } from 'react-redux'
import ProductCard from './productCard'

const HomeScroll = ({item, index}) => {
    
    const product = useSelector(x=>x.product.productList)
    let list = product.filter(x=>x.catid === item.id)
    const banner = useSelector(x=>x.banner.list)
    const navigation = useNavigation()

    return(
        <View style={{marginVertical:16}}>
        <Text style={{marginVertical:6, fontFamily:'medium', fontSize:20, alignSelf:'center'}}>{`Search by ${item.name}`}</Text>
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={list}
            keyExtractor={x=>x.id}
            horizontal
            renderItem={({item}) => {
                return<ProductCard
                    item={item}
                />
            }}
        />
        {index%3 ===0?<FlatList
          horizontal
            showsHorizontalScrollIndicator={false}
          data={banner}
          keyExtractor={x => x.id}
          renderItem={({item}) =>{
            return<TouchableOpacity onPress={()=>{navigation.navigate('ProductList', {id:item.catid, name:item.category})
            console.log(item.id)}}>
            <View style={{marginVertical:8, alignSelf:'center'}}>
                    
                    <View style={{width:Dimensions.get('screen').width,  borderRadius:10, height:300}}>
                    <Image
                        // resizeMethod='scale'
                        resizeMode='cover'
                        style={{width:'100%',height:"100%"}}
                        source={{uri:item.url}}
                    />
                    </View>               
            </View>  
            </TouchableOpacity>
          }}
        />:null}
        </View>
    )

}

export default HomeScroll