import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Pressable, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as addressAction from '../../store/action/address'
import AddressModel from '../../model/AddressModel';

const {width, height} = Dimensions.get('window')



const AddressScreen = ({navigation}) => {

    const [location, setLocation] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [long, setLong] = useState(false)
    const [latitude, setLatitude] = useState(19.012683)
    const [longitude, setLongitude] = useState(73.0133055)

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [society, setSociety] = useState('')
    const [landmark, setLandmark] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [number,setNumber] = useState()
    const adressList = useSelector(x=>x.address.list)
   


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
    })();
  }, []);

  const dispatch = useDispatch()

  const addressHandler = (item) => {
    if(list>0){
      
      navigation.navigate('Checkout',{address:item})
    }else{
    {if(name === '' || room === '' || society === '' || landmark === '' || pincode === '' || city === ''){
      alert('All Fields are compulsory')
    }else{
    dispatch(addressAction.addAddress(name, room, society,pincode, landmark, city, number))
    let addressItem = new AddressModel(0,name, room, society, landmark, city, pincode)
    
    navigation.navigate('Checkout',{address:addressItem})
  }}}
  }
  const [list, setList] = useState(adressList.length>0) 
  const geocoding = async() => {
    const response = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=19.01268&longitude=73.01331&localityLanguage=en')
    
  }

  if(list>0){
  return(<SafeAreaView style={{flex:1}}>
  <Text style={{fontFamily:'medium', fontSize:28, alignSelf:'center', marginVertical:16}}>Saved Address</Text>
  <FlatList
    
    data={adressList}
    keyExtractor={x=>x.id}
    renderItem={({item}) =>{
      return<TouchableOpacity onPress={()=>addressHandler(item)}>
      <View style={{width:width*0.9, borderRadius:10, padding:8, alignSelf:'center', backgroundColor:'white', margin:8}}>
        <Text style={{fontFamily:'medium', fontSize:18}}>{item.name}</Text>
        <Text style={{fontFamily:'book'}}>{item.room}</Text>
        <Text style={{fontFamily:'book'}}>{item.society}</Text>
        <Text style={{fontFamily:'book'}}>{item.pincode}, {item.city}</Text>
      </View>
      </TouchableOpacity>
    }}
  />
  <Pressable onPress={()=>setList(0)} style={{backgroundColor:'green', padding:8, borderRadius:8, bottom:20}}>
    <Text style={{fontFamily:'medium', color:'white', alignSelf:'center'}}>Add New</Text>
  </Pressable>
  </SafeAreaView>)

  }
  

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <ScrollView>
            {location &&
            <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').width}}>
            <MapView
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.000421,
              }}
                
              style={{width:'100%', height:'100%'}}>
                
                <Marker
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                />

            </MapView>
            </View>}

            
            <Text style={{fontFamily:'medium', fontSize:28, alignSelf:'center', marginVertical:16}}>My Address</Text>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {name}
                onChangeText={setName}
                label='My Name'
                mode = 'flat'
                style={{backgroundColor:'white'}}
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                keyboardType='number-pad'
                value = {number}
                onChangeText={setNumber}
                label='My Number'
                mode = 'flat'
                style={{backgroundColor:'white'}}
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {room}
                onChangeText={setRoom}
                label='House/Flat/Block No.'
                mode = 'flat'
                style={{backgroundColor:'white'}}
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {society}
                onChangeText={setSociety}
                label='Society/Building/Complex'
                mode = 'flat'
                style={{backgroundColor:'white'}}
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {landmark}
                onChangeText={setLandmark}
                label='Landmark'
                mode = 'flat'
                style={{backgroundColor:'white'}}
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            
            <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-between', width:'92%'}}>
            <View style={{width:'47%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                
                value = {city}
                onChangeText={setCity}
                label='City'
                mode = 'flat'
                style={{backgroundColor:'white'}}
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'47%', alignSelf:'center', marginVertical:4}}>
            <TextInput
            keyboardType='number-pad'
                value = {pincode}
                onChangeText={setPincode}
                label='Pincode'
                mode = 'flat'
                style={{backgroundColor:'white'}}
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            </View>

            <Pressable onPress={addressHandler} style={{width:width*0.9, padding:10, borderRadius:8,backgroundColor:'#3DAB85', alignSelf:'center',marginVertical:12}}>
            <Text style={{fontFamily:'book',fontSize:20, color:'white', alignSelf:'center'}}>Proceed To Checkout</Text>
            </Pressable>

            </ScrollView>
            
        </SafeAreaView>
    )

}

export default AddressScreen