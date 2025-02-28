import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "./invoice-item.entity";

describe("Invoice Item Unit test", () => {

    it("should create an Invoice Item", () => {
        // Arrange
        const props = {
            name: 'item 1',
            price: 100,
        };

        // Act
        const invoiceItem = new InvoiceItem(props);

        // Assert
        expect(invoiceItem.id.id).toBeDefined();
        expect(invoiceItem.name).toBe('item 1');
        expect(invoiceItem.price).toBe(100);

    });
});