"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_factory_1 = __importDefault(require("../../../domain/customer/factory/customer.factory"));
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
const list_customer_usecase_1 = __importDefault(require("./list.customer.usecase"));
const customer1 = customer_factory_1.default.createWithAddress("John", new address_1.default("street", 123, "city", "state", "zip"));
const customer2 = customer_factory_1.default.createWithAddress("John 2", new address_1.default("street2", 1233, "city2", "state2", "zip2"));
const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    };
};
describe("Unit Test for listing customer use case ", () => {
    it("should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new list_customer_usecase_1.default(repository);
        const output = await useCase.execute({});
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });
});
