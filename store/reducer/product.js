
import ProductModel from "../../model/productModel"
import { FETCH_PRODUCT } from "../action/product"


const initialState={
    productList:[],
    productCount:0
}

export default (state=initialState, action) => {

    switch(action.type){
        case FETCH_PRODUCT:
            
            const list = action.list
            return{
                ...state,
                productList:list,
                productCount:list.length
            }
        
        default:
            return state
        }

}