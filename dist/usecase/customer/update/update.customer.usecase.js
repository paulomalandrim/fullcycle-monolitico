"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
class UpdateCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(input) {
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new address_1.default(input.address.street, input.address.number, input.address.city, input.address.state, input.address.zip));
        await this.customerRepository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                state: customer.address.state,
                zip: customer.address.zip
            }
        };
    }
}
exports.default = UpdateCustomerUseCase;
