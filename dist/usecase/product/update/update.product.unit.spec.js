"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_factory_1 = __importDefault(require("../../../domain/product/factory/product.factory"));
const update_product_usecase_1 = __importDefault(require("./update.product.usecase"));
const product = product_factory_1.default.create("a", "Product", 200);
const input = {
    id: product.id,
    name: "product updated",
    price: 100
};
const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    };
};
describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new update_product_usecase_1.default(productRepository);
        const output = await productUpdateUseCase.execute(input);
        expect(output).toStrictEqual(input);
    });
});
