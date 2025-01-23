"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    static increasePrice(prodcts, percentege) {
        prodcts.forEach(product => {
            product.changePrice(product.price + (product.price * percentege / 100));
        });
    }
}
exports.default = ProductService;
