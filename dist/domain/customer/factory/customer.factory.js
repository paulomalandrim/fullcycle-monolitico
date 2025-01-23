"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const customer_1 = __importDefault(require("../entity/customer"));
class CustomerFactory {
    static create(name) {
        return new customer_1.default((0, uuid_1.v4)(), name);
    }
    static createWithAddress(name, address) {
        const customer = new customer_1.default((0, uuid_1.v4)(), name);
        customer.changeAddress(address);
        return customer;
    }
}
exports.default = CustomerFactory;
