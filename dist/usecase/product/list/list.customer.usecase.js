"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListProductUseCase {
    constructor(ProductRepository) {
        this.productRepository = ProductRepository;
    }
    async execute(input) {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}
exports.default = ListProductUseCase;
class OutputMapper {
    static toOutput(product) {
        return {
            products: product.map((c) => ({
                id: c.id,
                name: c.name,
                price: c.price
            }))
        };
    }
}
