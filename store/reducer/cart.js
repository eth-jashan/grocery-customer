import { ADD_ITEM, DECREASE_ITEM,CLEAR_CART } from "../action/cart";

class CartModel {
    constructor(id, name, price, wt, description, category, catid, image, quantity, mrp){
        this.id = id;
        this.name = name;
        this.price = price;
        this.wt = wt;
        this.description = description;
        this.category = category;
        this.catid = catid;
        this.image = image;
        this.quantity = quantity
        this.mrp = mrp
    }
}

const initialState = {
    list:{},
    cartTotal:0,
    cartPrice:0,
}

export default (state = initialState, action) => {

    switch(action.type){

        case ADD_ITEM:
            const item = action.item 
            let updatedProduct
            // const itemIncluded = Boolean(state.list[item.id])

        if(Boolean(state.list[action.wt.concat(item.id)])){
            updatedProduct = new CartModel(action.wt.concat(item.id), state.list[action.wt.concat(item.id)].name, (parseFloat(state.list[action.wt.concat(item.id)].price) + parseFloat(action.price)).toFixed(2), action.wt, item.description, item.category,item.catId,item.image,parseInt(state.list[action.wt.concat(item.id)].quantity) +1, action.price)
            console.log(updatedProduct)
            return{
                ...state,
                list:{...state.list,[action.wt.concat(item.id)]:updatedProduct},
                cartTotal:state.cartTotal + 1,
                cartPrice:state.cartPrice + parseFloat(action.price),
                
            }
        }else{
            updatedProduct = new CartModel(action.wt.concat(item.id), item.name, (parseFloat(action.price)).toFixed(2),action.wt, item.description, item.category, item.catId, item.image, 1,action.price)
            console.log(updatedProduct)
            return{
                ...state,
                list:{...state.list,[action.wt.concat(item.id)]:updatedProduct},
                cartTotal:state.cartTotal + 1,
                cartPrice:state.cartPrice + parseFloat(action.price),
                
            }
        }

        case DECREASE_ITEM:
            let deleteItem
            let productData = action.item
            let id = action.wt.concat(productData.id) 
            const currentItem = state.list[id]
            if(currentItem.quantity>1){
                console.log('priceeeee', state.list[id].quantity)
                const selectedItem = new CartModel(id, state.list[id].name, (parseFloat(state.list[id].price) - parseFloat(currentItem.mrp)).toFixed(2), action.wt, productData.description, productData.category, productData.catId, productData.image, state.list[id].quantity - 1, currentItem.mrp)
                deleteItem = {...state.item,[id]:selectedItem}

                return{
                    list:deleteItem,
                    cartTotal:state.cartTotal - 1,
                    cartPrice:parseFloat(state.cartPrice) - parseFloat(currentItem.mrp)
                    
                }
            } else{
                
                deleteItem = {...state.list}
                delete deleteItem[id]
                console.log("Remove Item :", deleteItem)
                return{
                    list:deleteItem,
                    cartTotal:state.cartTotal - 1,
                    cartPrice:parseFloat(state.cartPrice) - parseFloat(currentItem.mrp)
                }
            }

            case CLEAR_CART:
                return initialState

        default:
            return state

    }

}