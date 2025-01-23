"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateProductUseCase {
    constructor(ProductRepository) {
        this.productRepository = ProductRepository;
    }
    async execute(input) {
        const product = await this.productRepository.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.productRepository.update(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}
exports.default = UpdateProductUseCase;
