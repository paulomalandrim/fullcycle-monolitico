import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/facade.factory";


describe("Payment Facade test", () => {

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

    it("should create a transaction", async () => {

        const transactionFacade = PaymentFacadeFactory.create();
        
        const input = {
            orderId: "1",
            amount: 100,
        };

        const output = await transactionFacade.process(input);
        
        expect(output).not.toBeNull();
        expect(output.transactionId).not.toBeNull();
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("approved");
    });
})