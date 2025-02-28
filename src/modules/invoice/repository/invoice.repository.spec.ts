import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import Invoice from "../domain/invoice.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceRepository from "./invoice.repository";

describe("Invoice Repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate an invoice", async () => {
        
        const addressInvoice = new Address(
            'Rua 1',
            '123',
            'Casa',
            'São Paulo',
            'SP',
            '12345678',
        )

        const itensInvoice = [
            new InvoiceItem({ id: new Id('123'), name: 'Product 1', price: 100 }),
            new InvoiceItem({ id: new Id('123'), name: 'Product 2', price: 200 }),
        ];

        const invoiceProps = {
            id: new Id("1"),
            name: 'Test',
            document: '123456789',
            address: addressInvoice,
            items: itensInvoice,
        };

        const invoice = new Invoice(invoiceProps);

        const invoiceRepository = new InvoiceRepository();
        const invoiceDb = await invoiceRepository.generate(invoice);

        expect(invoiceDb).not.toBeNull();
        expect(invoiceProps.id.id).toBe(invoiceDb.id.id);
        expect(invoiceProps.name).toEqual(invoiceDb.name);
        expect(invoiceProps.document).toEqual(invoiceDb.document);
        expect(invoiceProps.address.street).toEqual(invoiceDb.address.street);
        expect(invoiceProps.address.number).toEqual(invoiceDb.address.number);
        expect(invoiceProps.address.complement).toEqual(invoiceDb.address.complement);
        expect(invoiceProps.address.city).toEqual(invoiceDb.address.city);
        expect(invoiceProps.address.state).toEqual(invoiceDb.address.state);
        expect(invoiceProps.address.zipCode).toEqual(invoiceDb.address.zipCode);
        expect(invoiceProps.items.length).toEqual(invoiceDb.items.length);
        expect(invoiceProps.items[0].name).toEqual(invoiceDb.items[0].name);
        expect(invoiceProps.items[0].price).toEqual(invoiceDb.items[0].price);
        expect(invoiceProps.items[1].name).toEqual(invoiceDb.items[1].name);
        expect(invoiceProps.items[1].price).toEqual(invoiceDb.items[1].price);
        
    });

    it("should find an invoice", async () => {
        
        const addressInvoice = new Address(
            'Rua 1',
            '123',
            'Casa',
            'São Paulo',
            'SP',
            '12345678',
        )

        const itensInvoice = [
            new InvoiceItem({ name: 'Product 1', price: 100 }),
            new InvoiceItem({ name: 'Product 2', price: 200 }),
        ];

        const invoiceProps = {
            id: new Id("123"),
            name: 'Test',
            document: '123456789',
            address: addressInvoice,
            items: itensInvoice,
        };

        const invoice = new Invoice(invoiceProps);

        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.generate(invoice);
        const invoiceDb = await invoiceRepository.find(invoiceProps.id.id);

        expect(invoiceDb).not.toBeNull();
        expect(invoiceProps.id.id).toBe(invoiceDb.id.id);
        expect(invoiceProps.name).toEqual(invoiceDb.name);
        expect(invoiceProps.document).toEqual(invoiceDb.document);
        expect(invoiceProps.address.street).toEqual(invoiceDb.address.street);
        expect(invoiceProps.address.number).toEqual(invoiceDb.address.number);
        expect(invoiceProps.address.complement).toEqual(invoiceDb.address.complement);
        expect(invoiceProps.address.city).toEqual(invoiceDb.address.city);
        expect(invoiceProps.address.state).toEqual(invoiceDb.address.state);
        expect(invoiceProps.address.zipCode).toEqual(invoiceDb.address.zipCode);
        expect(invoiceProps.items.length).toEqual(invoiceDb.items.length);
        expect(invoiceProps.items[0].name).toEqual(invoiceDb.items[0].name);
        expect(invoiceProps.items[0].price).toEqual(invoiceDb.items[0].price);
        expect(invoiceProps.items[1].name).toEqual(invoiceDb.items[1].name);
        expect(invoiceProps.items[1].price).toEqual(invoiceDb.items[1].price);
        
    });

    // it("should throw an error when invoice not found", async () => {
        
    //     const invoiceRepository = new InvoiceRepository();
    //     expect( async () => {
    //         await invoiceRepository.find('not found invoice');        
    //     }).toThrow('Invoice not found');
        
    // });
})