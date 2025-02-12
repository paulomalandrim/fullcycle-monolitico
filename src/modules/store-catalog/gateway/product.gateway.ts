import Product from "../domain/product.entity";

export default interface ProductGateway {
    findAll(): Promise<Product[]>; // This method will return an array of Product entities
    find(id: string): Promise<Product>; // This method will return a Product entity or undefined
}