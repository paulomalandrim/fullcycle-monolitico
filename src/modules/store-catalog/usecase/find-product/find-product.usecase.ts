import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductsInputDto, FindProductsOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
    constructor(private productRepository: ProductGateway) {}

    async execute(product: FindProductsInputDto): Promise<FindProductsOutputDto> {
        const productFound = await this.productRepository.find(product.id);

        return {
            id: productFound.id.id,
            name: productFound.name,
            description: productFound.description,
            salesPrice: productFound.salesPrice,
        };
    }
}