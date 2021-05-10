import React, { useState } from 'react'
import {View, TouchableOpacity, Text, Dimensions, TextInput, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ProductCard from '../component/productCard';

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
        <SafeAreaView>
        <View style={{backgroundColor:'#c9f6cd', width:Dimensions.get('window').width}}>
            <TextInput
                value={resName}
                placeholder="Search here"

                onChangeText={(text)=>continousSearch(text)}
            />
        </View>
        <FlatList
            numColumns={2}
            data={list}
            keyExtractor={x=>x.id}
            renderItem={({item}) =>{
                return<ProductCard
                    item={item}
                />
            }}
        />
        </SafeAreaView>
    )

}

export default DrawerScreen