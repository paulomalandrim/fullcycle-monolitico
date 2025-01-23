"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../entity/order");
const uuid_1 = require("uuid");
class OrderService {
    static total(orders) {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
    static placeOrder(customer, items) {
        if (items.length === 0) {
            throw new Error("Order must have at least one item");
        }
        const order = new order_1.Order((0, uuid_1.v4)(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
}
exports.default = OrderService;
