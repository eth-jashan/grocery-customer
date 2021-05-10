import AddressModel from "../../model/AddressModel"
import { ADD_ADDRESS, FETCH_ADDRESS } from "../action/address"

const initialState = {

    list:[]

}

export default (state=initialState , action) => {

    switch(action.type){

        case ADD_ADDRESS:
        const newAddress = new AddressModel(action.id, action.name, action.room, action.society, action.landmark, action.city, action.pincode)
        const newList = [...state.list].concat(newAddress)
        return{
            ...state,
            list:newList
        }

        case FETCH_ADDRESS:
            return{
                ...state,
                list:action.list
            }

        default:
            return state
    }

}