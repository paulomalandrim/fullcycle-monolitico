"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_factory_1 = __importDefault(require("../../../domain/product/factory/product.factory"));
const list_customer_usecase_1 = __importDefault(require("./list.customer.usecase"));
const product1 = product_factory_1.default.create("a", "product1", 100);
const product2 = product_factory_1.default.create("a", "product2", 200);
const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
};
describe("Unit Test for listing product use case ", () => {
    it("should list a product", async () => {
        const repository = MockRepository();
        const useCase = new list_customer_usecase_1.default(repository);
        const output = await useCase.execute({});
        expect(output.products.length).toBe(2);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].price).toBe(product2.price);
    });
});
