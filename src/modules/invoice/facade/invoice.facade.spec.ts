import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/facade.factory";


describe("Invoice Facade test", () => {

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

    it("should create a client", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create();
 
        const input = {
            name: "Test",
            document: "123456789",
            street: "Rua 1",
            number: "123",
            complement: "Casa",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 100,
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 200,
                }
            ]    
        };

        const result = await invoiceFacade.generate(input);

        const invoiceFound = await InvoiceModel.findOne({where: {id: result.id}, include: [InvoiceItemModel]});
        expect(invoiceFound).not.toBeNull();
        expect(invoiceFound.name).toBe(input.name);
        expect(invoiceFound.document).toBe(input.document);
        expect(invoiceFound.street).toBe(input.street);
        expect(invoiceFound.number).toBe(input.number);
        expect(invoiceFound.complement).toBe(input.complement);
        expect(invoiceFound.city).toBe(input.city);
        expect(invoiceFound.state).toBe(input.state);
        expect(invoiceFound.zipCode).toBe(input.zipCode);
        expect(invoiceFound.items.length).toBe(input.items.length);
        expect(invoiceFound.items[0].name).toBe(input.items[0].name);
        expect(invoiceFound.items[0].price).toBe(input.items[0].price);
        expect(invoiceFound.items[1].name).toBe(input.items[1].name);
        expect(invoiceFound.items[1].price).toBe(input.items[1].price);
        
    });

    it("should find a client", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create();
 
        const input = {
            name: "Test",
            document: "123456789",
            street: "Rua 1",
            number: "123",
            complement: "Casa",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 100,
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 200,
                }
            ]    
        };

        const result = await invoiceFacade.generate(input);

        const invoiceFound = await invoiceFacade.find({id: result.id});
        expect(invoiceFound).not.toBeNull();
        expect(invoiceFound.id).toBe(result.id);
        expect(invoiceFound.name).toBe(input.name);
        expect(invoiceFound.document).toBe(input.document);
        expect(invoiceFound.address.street).toBe(input.street);
        expect(invoiceFound.address.number).toBe(input.number);
        expect(invoiceFound.address.complement).toBe(input.complement);
        expect(invoiceFound.address.city).toBe(input.city);
        expect(invoiceFound.address.state).toBe(input.state);
        expect(invoiceFound.address.zipCode).toBe(input.zipCode);
        expect(invoiceFound.items.length).toBe(input.items.length);
        expect(invoiceFound.items[0].name).toBe(input.items[0].name);
        expect(invoiceFound.items[0].price).toBe(input.items[0].price);
        expect(invoiceFound.items[1].name).toBe(input.items[1].name);
        expect(invoiceFound.items[1].price).toBe(input.items[1].price);
        
    });
})