import React, { useRef, useState } from 'react'
import {View, StyleSheet, Text, Dimensions, Pressable, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  TextInput } from 'react-native-paper';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useDispatch } from 'react-redux';
import * as authAction from '../../store/action/auth'
const {width, height} = Dimensions.get('screen')
import firebase from '../../firebase'


const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const [phoneNumber, setPhoneNumber] = useState('')
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef()
    const [otp, setOtp] = useState(false)
    const [code, setCode] = useState('')

    const signinHandler = async() => {

        const newNum = '+91'+phoneNumber
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        await phoneProvider.verifyPhoneNumber(newNum, recaptchaVerifier.current).then(setVerificationId)      
        setOtp(true)
    }

    const otpHandler = async() => {

        try{
            await dispatch(authAction.loginUser(verificationId, code))
            navigation.navigate('Main')
        }catch(err){
            alert(err)
        }
        

    }

    return(
        <SafeAreaView style={{height:height, width:width}}>
        
            <Image
                style = {[StyleSheet.absoluteFillObject]}
                source={{uri:'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2Fkevin-turcios-HXCzlNYs998-unsplash.jpg?alt=media&token=d396d471-9a13-49cc-bc4c-b5b264d3e659'}}
            />

            <FirebaseRecaptchaVerifierModal
                ref = {recaptchaVerifier}
                firebaseConfig = {firebase.app().options}
            />
            <View style={{width:width,marginTop:height/5, left:16 }}>
                <Text style={styles.heading}>Welcome to Mogambo</Text>
                <Text style={styles.heading2}>Simplify your grocery needs.</Text>
            </View>
            {!otp?<View style={{width:'92%', alignSelf:'center',marginVertical:12, justifyContent:'center'}}>
            <TextInput
                value = {phoneNumber}
                onChangeText={(text)=>setPhoneNumber(text)}
                label="Phone Number"
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>:
            <View style={{width:'92%', alignSelf:'center',marginVertical:12}}>
            <TextInput
                value = {code}
                onChangeText={(text)=>setCode(text)}
                label="Otp Code"
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>}

            <Pressable style={{width:'90%', padding:12, backgroundColor:'#33a466', borderRadius:6, alignSelf:'center',marginVertical:16}} onPress={otp?otpHandler:signinHandler}>
                
                <Text style={{fontFamily:'book', fontSize:20, color:'white', alignSelf:'center'}}>{otp?"Verify Otp":"Get otp"}</Text>
                
            </Pressable>

            {otp?<Pressable style={{marginTop:12}} onPress={()=>setOtp(false)}>
            <Text style={{fontFamily:'book', fontSize:18, alignSelf:'center'}}>Entered the wrong number? Change it</Text>
            </Pressable>:null}

            {otp?<Pressable style={{marginTop:8}}>
            <Text style={{fontFamily:'book', fontSize:18, alignSelf:'center'}}>Didn't recieve the code? Resend it</Text>
            </Pressable>:null}

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    heading:{
        fontFamily:'medium',
        fontSize:28,
        color:'#33a466',  
    },
    heading2:{
        fontFamily:'medium',
        fontSize:20,
        color:'gray',  
    },
    buttonStyle:{
        fontFamily:'book', 
        fontSize:18
    }
})

export default LoginScreen