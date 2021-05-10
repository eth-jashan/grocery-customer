import { LOGIN_USER , AUTHENTICATE, LOGOUT} from "../action/auth"

const initialState = {
    cust_name : 'user',
    cust_num: null,
    uid: null,
    token: null,
    cust_mail : ''
}

export default (state = initialState, action) => {

    switch(action.type){
        case AUTHENTICATE:
            return{
                ...state,
                token : action.token,
                uid : action.userId,
                cust_num:action.number,
            }

        case LOGIN_USER:
            return{
                ...state,
                cust_num:action.number,
                uid:action.userId,
                token:action.token
            }
        case LOGOUT:
            return state
        default:
            return state
    }

}