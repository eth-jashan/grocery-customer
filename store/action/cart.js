export const ADD_ITEM = "ADD_ITEM"
export const DECREASE_ITEM = 'DECREASE_ITEM'
export const CLEAR_CART = 'CLEAR_CART'

export const addItem = (item, price, wt) => {

    return async (dispatch, getState) => {
        console.log('Done')
        dispatch({type:ADD_ITEM, item:item, price, wt})

    }

}

export const decreaseItem = (item, price, wt) => {

    return async (dispatch, getState) => {

        dispatch({type:DECREASE_ITEM, item:item,  price, wt})

    }

}

export const clearCart = () => {
    return async (dispatch, getState)=>{
        dispatch({type:CLEAR_CART})
    }


}