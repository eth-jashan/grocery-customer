import OrderModel from "../../model/OrderModel"
import { CREATE_ONLINE, CREATE_ORDER, FETCH_ORDER } from "../action/order"

const initialState = {

    list:[],
    online:false,
    id:null,
    rzpId:null

}

export default (state = initialState, action)=>{

    switch(action.type){
        case CREATE_ORDER:
            const newOrder = new OrderModel(action.id, action.number, action.order, action.orderTotal, action.date, action.status, action.address, action.paymrntMode, action.uid)
            return{
                ...state,
                list:[...state.list].concat(newOrder)
            }
        case FETCH_ORDER:
            return{
                ...state,
                list:action.list
            }
        case CREATE_ONLINE:
            return{
                ...state,
                id:action.id,
                rzpId:action.rzpId,
                online:true
            }
        
        default:
            return state
    }

        

}