import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { 
    AddProductFacadeInputDto, 
    CheckStockFacadeInputDto, 
    CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps{
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    
    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(usecaseprops: UseCasesProps){
        this._addUsecase = usecaseprops.addUseCase;
        this._checkStockUsecase = usecaseprops.stockUseCase;
    }
    
    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input);        
    }

    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }
}