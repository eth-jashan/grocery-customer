import React, {useCallback, useState} from 'react'
import {View, Text,Dimensions, ScrollView, FlatList, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as categoryAction from '../../store/action/category'
import * as productAction from '../../store/action/product'
import * as orderAction from '../../store/action/order'
import * as bannerAction from '../../store/action/banner'
import * as addressAction from '../../store/action/address'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CategoryScroll from '../component/categoryScroll';
import StaggeringView from '../component/stagerringView'
import FadeInView from '../component/fadeInView'
import ProductCard from '../component/productCard'
import HomeScroll from '../component/homeSroll'
import { Entypo ,EvilIcons} from '@expo/vector-icons';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const {screenWidth, screenHeight} = Dimensions.get('window')
    const [load, setLoad] = useState(false)
    const category = useSelector(x=>x.category.categoryList)
    const product = useSelector(x=>x.product.productList)
    const banner = useSelector(x=>x.banner.list)

    useFocusEffect(
        useCallback(() => {
          const fetchUser = async () => {
            setLoad(true)
            await dispatch(categoryAction.categoryFetch())
            await dispatch(productAction.fetchProduct())
            await dispatch(orderAction.fetchOrder())
            await dispatch(bannerAction.fetchBanner())
            dispatch(addressAction.fetchAddress())
            setLoad(false)
            console.log("run")            
          };
          fetchUser();
          return () => {
            fetchUser()
          };
        }, [dispatch])
      );

      

    return(
      <SafeAreaView>
      <ScrollView>
      <View style={{width:screenWidth,alignItems:'center', flexDirection:'row',  justifyContent:'space-between', padding:10}}>
      <Entypo onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} name="list" size={24} color="black" />
          <Text style={{fontFamily:'logo', fontSize:45, color:'#33a466', alignSelf:'center'}}>Mogambo</Text>
      <EvilIcons onPress={()=>navigation.navigate('DrawerScreen')} name="search" size={30} color="black" />
      </View>
      
      {/* <FadeInView style={{width:screenWidth, padding:10}}>
      <Text style={{fontFamily:'light', fontSize:35}}>Welcome</Text>
      <Text style={{fontFamily:'medium', fontSize:40}}>User</Text>
      </FadeInView>         */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={category}
          keyExtractor={x=>x.id}
          renderItem={({item,index}) =>{
            return<CategoryScroll
              data={item}
            />
          }}
          
        />
        <StaggeringView delay={1000} style={{width:Dimensions.get('screen').width, margin:20, borderRadius:20 ,alignSelf:'center',}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={Dimensions.get('window').width}
          decelerationRate='fast'
          horizontal
          data={banner}
          keyExtractor={x => x.id}
          renderItem={({item}) =>{
            return<View style={{marginVertical:4, alignSelf:'center'}}>
                    
                    <View style={{width:Dimensions.get('screen').width,  borderRadius:10, height:(Dimensions.get('screen').width)/2}}>
                    
                    <Image
                        // resizeMethod='scale'
                        resizeMode='cover'
                        style={{width:'100%',height:"100%"}}
                        source={{uri:item.url}}
                    />
                    </View>               
            </View>  
          }}
        />
        </StaggeringView>
        
        <FlatList
          style={{alignSelf:'center'}}
          
          data={category}
        
          renderItem={({item, index})=>{
            return<HomeScroll
              item={item}
              index={index}
            />
          }}
  
        />
  
        </ScrollView>    
      </SafeAreaView>
      )
  
  }

export default HomeScreen