"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../../../../domain/customer/value-object/address"));
const customer_1 = __importDefault(require("../../../../domain/customer/entity/customer"));
const customer_model_1 = __importDefault(require("./customer.model"));
class CustomerRepository {
    async create(entity) {
        await customer_model_1.default.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            state: entity.address.state,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }
    async update(entity) {
        await customer_model_1.default.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            state: entity.address.state,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id
            },
        });
    }
    async find(id) {
        let customerModel;
        try {
            customerModel = await customer_model_1.default.findOne({ where: { id }, rejectOnEmpty: true });
        }
        catch (error) {
            throw new Error("Customer not found");
        }
        const address = new address_1.default(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipcode);
        const customer = new customer_1.default(customerModel.id, customerModel.name);
        customer.changeAddress(address);
        return customer;
    }
    async findAll() {
        const customersModel = await customer_model_1.default.findAll();
        return customersModel.map((customerModel) => {
            const customer = new customer_1.default(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            const address = new address_1.default(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipcode);
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
    }
}
exports.default = CustomerRepository;
