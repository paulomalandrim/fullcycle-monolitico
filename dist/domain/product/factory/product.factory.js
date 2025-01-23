"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../entity/product"));
const uuid_1 = require("uuid");
const product_b_1 = __importDefault(require("../entity/product-b"));
class ProductFactory {
    static create(type, name, price) {
        switch (type) {
            case "a":
                return new product_1.default((0, uuid_1.v4)(), name, price);
            case "b":
                return new product_b_1.default((0, uuid_1.v4)(), name, price);
            default:
                throw new Error("Product type not supported");
        }
    }
}
exports.default = ProductFactory;
