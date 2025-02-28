import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCasesProps{
    addUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    
    private _generateUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(usecaseprops: UseCasesProps){
        this._generateUsecase = usecaseprops.addUseCase;
        this._findUsecase = usecaseprops.findUseCase;
    }
    
    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUsecase.execute(input);        
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute(input);
    }
}