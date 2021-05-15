
export const FETCH_CATEGORY = 'FETCH_CATEGORY'



import CategoryModel from '../../model/categoryModel'



export const categoryFetch = () => {
    return async (dispatch, getState)=>{
    
    const uid = getState().auth.uid
    const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/category.json?`)
    const resData = await response.json()
    
    const categoryList = []

    for(const keys in resData){
    categoryList.push(new CategoryModel(keys, resData[keys].name, resData[keys].description, resData[keys].icon))
    }
    
    

    dispatch({type:FETCH_CATEGORY, list:categoryList})

}}

