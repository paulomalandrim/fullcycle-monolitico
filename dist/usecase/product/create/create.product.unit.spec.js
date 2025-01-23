"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_product_usecase_1 = __importDefault(require("./create.product.usecase"));
const input = {
    name: "Product Name",
    price: 100
};
const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};
describe("Unit Test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new create_product_usecase_1.default(productRepository);
        const output = await productCreateUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new create_product_usecase_1.default(productRepository);
        input.name = "";
        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name cannot be empty");
    });
    it("should thrown an error when price is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new create_product_usecase_1.default(productRepository);
        input.name = "product";
        input.price = -1;
        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater or equal zero");
    });
});
