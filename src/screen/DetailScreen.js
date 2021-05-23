import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import {View, Image, Text, Dimensions, Pressable, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import CustomBackground from '../component/backgroundComponent'
import ProductCard from '../component/productCard';
import { useDispatch, useSelector } from 'react-redux';
import * as cartAction from '../../store/action/cart'
const {width, height} = Dimensions.get('window')
import { AntDesign } from '@expo/vector-icons';
import CartModel from '../../model/CartModel';
import AddCart from '../component/AddCart';
import ModalSelector from 'react-native-modal-selector';

const DetailScreen = ({route, navigation}) => {
    
    
    const{name, item} = route.params
   
    const data = useSelector(x=>x.product.productList)
    const dispatch = useDispatch()

    

    

    const addCart = async() => {
        
        await dispatch(cartAction.addItem(item, item.price[selectedPrice].price, item.price[selectedPrice].wt))
        
    }

    const decreaseCart = async() => {
        

       await dispatch(cartAction.decreaseItem(item, item.price[selectedPrice].price, item.price[selectedPrice].wt))
        
    }
    
    const cart = useSelector(x=>x.cart.list)
    
    const cartCount = useSelector(x=>x.cart.cartTotal)
    
    let cartList = []
    
    for (let keys in cart){    
        cartList.push(new CartModel(cart[keys].id, cart[keys].name, cart[keys].price, cart[keys].wt, cart[keys].description, cart[keys].category, cart[keys].catid, cart[keys].image, cart[keys].quantity))
    }

    const productdata = []

    const [isThere, setThere] = useState((cartList.filter(x=>x.id === item.id)).length>0?true:false)
    const [selectedPrice, setSelectedPrice] = useState(0);
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

    const cartAvailable = () => {
        if((cartList.filter(x=>x.id === item.id)).length>0){
            setThere(true)
            
        }else{
            setThere(false)
            
        }
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <ScrollView>
        <View style={{width:width, height:height*0.5,backgroundColor:'white', overflow:'hidden'}}>
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',padding:16}}>
        <View style={{width:30, height:30, borderWidth:2, borderColor:'black', borderRadius:8}}>
        <Ionicons name="arrow-back" size={24} color="black" />
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
        <View style={{width:30, height:30, borderWidth:cartCount>0?0:2, borderColor:cartCount>0?null:'black', borderRadius:8, backgroundColor:cartCount>0?'red':null, alignItems:'center',justifyContent:'center'}}>
        <Ionicons name="cart" size={24} color="black" />
        </View>
        </TouchableOpacity>
        </View>
            <Image
                resizeMode='contain'
                style={{width:'100%', height:'100%',alignSelf:'center', justifyContent:'center'}}
                source={{uri:item.image}}
            />
        </View>
        
        <View style={{flexDirection:'row', justifyContent:'space-between', padding:12}}> 
        <View style={{alignSelf:'center'}}>
        <Text style={{fontFamily:'medium', fontSize:28}}>{item.name}</Text>
        </View>

        <View style={{alignSelf:'center'}}>
        <View style={{width:40, height:40, alignItems:'center', justifyContent:'center', backgroundColor:'white',borderRadius:10,alignItems:'center'}}>
        <Ionicons name="heart" size={24} color="red" />
        </View>
        
        </View>
        </View>
        <View style={{borderWidth:1, borderColor:'white', width:'90%', borderRadius:10, margin:16}}/>
        <View style={{paddingHorizontal:12}}>
        <Text style={{fontSize:25, fontFamily:'medium'}}>Description</Text>
        <Text style={{fontFamily:'light', fontSize:18}}>{item.description}</Text>
        </View>
        {/*  */} 

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
                    <Pressable style={{marginTop:12, borderWidth:1, borderColor:'#3DAB85', padding:10, height:40, borderRadius:8, alignItems:'center', alignSelf:'center', flexDirection:'row', justifyContent:'space-between',width:'90%'}}>
                        <Text style={{fontFamily:'book', color:'#3DAB85'}}>{productdata[selectedPrice].label}</Text>
                        <AntDesign style={{alignSelf:'center', marginLeft:4}} name="caretdown" size={12} color="#3DAB85" />
                    </Pressable>
                    </View>
        </ModalSelector>

        {item.price.map((items, index)=>{
                if(index === selectedPrice){
                return<AddCart
                id = {item.price[index].wt.concat(item.id)}
                addCart={addCart}
                decreaseCart={decreaseCart}
            />}else null
            })}

        
        
        

        <Text style={{fontSize:25, fontFamily:'medium', padding:12}}>Similar Product</Text>
        <FlatList
            data={data}
            keyExtractor={x=>x.id}
            horizontal
            
            renderItem={({item}) => {
                
                return<ProductCard
                    item={item}
                />
            }}
        />
        </ScrollView>
        </SafeAreaView>
    )

}

export default DetailScreen