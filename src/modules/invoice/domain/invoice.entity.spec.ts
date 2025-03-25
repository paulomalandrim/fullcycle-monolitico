import Address from "../../@shared/domain/value-object/address.value-object";
import Invoice from "./invoice.entity";
import InvoiceItem from "./invoice-item.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Invoice unit test", () => {

    it("should create an Invoice", () => {
        // Arrange
        const props = {
            name: 'John Doe',
            document: '123456789',
            address: new Address(new Id("1"),'Rua 1', '123', 'Casa', 'São Paulo', 'SP', '12345678'), // value object
            items: [ new InvoiceItem({ name: 'Product 1', price: 100 })], // Invoice Items entity
        };

        // Act
        const invoice = new Invoice(props);

        // Assert
        expect(invoice.name).toBe('John Doe');
        expect(invoice.document).toBe('123456789');
        expect(invoice.address.street).toBe('Rua 1');
        expect(invoice.address.number).toBe('123');
        expect(invoice.address.complement).toBe('Casa');
        expect(invoice.address.city).toBe('São Paulo');
        expect(invoice.address.state).toBe('SP');
        expect(invoice.address.zipCode).toBe('12345678');
        expect(invoice.items).toHaveLength(1);
        expect(invoice.items[0].name).toBe('Product 1');
        expect(invoice.items[0].price).toBe(100);
    });
});