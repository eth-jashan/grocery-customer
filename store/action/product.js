export const ADD_PRODUCT = "ADD_PRODUCT"
export const FETCH_PRODUCT = 'FETCH_PRODUCT'
import ProductModel from '../../model/productModel'



export const fetchProduct = () => {

    return async (dispatch, getState)=>{

    const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/product.json?`)
    const resData = await response.json()
    
    const itemList = []

    for(const keys in resData){

        itemList.push(new ProductModel(keys, resData[keys].name, resData[keys].price, resData[keys].wt, resData[keys].description, resData[keys].catName, resData[keys].catId, resData[keys].image, resData[keys].offer === undefined?false:resData[keys].offer, resData[keys].offerPrice ))
    
    }

    

    dispatch({type:FETCH_PRODUCT, list:itemList})

    }

}