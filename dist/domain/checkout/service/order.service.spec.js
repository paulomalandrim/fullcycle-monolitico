"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../../customer/entity/customer"));
const order_1 = require("../entity/order");
const order_item_1 = require("../entity/order_item");
const order_service_1 = __importDefault(require("./order.service"));
describe("Order service unit testes", () => {
    it("should add reward points", () => {
        const customer = new customer_1.default("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
    it("should place an order", () => {
        const customer = new customer_1.default("c1", "Customer 1");
        const item1 = new order_item_1.OrderItem("i1", "Item 1", 10, "p1", 1);
        const order = order_service_1.default.placeOrder(customer, [item1]);
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });
    it("should get total of all orders", () => {
        const item1 = new order_item_1.OrderItem("i1", "item 1", 100, "p1", 1);
        const item2 = new order_item_1.OrderItem("i2", "item 2", 200, "p2", 1);
        const item3 = new order_item_1.OrderItem("i3", "item 3", 250, "p3", 2);
        const order1 = new order_1.Order("o1", "c1", [item1]);
        const order2 = new order_1.Order("o2", "c1", [item2, item3]);
        const total = order_service_1.default.total([order1, order2]);
        expect(total).toBe(800);
    });
});
