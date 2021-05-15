export const FETCH_CATBANNER = 'FETCH_CATBANNER'
export const FETCH_BANNER = 'FETCH_BANNER'



import BannerModel from '../../model/BannerModel'
import CatBanner from '../../model/CategoryBanner'


export const fetchCatBanner = () => {

    return async (dispatch, getState) => {

        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/catbanner.json')
        const resData = await response.json()
        let bannerList = []
        for (const key in resData) {
            bannerList.push(new CatBanner(key, resData[key].url, resData[key].catId, resData[key].name))
        }
        console.log('Cat', bannerList)
        dispatch({type:FETCH_CATBANNER, list:bannerList})
    }

}

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
