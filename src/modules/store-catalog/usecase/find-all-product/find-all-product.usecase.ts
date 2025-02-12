import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductUsecase implements UseCaseInterface {
    constructor(private productRepository: ProductGateway) {}

    async execute() {
        const products = await this.productRepository.findAll();

        return products.map(product => ({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }));
    }
}