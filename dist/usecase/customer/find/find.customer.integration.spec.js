"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_model_1 = __importDefault(require("../../../infrastructure/customer/repository/sequelize/customer.model"));
const customer_repository_1 = __importDefault(require("../../../infrastructure/customer/repository/sequelize/customer.repository"));
const customer_1 = __importDefault(require("../../../domain/customer/entity/customer"));
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
const find_customer_usecase_1 = __importDefault(require("./find.customer.usecase"));
describe("Test find customer use case", () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([customer_model_1.default]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    it("should find a customer", async () => {
        const customerRepository = new customer_repository_1.default();
        const usecase = new find_customer_usecase_1.default(customerRepository);
        const customer = new customer_1.default("123", "Customer");
        const address = new address_1.default("street", 123, "city", "state", "zip");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const input = {
            id: "123",
        };
        const output = {
            id: "123",
            name: "Customer",
            address: {
                street: "street",
                number: 123,
                city: "city",
                state: "state",
                zip: "zip",
            }
        };
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
});
