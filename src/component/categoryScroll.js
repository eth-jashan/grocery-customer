import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Image, Text ,TouchableOpacity} from 'react-native'


const CategoryScroll = ({data}) => {
    const navigation = useNavigation()
    return(
        <View style={{margin:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('ProductList', {id:data.id, name:data.name})}>
        <View style={{padding:8, height:100, width:100,  backgroundColor:'white',alignSelf:'center',borderRadius:8}}>
        <Image
            resizeMode='contain'
            style={{width:100,height:75, alignSelf:'center'}}
            source={{uri:data.icon}}
        />
        </View>
        </TouchableOpacity>
        <Text style={{fontFamily:'medium',alignSelf:'center',fontSize:14}}>{data.name}</Text>
        </View>
    )

} 
export default CategoryScroll