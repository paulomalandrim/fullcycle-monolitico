"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_customer_usecase_1 = __importDefault(require("./create.customer.usecase"));
const input = {
    name: "john",
    address: {
        street: "street",
        number: 123,
        state: "state",
        zip: "zip",
        city: "city",
    },
};
const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};
describe("Unit Test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        const output = await customerCreateUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                state: input.address.state,
                zip: input.address.zip,
                city: input.address.city,
            },
        });
    });
    it("should thrown an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.name = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name cannot be empty");
    });
    it("should thrown an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.address.street = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    });
});
