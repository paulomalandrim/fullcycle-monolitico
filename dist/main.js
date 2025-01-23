"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./domain/customer/value-object/address"));
const customer_1 = __importDefault(require("./domain/customer/entity/customer"));
const order_1 = require("./domain/checkout/entity/order");
const order_item_1 = require("./domain/checkout/entity/order_item");
let customer = new customer_1.default("111", "Paulo Malandrim");
const address = new address_1.default("rua 1", 555, "Campinas", "SP", "1333");
customer.changeAddress(address);
customer.activate();
const item1 = new order_item_1.OrderItem("122", "item1", 100, "123", 10);
const item2 = new order_item_1.OrderItem("123", "item2", 100, "123", 15);
const item3 = new order_item_1.OrderItem("124", "item3", 100, "123", 19);
const order = new order_1.Order("123", "111", [item1, item2, item3]);
