class CartModel {
    constructor(id, name, price, wt, description, category, catid, image, quantity){
        this.id = id;
        this.name = name;
        this.price = price;
        this.wt = wt;
        this.description = description;
        this.category = category;
        this.catid = catid;
        this.image = image;
        this.quantity = quantity
    }
}

export default CartModel