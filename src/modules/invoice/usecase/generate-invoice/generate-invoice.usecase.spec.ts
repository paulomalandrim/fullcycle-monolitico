import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const invoice = new Invoice({
    id: new Id('112233'),
    name: 'John Doe',
    document: '123456789',
    address: new Address(new Id('1'), 'Rua 1', '123', 'Casa', 'São Paulo', 'SP', '12345678'), // value object
    items: [ 
        new InvoiceItem({ name: 'Product 1', price: 100 }),
        new InvoiceItem({ name: 'Product 2', price: 200 }),
    ], // Invoice Items entity
});

const MockRepository = () => {
    return {
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        find : jest.fn(),
    };
}

describe('Generate Invoice Usecase unit test', () => {
    it('should find an invoice', async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(repository);

        const input = {
            name: 'John Doe',
            document: '123456789',
            street: 'Rua 1',
            number: '123',
            complement: 'Casa',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '12345678',
            items: [ { id: '1', name: 'Product 1', price: 100 },
                     { id: '2', name: 'Product 2', price: 200 },
            ], // Invoice Items entity
        };
        
        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.street).toBe(invoice.address.street);
        expect(result.number).toBe(invoice.address.number);
        expect(result.complement).toBe(invoice.address.complement);
        expect(result.city).toBe(invoice.address.city);
        expect(result.state).toBe(invoice.address.state);
        expect(result.zipCode).toBe(invoice.address.zipCode);
        expect(result.items).toHaveLength(invoice.items.length);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toBe(300);      
    });
});