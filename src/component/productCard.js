import React from 'react'
import { Dimensions } from 'react-native'
import {View, Text, StyleSheet, Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProductCard = ({item}) => {
    const navigation = useNavigation();
    
    
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('Detail',{name:'Amul Pasturized Butter', item:item})}>
        <View style={{width:Dimensions.get('window').width*0.45, padding:8, borderRadius:10, backgroundColor:'white',margin:8}}>
            <Image
                resizeMode='contain'
                style={{width:'90%',height:200, borderTopLeftRadius:10, borderTopRightRadius:10, alignSelf:'center'}}
                source={{uri:item.image}}
            />
            <View style={{marginTop:8}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text numberOfLines={1} style={{fontFamily:'book', fontSize:18,alignSelf:'center'}}>{item.name}</Text>
                {item.offer?<View style={{padding:4, backgroundColor:'red', width:50, borderRadius:4}}>
                    <Text style={{fontFamily:'book', color:'white', alignSelf:'center'}}>{((parseFloat(item.price)-parseFloat(item.offerPrice))/parseFloat(item.price))*100} %</Text>
                </View>:null}
            </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{marginVertical:4}}>
                    <Text style={{fontFamily:'light' }}>{item.wt}</Text>
                    <View style={{flexDirection:'row'}}>
                    <View>
                    <Text style={{fontFamily:item.offer?'light':'medium', fontSize:item.offer?16:18}}>₹ {item.price}</Text>
                    {item.offer?<View style={{width:'100%', borderWidth:0.7, borderColor:'black', bottom:8}}/>:null}
                    </View>
                    {item.offer?<Text style={{fontFamily:'medium', fontSize:18, marginHorizontal:6, alignSelf:'center'}}>₹ {item.offerPrice}</Text>:null}
                    </View>
                    </View>
                    {/* <AntDesign style={{alignSelf:'center'}} name="heart" size={20} color="red" /> */}
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )

}
export default ProductCard