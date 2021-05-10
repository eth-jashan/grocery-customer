class OrderModel{
constructor(id, number, order, orderTotal, date, status, address, paymentMode, uid){
    this.id = id;
    this.number = number;
    this.order = order;
    this.orderTotal = orderTotal;
    this.date = date;
    this.status= status;
    this.address = address;
    this.paymentMode = paymentMode;
    this.uid = uid

}}

export default OrderModel