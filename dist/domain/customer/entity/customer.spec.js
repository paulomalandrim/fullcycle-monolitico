"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../value-object/address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit testes", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "John Doe");
        }).toThrow("ID cannot be empty");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrow("Name cannot be empty");
    });
    it("should change name", () => {
        const customer = new customer_1.default("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });
    it("should activate customer", () => {
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("Street 1", 123, "11111", "São Paulo", "11111");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it("should deactivate customer", () => {
        const customer = new customer_1.default("1", "Customer 1");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });
    it("should throw error when address is undefined", () => {
        expect(() => {
            const customer = new customer_1.default("1", "Customer 1");
            customer.activate();
        }).toThrow("Address must be set before activating the customer");
    });
});
