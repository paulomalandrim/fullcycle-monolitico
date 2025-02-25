import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id('123'),
    amount: 100,
    orderId: '123',
    status: 'approved',
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    };
}

const transactionDeclined = new Transaction({
    id: new Id('123'),
    amount: 99,
    orderId: '123',
    status: 'declined',
});

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
    };
}

describe('Process Payment Usecase unit test', () => {
    it('should aprove a transaction', async () => {
        const repository = MockRepository();
        const usecase = new ProcessPaymentUseCase(repository);

        const input = {
            orderId: '123',
            amount: 100,
        }
        
        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(repository.save).toHaveBeenCalled();
        expect(result.orderId).toBe('123');
        expect(result.status).toBe('approved');
        expect(result.amount).toBe(transaction.amount);        
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
        
    });

    it('should decline a transaction', async () => {
        const repository = MockRepositoryDeclined();
        const usecase = new ProcessPaymentUseCase(repository);

        const input = {
            orderId: '123',
            amount: 99,
        }
        
        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transactionDeclined.id.id);
        expect(repository.save).toHaveBeenCalled();
        expect(result.orderId).toBe('123');
        expect(result.status).toBe('declined');
        expect(result.amount).toBe(transactionDeclined.amount);        
        expect(result.createdAt).toBe(transactionDeclined.createdAt);
        expect(result.updatedAt).toBe(transactionDeclined.updatedAt);
        
    });
});