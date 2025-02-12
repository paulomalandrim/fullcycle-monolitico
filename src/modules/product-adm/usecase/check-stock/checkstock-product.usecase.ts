import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockProductInputDto, CheckStockProductOutputDto } from "./checkstock-product.dto";

export default class CheckStockProductUseCase {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway){
        this._productRepository = productRepository;
    }
    
    async execute(input: CheckStockProductInputDto): Promise<CheckStockProductOutputDto> {
        
        const product = await this._productRepository.find(input.id);

        if(!product){
            throw new Error(`Product ${input.id} not found`);
        }

        return {
            id: product.id.id,
            stock: product.stock,
        }
        
    }
}