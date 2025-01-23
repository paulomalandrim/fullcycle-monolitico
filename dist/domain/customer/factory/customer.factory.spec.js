"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../value-object/address"));
const customer_factory_1 = __importDefault(require("./customer.factory"));
describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        let customer = customer_factory_1.default.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    });
    it("should create a customer with an address", () => {
        const address = new address_1.default("Street", 123, "cyty", "sp", "1233");
        let customer = customer_factory_1.default.createWithAddress("John", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });
});
