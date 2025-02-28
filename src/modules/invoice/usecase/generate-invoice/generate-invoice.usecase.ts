import Address from "../../../@shared/domain/value-object/address.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUsecase {

    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway){
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {


        const inputAddress = new Address( input.street,
                                          input.number,
                                            input.complement,
                                            input.city,
                                            input.state,
                                            input.zipCode,
        );

        let inputItems = [];

        for (let i = 0; i < input.items.length; i++) {
            const item = input.items[i];
            inputItems.push(new InvoiceItem({ name: item.name, price: item.price }));
        }

        const props = {
            name: input.name,
            document: input.document,
            address: inputAddress,
            items: inputItems,
        }

        const invoice = new Invoice(props);

        const result = await this._invoiceRepository.generate(invoice);


        const valorTotal = result.items.reduce((acc, item) => acc + item.price, 0);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            street: result.address.street,
            number: result.address.number,
            complement: result.address.complement,
            city: result.address.city,
            state: result.address.state,
            zipCode: result.address.zipCode,
            items: result.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
        total: valorTotal,
        };        
    }
}