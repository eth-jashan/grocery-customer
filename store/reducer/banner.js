import BannerModel from "../../model/BannerModel"
import { ADD_BANNER, FETCH_BANNER } from "../action/banner"

const initialState = {
    list:[]
}

export default (state=initialState, action) => {

    switch(action.type){

        case FETCH_BANNER:
            return{
                ...state,
                list:action.list
            }
        default:
            return state

    }

}