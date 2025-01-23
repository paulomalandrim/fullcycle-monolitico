"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../../domain/product/entity/product"));
const product_factory_1 = __importDefault(require("../../../domain/product/factory/product.factory"));
class CreateProductUseCase {
    constructor(ProductRepository) {
        this.productRepository = ProductRepository;
    }
    async execute(input) {
        const product = product_factory_1.default.create("a", input.name, input.price);
        await this.productRepository.create(new product_1.default(product.id, product.name, product.price));
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}
exports.default = CreateProductUseCase;
