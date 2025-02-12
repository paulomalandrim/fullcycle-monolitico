import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {
        const products = ProductModel.findAll();
        
        return (await products).map((product) => 
            new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            })
        );
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
            salesPrice: foundProduct.salesPrice,
        });
    }
}