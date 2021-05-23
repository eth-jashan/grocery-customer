import React,{useState} from 'react'
import { Dimensions, Pressable } from 'react-native'
import {View, Text, StyleSheet, Image, TextInput} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import { CustomPicker } from 'react-native-custom-picker'

import * as cartAction from '../../store/action/cart'
import { useDispatch, useSelector } from 'react-redux';
import CartModel from '../../model/CartModel';
import AddCart from './AddCart';
import ModalSelector from 'react-native-modal-selector';


const ProductCard = ({item}) => {
    const navigation = useNavigation();
    const [selectedPrice, setSelectedPrice] = useState(0);
    let productdata = []
    const dispatch = useDispatch()
        
    const cartHandler = () => {

        dispatch(cartAction.addItem(item, item.price[selectedPrice].price, item.price[selectedPrice].wt))
        console.log("done:::")

    }

    const decreaseHandler = () => {

        dispatch(cartAction.decreaseItem(item, item.price[selectedPrice].price, item.price[selectedPrice].wt))
        console.log("done:::")

    }

    for(let keys in item.price){
        productdata.push({key:keys, 
        label:item.price[keys].offer?`₹ ${item.price[keys].offerPrice} for ${item.price[keys].wt}`:`₹ ${item.price[keys].price} for ${item.price[keys].wt}`,
        component:!item.price[keys].offer?<View style={{ width:'100%'}}>
        <Text style={{color: 'black', fontFamily:'book', fontSize:20}}>₹ {item.price[keys].price} for {item.price[keys].wt}</Text>
        </View>:
        <View style={{ width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{color: 'black', fontFamily:'book', fontSize:20}}>₹ {item.price[keys].price} for {item.price[keys].wt}</Text>
        <View style={{padding:4, backgroundColor:'red', width:'30%', borderRadius:4}}>
                    <Text style={{fontFamily:'book', color:'white', alignSelf:'center'}}>{(((parseFloat(item.price[keys].price)-parseFloat(item.price[keys].offerPrice))/parseFloat(item.price[keys].price))*100).toFixed()} %</Text>
                </View>
        </View> })
    }
    
    
    return(
        
        <View style={{width:Dimensions.get('window').width*0.45, padding:8, borderRadius:10, backgroundColor:'white',margin:8}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Detail',{name:'Amul Pasturized Butter', item:item})}>
            <Image
                resizeMode='contain'
                style={{width:'90%',height:200, borderTopLeftRadius:10, borderTopRightRadius:10, alignSelf:'center'}}
                source={{uri:item.image}}
            />
            {item.price[selectedPrice].offer?<View style={{padding:4, backgroundColor:'red', width:50, borderRadius:4}}>
                <Text style={{fontFamily:'book', color:'white', alignSelf:'center'}}>{(((parseFloat(item.price[selectedPrice].price)-parseFloat(item.price[selectedPrice].offerPrice))/parseFloat(item.price[selectedPrice].price))*100).toFixed()} %</Text>
            </View>:null}
            </TouchableOpacity>
            <View style={{marginTop:8}}>
            <View style={{}}>
                <Text numberOfLines={1} style={{fontFamily:'book', fontSize:20,alignSelf:'center'}}>{item.name}</Text>
            </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    
                <ModalSelector
                    backdropPressToClose
                    data={productdata}
                    initValue="Select something yummy!"
                    supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ setSelectedPrice(parseInt(option.key))}}>
                    <View style={{width:'100%'}}>
                    <Pressable style={{borderWidth:1, borderColor:'#3DAB85', padding:10, height:40, borderRadius:8, alignItems:'center', alignSelf:'center', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontFamily:'book', color:'#3DAB85'}}>{productdata[selectedPrice].label}</Text>
                        <AntDesign style={{alignSelf:'center', marginLeft:4}} name="caretdown" size={12} color="#3DAB85" />
                    </Pressable>
                    </View>
                </ModalSelector>
                </View>
            </View>
            {item.price.map((items, index)=>{
                if(index === selectedPrice){
                return<AddCart
                id = {item.price[index].wt.concat(item.id)}
                addCart={cartHandler}
                decreaseCart={decreaseHandler}
            />}else null
            })}
        </View>
        
    )

}
export default ProductCard