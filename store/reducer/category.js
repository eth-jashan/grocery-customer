import CategoryModel from "../../model/categoryModel"
import {  FETCH_CATEGORY } from "../action/category"

const initialState = {
    categoryList:[],
    categoryCount :0
}

export default (state = initialState, action) => {

    switch(action.type){
        
        case FETCH_CATEGORY:
            console.log("reducer", action.list)
            const list = action.list
            const count = action.list.length
            
        return{
            ...state,
            categoryList:list,
            categoryCount:count
        }

        default:
            return state
    }

}