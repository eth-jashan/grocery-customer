export const ADD_BANNER = 'ADD_BANNER'
export const REMOVE_BANNER = 'REMOVE_BANNER'
export const FETCH_BANNER = 'FETCH_BANNER'



import BannerModel from '../../model/BannerModel'




export const fetchBanner = () => {

    return async (dispatch, getState) => {

        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/banner.json')
        const resData = await response.json()
        let bannerList = []
        for (const key in resData) {
            bannerList.push(new BannerModel(key, resData[key].url))
        }
        dispatch({type:FETCH_BANNER, list:bannerList})
    }

}
