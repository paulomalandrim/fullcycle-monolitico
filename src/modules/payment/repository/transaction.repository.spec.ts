import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import Transaction from "../domain/transaction";
import TransactionRepository from "./transaction.repository";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Transaction Repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save a transaction", async () => {
        
        const transactionProps = {
            id: new Id('1'),
            orderId: '1',
            amount: 100,
            status: 'approved',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const transaction = new Transaction(transactionProps);
        transaction.aprove();
        const transactionRepository = new TransactionRepository();

        const transactionDb = await transactionRepository.save(transaction);

        expect(transactionDb).not.toBeNull();
        expect(transactionDb.id.id).toEqual(transactionProps.id.id);
        expect(transactionDb.orderId).toEqual(transactionProps.orderId);
        expect(transactionDb.amount).toEqual(transactionProps.amount);
        expect(transactionDb.status).toEqual(transactionProps.status);
        expect(transactionDb.createdAt).toEqual(transactionProps.createdAt);
        expect(transactionDb.updatedAt).toEqual(transactionProps.updatedAt);

        
    });
})