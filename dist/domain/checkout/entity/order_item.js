"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    constructor(id, name, price, productId, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }
    get quantity() {
        return this._quantity;
    }
    get name() {
        return this._name;
    }
    get productId() {
        return this._productId;
    }
    validate() {
        if (this._quantity == 0) {
            throw new Error("Quantity must be greater than zero");
        }
        return true;
    }
    get id() {
        return this._id;
    }
    get price() {
        //return this._price * this._quantity;
        // Campo foi ajustado pois ao devolver o price * quantity o conteúdo do 
        // objeto inserido e o objeto lido são diferentes
        return this._price;
    }
}
exports.OrderItem = OrderItem;
