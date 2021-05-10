export const ADD_ITEM = "ADD_ITEM"
export const DECREASE_ITEM = 'DECREASE_ITEM'
export const CLEAR_CART = 'CLEAR_CART'

export const addItem = (item) => {

    return async (dispatch, getState) => {

        dispatch({type:ADD_ITEM, item:item})

    }

}

export const decreaseItem = (item) => {

    return async (dispatch, getState) => {

        dispatch({type:DECREASE_ITEM, item:item})

    }

}

export const clearCart = () => {
    return async (dispatch, getState)=>{
        dispatch({type:CLEAR_CART})
    }


}