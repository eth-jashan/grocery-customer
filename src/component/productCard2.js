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
import AddCart from './AddCart';
import ModalSelector from 'react-native-modal-selector';
import AddCart2 from './AddCart2';


const ProductCard2 = ({item}) => {
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
        label:item.price[keys].offer?`${item.price[keys].wt}`:`${item.price[keys].wt}`,
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
        
        <View style={{width:Dimensions.get('window').width*0.98, padding:8, borderRadius:10, backgroundColor:'white',margin:8, flexDirection:'row',alignSelf:'center',overflow:'hidden'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Detail',{name:'Amul Pasturized Butter', item:item})}>
            <Image
                resizeMode='contain'
                style={{width:100,height:100, borderTopLeftRadius:10, borderTopRightRadius:10, alignSelf:'center'}}
                source={{uri:item.image}}
            />
            {item.price[selectedPrice].offer?<View style={{padding:4, backgroundColor:'red', width:50, borderRadius:4}}>
                <Text style={{fontFamily:'book', color:'white', alignSelf:'center'}}>{(((parseFloat(item.price[selectedPrice].price)-parseFloat(item.price[selectedPrice].offerPrice))/parseFloat(item.price[selectedPrice].price))*100).toFixed()} %</Text>
            </View>:null}
            </TouchableOpacity>
            <View style={{marginTop:8}}>
            <View style={{width:'70%'}}>
                <Text numberOfLines={1} style={{fontFamily:'book', fontSize:18,}}>{item.name}</Text>
                
            </View>
            <View style={{width:'80%',marginVertical:8, padding:4}}>
            <Text numberOfLines={3} style={{fontFamily:'light', fontSize:14, }}>{item.description}</Text>
            </View>    
                <View style={{}}>
                    
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
                    <Pressable style={{borderWidth:1, borderColor:'#3DAB85', padding:4, height:30, borderRadius:8, alignItems:'center',  flexDirection:'row', justifyContent:'space-between', width:100}}>
                        <Text style={{fontFamily:'book', color:'#3DAB85'}}>{productdata[selectedPrice].label}</Text>
                        <AntDesign style={{alignSelf:'center', marginLeft:4}} name="caretdown" size={12} color="#3DAB85" />
                    </Pressable>
                    </View>
                </ModalSelector>

                <View style={{flexDirection:'row', justifyContent:'space-between',width:'70%'}}>
                <Text style={{fontFamily:'medium', fontSize:20, alignSelf:'center'}}>₹ {item.price[selectedPrice].price}</Text>
                {item.price.map((items, index)=>{
                if(index === selectedPrice){
                return<AddCart2
                id = {item.price[index].wt.concat(item.id)}
                addCart={cartHandler}
                decreaseCart={decreaseHandler}
            />}else null
            })}
            </View>
                </View>
            </View>
            
        </View>
        
    )

}
export default ProductCard2