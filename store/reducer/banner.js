import BannerModel from "../../model/BannerModel"
import {FETCH_BANNER, FETCH_CATBANNER } from "../action/banner"

const initialState = {
    list:[], 
    catList:[]
}

export default (state=initialState, action) => {

    switch(action.type){

        case FETCH_BANNER:
            return{
                ...state,
                list:action.list
            }
        case FETCH_CATBANNER:
            return{
                ...state,
                catList:action.list
            }
        default:
            return state

    }

}