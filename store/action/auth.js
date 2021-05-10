export const LOGIN_USER = 'LOGIN_USER'
import firebase from '../../firebase'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
import AsyncStorage from '@react-native-async-storage/async-storage';




export const authenticate = (uid,token, number) => {
   return async (dispatch) => {      

    dispatch({type:AUTHENTICATE,token:token,userId:uid, number})
   
}
}

export const loginUser = (verificationId, code) => {

    return async (dispatch, getState) => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,code)
        const auth = await firebase.auth().signInWithCredential(credential)

        const token = await auth.user.getIdToken(true)
        const userId = auth.user.uid 
        const signedIn = auth.additionalUserInfo.isNewUser
        const number = auth.user.phoneNumber

        let expireTime =  (await auth.user.getIdTokenResult()).expirationTime
        expireTime = new Date(expireTime).getTime()/1000
        let issuedTime = (await auth.user.getIdTokenResult()).issuedAtTime
        issuedTime = new Date(issuedTime).getTime()/1000
        let expiration = expireTime - issuedTime

        dispatch({type:LOGIN_USER, token:token, userId:userId, newUser:signedIn, number:number})
        // const expirationDate = new Date(new Date().getTime() + parseInt(expiration)*1000);
        // saveDataToStorage(token,userId,expirationDate);
        saveDataToStorage(token,userId,number);
    }

}

export const logout = () => {
    return async (dispatch, getState)=>{
        dispatch({type:LOGOUT})
    }
}

const saveDataToStorage = (token,userId,number) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token:token,
        userId:userId,
        number:number
    }));
}