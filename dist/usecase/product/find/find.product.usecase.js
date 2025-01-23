"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FindProductUseCase {
    constructor(ProductRepository) {
        this.productRepository = ProductRepository;
    }
    async execute(input) {
        const product = await this.productRepository.find(input.id);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
exports.default = FindProductUseCase;
