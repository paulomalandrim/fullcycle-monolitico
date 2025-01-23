"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_factory_1 = __importDefault(require("../../../domain/customer/factory/customer.factory"));
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
const update_customer_usecase_1 = __importDefault(require("./update.customer.usecase"));
const customer = customer_factory_1.default.createWithAddress("John", new address_1.default("street", 123, "city", "state", "zip"));
const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "street updated",
        number: 122,
        city: "city updated",
        state: "state updated",
        zip: "zip updated"
    }
};
const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    };
};
describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new update_customer_usecase_1.default(customerRepository);
        const output = await customerUpdateUseCase.execute(input);
        expect(output).toStrictEqual(input);
    });
});
