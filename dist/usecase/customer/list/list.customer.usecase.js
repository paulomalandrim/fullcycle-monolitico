"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListCustomerUseCase {
    constructor(CustomerRepository) {
        this.customerRepository = CustomerRepository;
    }
    async execute(input) {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}
exports.default = ListCustomerUseCase;
class OutputMapper {
    static toOutput(customer) {
        return {
            customers: customer.map((c) => ({
                id: c.id,
                name: c.name,
                address: {
                    street: c.address.street,
                    number: c.address.number,
                    state: c.address.state,
                    zip: c.address.zip,
                    city: c.address.city
                }
            }))
        };
    }
}
