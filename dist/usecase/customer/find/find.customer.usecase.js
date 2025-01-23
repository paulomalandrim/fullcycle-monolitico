"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FindCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(input) {
        const customer = await this.customerRepository.find(input.id);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                state: customer.address.state,
                zip: customer.address.zip,
            }
        };
    }
}
exports.default = FindCustomerUseCase;
