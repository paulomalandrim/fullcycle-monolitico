import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async find(id: string): Promise<Product> {
        const foundProduct = await ProductModel.findOne({where: {id: id}})

        if (!foundProduct) {
            throw new Error('Product not found');
        }

        return new Product({
            id: new Id(foundProduct.id),
            name: foundProduct.name,
            description: foundProduct.description,
            purchasePrice: foundProduct.purchasePrice,
            stock: foundProduct.stock,
            createdAt: foundProduct.createdAt,
            updatedAt: foundProduct.updatedAt,
        });
    }
}