import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "./transaction";

describe("Transaction test", () => {

    it("should create a transaction", () => {
        // Arrange
        const props = {
            id: new Id('1'),
            amount: 100,
            orderId: '1',
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Act
        const transaction = new Transaction(props);

        // Assert
        expect(transaction.id.id).toBe('1');
        expect(transaction.amount).toBe(100);
        expect(transaction.orderId).toBe('1');
        expect(transaction.status).toBe('pending');
        expect(transaction.createdAt).toStrictEqual(props.createdAt);
        expect(transaction.updatedAt).toStrictEqual(props.updatedAt);
    });

    it("should process a transaction approved", () => {
        // Arrange
        const props = {
            id: new Id('1'),
            amount: 100,
            orderId: '1',
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const transaction = new Transaction(props);

        // Act
        transaction.process();

        // Assert
        expect(transaction.status).toBe('approved');
    });

    it("should process a transaction declined", () => {
        // Arrange
        const props = {
            id: new Id('1'),
            amount: 50,
            orderId: '1',
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const transaction = new Transaction(props);

        // Act
        transaction.process();

        // Assert
        expect(transaction.status).toBe('declined');
    });

    it("should throw an error when amount is less than 0", () => {
        // Arrange
        const props = {
            id: new Id('1'),
            amount: -1,
            orderId: '1',
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Act
        const transaction = new Transaction(props);

        // Assert
        expect(() => transaction.validate()).toThrowError('Amount must be greater than 0');
    });
});