"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_repository_1 = __importDefault(require("./customer.repository"));
const customer_1 = __importDefault(require("../../../../domain/customer/entity/customer"));
const address_1 = __importDefault(require("../../../../domain/customer/value-object/address"));
const customer_model_1 = __importDefault(require("./customer.model"));
describe("Customer repository test", () => {
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
    it("should create a customer", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("rua 1", 111, "Campinas", "SP", "13033333");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const customerModel = await customer_model_1.default.findOne({ where: { id: "1" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            zipcode: customer.address.zip,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });
    it("should update customer's address", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("rua 1", 111, "Campinas", "SP", "13033333");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const newAddress = new address_1.default("avenida 2", 222, "Sao Paulo", "SP", "14000000");
        customer.changeAddress(newAddress);
        await customerRepository.update(customer);
        const updatedCustomerModel = await customer_model_1.default.findOne({ where: { id: "1" } });
        expect(updatedCustomerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            zipcode: customer.address.zip,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });
    it("should retrieve customer by ID after creation", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("rua 1", 111, "Campinas", "SP", "13033333");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const retrievedCustomer = await customerRepository.find("1");
        expect(retrievedCustomer).not.toBeNull();
        expect(retrievedCustomer.id).toBe(customer.id);
        expect(retrievedCustomer.name).toBe(customer.name);
        expect(retrievedCustomer.address.street).toBe(customer.address.street);
        expect(retrievedCustomer.address.number).toBe(customer.address.number);
        expect(retrievedCustomer.address.city).toBe(customer.address.city);
        expect(retrievedCustomer.address.state).toBe(customer.address.state);
        expect(retrievedCustomer.address.zip).toBe(customer.address.zip);
        expect(retrievedCustomer.isActive()).toBe(false);
        expect(retrievedCustomer.rewardPoints).toBe(customer.rewardPoints);
    });
    it("should throw an error when customer is not found", async () => {
        const customerRepository = new customer_repository_1.default();
        expect(async () => {
            await customerRepository.find("12323");
        }).rejects.toThrow("Customer not found");
    });
});
