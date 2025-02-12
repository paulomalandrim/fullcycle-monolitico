import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCasesProps{
    findUseCase: UseCaseInterface;
    findAllUseCase: UseCaseInterface;
}

export default class StoreCatalogFacadeInterface implements StoreCatalogFacadeInterface {
    
    private _findUsecase: UseCaseInterface;
    private _findAllUsecase: UseCaseInterface;

    constructor(usecaseprops: UseCasesProps){
        this._findUsecase = usecaseprops.findUseCase;
        this._findAllUsecase = usecaseprops.findAllUseCase;
    }
    
    findProduct(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return this._findUsecase.execute(input);        
    }

    findAllProducts(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return this._findAllUsecase.execute();
    }
}