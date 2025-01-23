"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const order_factory_1 = __importDefault(require("./order.factory"));
describe("Order factory unit test", () => {
    it("should create an Order", () => {
        const orderProps = {
            id: (0, uuid_1.v4)(),
            customerId: (0, uuid_1.v4)(),
            items: [
                {
                    id: (0, uuid_1.v4)(),
                    name: "Product 1",
                    productId: (0, uuid_1.v4)(),
                    quantity: 1,
                    price: 100,
                }
            ]
        };
        const order = order_factory_1.default.create(orderProps);
        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });
});
