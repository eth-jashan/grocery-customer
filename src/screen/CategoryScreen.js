import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as categoryaction from '../../store/action/category'

const CategoryScreen = ({navigation}) => {

    const list = useSelector(x=>x.category.categoryList)
    console.log("list", list)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(categoryaction.categoryFetch())
    },[])
    const data = ['1', '2', '3', '4', '5', '6']

    return(
        <SafeAreaView style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height, flex:1}}>
        <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>Categories</Text>

        <FlatList
            data={list}
            keyExtractor={x=>x.id}
            renderItem={({item}) => {
                return<TouchableOpacity onPress={()=>navigation.navigate('ProductList', {id:item.id, name:item.name})}>
                <View style={{padding:16,width:Dimensions.get('window').width*0.85, borderRadius:8, height:Dimensions.get('window').height/6, borderWidth:1, borderColor:"#cccccc", alignSelf:'center', marginVertical:12}}>
                    <Image
                        resizeMode='cover'
                        source={{uri:item.icon}}
                        style={[StyleSheet.absoluteFillObject]}
                    />
                    <Text style={{fontFamily:'book', fontSize:22,top:'70%', color:'white', alignSelf:'center'}}>{item.name}</Text>
                    {/* <Text style={{fontFamily:'book', fontSize:18,top:'70%'}}>{item.description}</Text> */}
                </View>
                </TouchableOpacity>
            }}
        />
        
        </SafeAreaView>
    )

}

export default CategoryScreen