import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";


export default class FindInvoiceUsecase {

    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway){
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {

        const result = await this._invoiceRepository.find(input.id);

        if(!result){
            throw new Error('Invoice not found');
        }

        const valorTotal = result.items.reduce((acc, item) => acc + item.price, 0);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode,
                },
        items: result.items.map(item => ({
            id: item.id.id,
            name: item.name,
            price: item.price,
        })),
        total: valorTotal,
        createdAt: result.createdAt,
        };        
    }
}