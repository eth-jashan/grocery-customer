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

        if(Boolean(state.list[item.id])){
            updatedProduct = new CartModel(item.id, state.list[item.id].name, (parseFloat(state.list[item.id].price) + parseFloat(item.price)).toFixed(2), item.wt, item.description, item.category,item.catId,item.image,parseInt(state.list[item.id].quantity) +1, item.price)
            console.log(updatedProduct)
            return{
                ...state,
                list:{...state.list,[item.id]:updatedProduct},
                cartTotal:state.cartTotal + 1,
                cartPrice:state.cartPrice + parseFloat(item.price),
                
            }
        }else{
            updatedProduct = new CartModel(item.id, item.name, (parseFloat(item.price)).toFixed(2),item.wt, item.description, item.category, item.catId, item.image, 1,item.price)
            console.log(updatedProduct)
            return{
                ...state,
                list:{...state.list,[item.id]:updatedProduct},
                cartTotal:state.cartTotal + 1,
                cartPrice:state.cartPrice + parseFloat(item.price),
                
            }
        }

        case DECREASE_ITEM:
            let deleteItem
            let productData = action.item 
            const currentItem = state.list[productData.id]
            if(currentItem.quantity>1){
                
                const selectedItem = new CartModel(productData.id, state.list[productData.id].name, (parseFloat(state.list[productData.id].price) - parseFloat(currentItem.mrp)).toFixed(2), productData.wt, productData.description, productData.category, productData.catId, productData.image, state.list[productData.id].quantity - 1, currentItem.mrp)
                deleteItem = {...state.item,[productData.id]:selectedItem}
                
                console.log("price",currentItem.mrp )

                return{
                    list:deleteItem,
                    cartTotal:state.cartTotal - 1,
                    cartPrice:parseFloat(state.cartPrice) - parseFloat(currentItem.mrp)
                    
                }
            } else{
                
                deleteItem = {...state.list}
                delete deleteItem[productData.id]
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