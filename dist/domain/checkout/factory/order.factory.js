"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../entity/order");
const order_item_1 = require("../entity/order_item");
class OrderFactory {
    static create(props) {
        const items = props.items.map((item) => {
            return new order_item_1.OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
        });
        return new order_1.Order(props.id, props.customerId, items);
    }
}
exports.default = OrderFactory;
