"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    get customerId() {
        return this._customerId;
    }
    get items() {
        return this._items;
    }
    constructor(_id, _customerId, _items) {
        this._id = _id;
        this._customerId = _customerId;
        this._items = _items;
        this._total = this.total();
        this.validate();
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("ID cannot be empty");
        }
        if (this._customerId.length === 0) {
            throw new Error("Customer ID cannot be empty");
        }
        if (this._items.length === 0) {
            throw new Error("Items quantity must be greater than zero");
        }
        return true;
    }
    get id() {
        return this._id;
    }
    total() {
        // AJUSTADO PARA OBTER O TOTAL ATRAVES DO PRICE * QUANTITY AO INVES 
        // DE RECEBER O PRICE CALCULADO DO ITEM
        return this._items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
}
exports.Order = Order;
