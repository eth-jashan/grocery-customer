import React, { useState } from 'react'
import {View, TouchableOpacity, Text, Dimensions, TextInput, FlatList, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ProductCard from '../component/productCard';
const {width, height} = Dimensions.get('window')

const DrawerScreen = () => {
    const productList = useSelector(x=>x.product.productList)

    const continousSearch = (text) => {
        
        let list = []
        setResname(text)
        list = productList.filter(x=>x.name.toLowerCase().includes(text.toLowerCase()))
        setList(list)
        
    }

    const [resName, setResname] = useState('')
    const [list, setList] = useState([])
       
    
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <View style={{backgroundColor:'#c9f6cd', width:Dimensions.get('window').width, height:50, paddingHorizontal:8}}>
            <TextInput
                value={resName}
                placeholder="Search here"
                style={{height:50}}
                onChangeText={(text)=>continousSearch(text)}
            />
        </View>
        {list.length>0?<FlatList
            numColumns={2}
            data={list}
            keyExtractor={x=>x.id}
            renderItem={({item}) =>{
                return<ProductCard
                    item={item}
                />
            }}
        />:<Image
                source={require('../../assets/32705.jpg')}
                style={{width:width, height:height*0.5}}
            />}
        </SafeAreaView>
    )

}

export default DrawerScreen