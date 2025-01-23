"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(_id, _name, _price) {
        this._id = _id;
        this._name = _name;
        this._price = _price;
        this.validate();
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("ID cannot be empty");
        }
        if (this._name.length === 0) {
            throw new Error("Name cannot be empty");
        }
        if (this._price < 0) {
            throw new Error("Price must be greater or equal zero");
        }
        return true;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
    changePrice(price) {
        this._price = price;
        this.validate();
    }
    get price() {
        return this._price;
    }
}
exports.default = Product;
