import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Image, Text ,TouchableOpacity} from 'react-native'


const CategoryScroll = ({data}) => {
    const navigation = useNavigation()
    return(
        <View style={{margin:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('ProductList', {id:data.id, name:data.name})}>
        
        <View style={{padding:8, height:75, width:75, borderRadius:75, backgroundColor:'white',alignSelf:'center'}}>
        <Image
            style={{width:50,height:50, alignSelf:'center'}}
            source={{uri:data.icon}}
        />
        </View>

        <Text style={{fontFamily:'medium',alignSelf:'center',fontSize:14}}>{data.name}</Text>
        </TouchableOpacity>
        </View>
    )

} 
export default CategoryScroll