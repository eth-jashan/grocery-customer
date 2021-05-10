import AddressModel from "../../model/AddressModel"

export const ADD_ADDRESS = 'ADD_ADDRESS'
export const FETCH_ADDRESS = 'FETCH_ADDRESS'

export const addAddress = (name, room, society, pincode, landmark,city, number) => {

    return async (dispatch, getState) => {
        console.log('number', number)
        const uid = getState().auth.uid
        const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/customer/${uid}/address.json?`,{
            method:'POST',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify({
                name, room, society, pincode, landmark,city, number
            })
        })

        const resData = await response.json()
        dispatch({type:ADD_ADDRESS, id:resData.name, name, room, society, pincode, landmark, city })

    }

}

export const fetchAddress = () => {

    return async (dispatch, getState) => {
        const uid = getState().auth.uid
        const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/customer/${uid}/address.json?`)
        let addressList = []
        
        const resData = await response.json()
        
        for (const key in resData){

            addressList.push(new AddressModel(key, resData[key].name, resData[key].room, resData[key].society, resData[key].landmark, resData[key].city, resData[key].pincode, resData[key].number))

        }
        

        dispatch({type:FETCH_ADDRESS, list:addressList})

    }

}