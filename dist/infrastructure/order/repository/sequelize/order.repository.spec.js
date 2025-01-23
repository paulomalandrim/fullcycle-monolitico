"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_repository_1 = __importDefault(require("../../../customer/repository/sequelize/customer.repository"));
const customer_1 = __importDefault(require("../../../../domain/customer/entity/customer"));
const address_1 = __importDefault(require("../../../../domain/customer/value-object/address"));
const customer_model_1 = __importDefault(require("../../../customer/repository/sequelize/customer.model"));
const procuct_model_1 = __importDefault(require("../../../produtct/repository/sequelize/procuct.model"));
const product_repository_1 = __importDefault(require("../../../produtct/repository/sequelize/product.repository"));
const product_1 = __importDefault(require("../../../../domain/product/entity/product"));
const order_item_1 = require("../../../../domain/checkout/entity/order_item");
const order_1 = require("../../../../domain/checkout/entity/order");
const order_item_model_1 = __importDefault(require("./order-item.model"));
const order_model_1 = __importDefault(require("./order.model"));
const order_repository_1 = __importDefault(require("./order.repository"));
describe("Order repository test", () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([order_item_model_1.default, customer_model_1.default, procuct_model_1.default, order_model_1.default]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    it("should create a new order", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "name");
        const address = new address_1.default("street", 123, "campinas", "sp", "11111");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRespoitory = new product_repository_1.default();
        const product = new product_1.default("123", "Product 1", 10);
        await productRespoitory.create(product);
        const orderItem = new order_item_1.OrderItem("1", product.name, product.price, product.id, 2);
        const order = new order_1.Order("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        const orderModel = await order_model_1.default.findOne({
            where: { id: order.id },
            include: ["items"]
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    productId: product.id,
                    orderId: order.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    price: orderItem.price,
                }
            ]
        });
    });
    it("should update an order adding a new item", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "name");
        const address = new address_1.default("street", 123, "campinas", "sp", "11111");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRespoitory = new product_repository_1.default();
        const product = new product_1.default("123", "Product 1", 10);
        await productRespoitory.create(product);
        const orderItem = new order_item_1.OrderItem("1", product.name, product.price, product.id, 2);
        const order = new order_1.Order("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        // CRIAR UM NOVO PRODUTO
        const product1 = new product_1.default("124", "Product 2", 100);
        await productRespoitory.create(product1);
        // CRIAR NOVO ITEM
        const orderItem1 = new order_item_1.OrderItem("2", product1.name, product1.price, product1.id, 3);
        const orderAlterada = new order_1.Order("123", "123", [orderItem, orderItem1]);
        await orderRepository.update(orderAlterada);
        const orderModel = await order_model_1.default.findOne({
            where: { id: orderAlterada.id },
            include: ["items"]
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: orderAlterada.id,
            customerId: customer.id,
            total: orderAlterada.total(),
            items: [
                {
                    id: orderItem.id,
                    productId: product.id,
                    orderId: orderAlterada.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    price: orderItem.price,
                },
                {
                    id: orderItem1.id,
                    productId: product1.id,
                    orderId: orderAlterada.id,
                    quantity: orderItem1.quantity,
                    name: orderItem1.name,
                    price: orderItem1.price,
                }
            ]
        });
    });
    it("should update an order with another product in the same item", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "name");
        const address = new address_1.default("street", 123, "campinas", "sp", "11111");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRespoitory = new product_repository_1.default();
        const product = new product_1.default("123", "Product 1", 10);
        await productRespoitory.create(product);
        const orderItem = new order_item_1.OrderItem("1", product.name, product.price, product.id, 2);
        const order = new order_1.Order("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        // ALTERANDO O PRODUTO DA ORDER
        const product1 = new product_1.default("124", "Product 2", 100);
        await productRespoitory.create(product1);
        // O ITEM CRIADO TEM O MESMO CODIGO DO EXISTEM PARA ATUALIZAR
        const orderItem1 = new order_item_1.OrderItem("1", product1.name, product1.price, product1.id, 3);
        const orderAlterada = new order_1.Order("123", "123", [orderItem1]);
        await orderRepository.update(orderAlterada);
        const orderModel = await order_model_1.default.findOne({
            where: { id: orderAlterada.id },
            include: ["items"]
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: orderAlterada.id,
            customerId: customer.id,
            total: orderAlterada.total(),
            items: [
                {
                    id: orderItem1.id,
                    productId: product1.id,
                    orderId: orderAlterada.id,
                    quantity: orderItem1.quantity,
                    name: orderItem1.name,
                    price: orderItem1.price,
                }
            ]
        });
    });
    it("should throw an error when not found an order in update", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("111", "name");
        const address = new address_1.default("street", 123, "campinas", "sp", "11111");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRespoitory = new product_repository_1.default();
        const product = new product_1.default("111", "Product 1", 10);
        await productRespoitory.create(product);
        const orderItem = new order_item_1.OrderItem("9", product.name, product.price, product.id, 2);
        const order = new order_1.Order("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        expect(async () => {
            await orderRepository.update(order);
        }).rejects.toThrow("Order not found");
    });
    it("should retrieve order by ID after creation", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "name");
        const address = new address_1.default("street", 123, "campinas", "sp", "11111");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRespoitory = new product_repository_1.default();
        const product = new product_1.default("123", "Product 1", 10);
        await productRespoitory.create(product);
        const orderItem = new order_item_1.OrderItem("1", product.name, product.price, product.id, 2);
        const order = new order_1.Order("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        const orderFound = await orderRepository.find(order.id);
        expect(orderFound).not.toBeNull();
        expect(orderFound.id).toBe(order.id);
        expect(orderFound.customerId).toBe(order.customerId);
    });
    it("should throw an error when order is not found", async () => {
        const orderRepository = new order_repository_1.default();
        expect(async () => {
            await orderRepository.find("123");
        }).rejects.toThrow("Order not found");
    });
    it("should retrieve all orders after creation", async () => {
        const customerRepository = new customer_repository_1.default();
        const productRespoitory = new product_repository_1.default();
        const orderRepository = new order_repository_1.default();
        const customer1 = new customer_1.default("123", "name");
        const address1 = new address_1.default("street", 123, "campinas", "sp", "11111");
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);
        const product1 = new product_1.default("123", "Product 1", 10);
        await productRespoitory.create(product1);
        const orderItem1 = new order_item_1.OrderItem("1", product1.name, product1.price, product1.id, 2);
        const order1 = new order_1.Order("123", "123", [orderItem1]);
        await orderRepository.create(order1);
        const customer2 = new customer_1.default("124", "name 2");
        const address2 = new address_1.default("street", 124, "campinas", "sp", "11222");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);
        const product2 = new product_1.default("124", "Product 2", 20);
        await productRespoitory.create(product2);
        const orderItem2 = new order_item_1.OrderItem("2", product2.name, product2.price, product2.id, 2);
        const order2 = new order_1.Order("124", "124", [orderItem2]);
        await orderRepository.create(order2);
        const createdOrders = [order1, order2];
        const foundOrders = await orderRepository.findAll();
        expect(createdOrders).toEqual(foundOrders);
    });
    it("should retrieve all orders after creation", async () => {
        const orderRepository = new order_repository_1.default();
        const foundOrders = await orderRepository.findAll();
        expect(foundOrders).toBeNull;
    });
});
