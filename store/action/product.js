export const ADD_PRODUCT = "ADD_PRODUCT"
export const FETCH_PRODUCT = 'FETCH_PRODUCT'
import ProductModel from '../../model/productModel'



export const fetchProduct = () => {

    return async (dispatch, getState)=>{

    const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/product.json?`)
    const resData = await response.json()
    
    const itemList = []

    for(const keys in resData){
            console.log('Weight', resData[keys].price)

        itemList.push(new ProductModel(keys, resData[keys].name, resData[keys].price,  resData[keys].description, resData[keys].catName, resData[keys].catId, resData[keys].image))
    
    }

    

    dispatch({type:FETCH_PRODUCT, list:itemList})

    }

}