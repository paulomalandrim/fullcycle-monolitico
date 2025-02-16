import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import FindAllProductUsecase from "../usecase/find-all-product/find-all-product.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCasesProps{
    findUseCase: FindProductUseCase;
    findAllUseCase: FindAllProductUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    
    private _findUsecase: FindProductUseCase;
    private _findAllUsecase: FindAllProductUsecase;

    constructor(usecaseprops: UseCasesProps){
        this._findUsecase = usecaseprops.findUseCase;
        this._findAllUsecase = usecaseprops.findAllUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUsecase.execute(id);
        
    }
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        const products = await this._findAllUsecase.execute();
        return { products };
    }

}