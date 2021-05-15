import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import {View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native'
import { useSelector } from 'react-redux'
import ProductCard from './productCard'

const HomeScroll = ({item, index}) => {
    
    const product = useSelector(x=>x.product.productList)
    const banner1 = useSelector(x=>x.banner.catList)
    console.log('Banner', banner1)
    let list = product.filter(x=>x.catid === item.id)
    const banner = useSelector(x=>x.banner.list)
    const navigation = useNavigation()
    const [id, setId] = useState(null)
    
    const setid = (id) => {
      setId(id)
    }

    return(
        <View style={{marginVertical:16}}>
        <Text style={{marginVertical:6, fontFamily:'medium', fontSize:20, alignSelf:'center'}}>{`Search by ${item.name}`}</Text>
        {index%2 ===0 ?
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={banner1.filter(x=>x.catId === id)}
          keyExtractor={x => x.id}
          renderItem={({item}) =>{
            
            console.log('CatId', id)
            return<TouchableOpacity onPress={()=>{navigation.navigate('ProductList', {id:item.catId, name:item.name})
            console.log(item.id)}}>
            <View style={{marginVertical:8, alignSelf:'center'}}>
            
                    <View style={{width:Dimensions.get('screen').width,  borderRadius:10, height:(Dimensions.get('screen').width/2)}}>
                    <Image
                        
                        style={{width:'100%',height:"100%"}}
                        source={{uri:item.url}}
                    />
            </View>               
            </View>  
            </TouchableOpacity>
          }}
        />:null}
        
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={list}
            keyExtractor={x=>x.id}
            horizontal
            renderItem={({item}) => {

                setid(item.catid)

                return<ProductCard
                    item={item}
                />
            }}
        />
        
        </View>
    )

}

export default HomeScroll