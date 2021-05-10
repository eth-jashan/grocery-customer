import OrderModel from "../../model/OrderModel"

export const CREATE_ORDER = 'CREATE_ORDER'
export const FETCH_ORDER = 'FETCH_ORDER'
export const CREATE_ONLINE = 'CREATE_ONLINE'

export const createOrder = (address, paymentMode, order, orderTotal) => {

    return async (dispatch, getState) => {
        

        const number = getState().auth.cust_num
        let date = new Date().toISOString()
        console.log(date)
        const uid = getState().auth.uid

        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/order.json?',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                number:number,
                address:address,
                order :order,
                payment:paymentMode,
                status:'Not Confirmed',
                date:date,
                orderTotal:orderTotal,
                uid:uid
            })

        })

        const resData = await response.json()
        
        
        dispatch({type:CREATE_ORDER,uid, id:resData.name,orderTotal, order, address, number, date, paymentMode, status:'Not Confirmed'})

    }


}

export const confirmOrder = () => {

    return async (dispatch, getState) => {

        const id = getState().order.id
        const rezpId = getState().order.rzpId

        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/order/${id}.json?`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                status:'Not Confirmed',
                rzpId:  rezpId          
                
            })

        })

    }

}

export const onlineOrder = (address, paymentMode, order, orderTotal) => {

return async (dispatch, getState)=>{
    console.log('Strat1')
        const number = getState().auth.cust_num
        let date = new Date().toISOString()
        console.log(date)
        const uid = getState().auth.uid

        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/order.json?',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                number:number,
                address:address,
                order :order,
                payment:paymentMode,
                status:'Not Paid',
                date:date,
                orderTotal:orderTotal,
                uid:uid,
                rzpId:''
            })

        })

        const resData = await response.json()

    let orderData = {
        "amount":parseFloat(orderTotal)*100,
        "currency": "INR",
        "receipt": resData.name
    }    
    var base64 = require('base-64');
    let username = 'rzp_live_oTfAV52ZxEFWd9';
    let password = 'NsWMfAbyq0rDh66RV0ppOaqb';

    let url = `https://api.razorpay.com/v1/orders`
    
    const response2 =  await fetch(url, {
        headers: new Headers({
            "Authorization": "Basic " +base64.encode(`${username}:${password}`),
           'Content-Type': 'application/json'
    }),
    method:'POST' ,
    body:JSON.stringify(orderData)
  })
  const resData2 = await response2.json()
//   setRzpId(resData2.id)
dispatch({type:CREATE_ONLINE, id:resData.id, rzpId:resData2.id})
}
}

export const fetchOrder = () => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid
        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/order.json?')
        let orderList = []
        const resData = await response.json()
        for(const key in resData){
            console.log('ordersssss')
            orderList.push(new OrderModel(key, resData[key].number, resData[key].order, resData[key].orderTotal, resData[key].date, resData[key].status, resData[key].address, resData[key].paymentMode, resData[key].uid))
        }

        
        console.log('Order', orderList)
        
        dispatch({type:FETCH_ORDER, list:orderList.filter(x=>x.uid === uid)})

    }


}