"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../../../domain/checkout/entity/order");
const order_item_1 = require("../../../../domain/checkout/entity/order_item");
const order_item_model_1 = __importDefault(require("./order-item.model"));
const order_model_1 = __importDefault(require("./order.model"));
class OrderRepository {
    async create(entity) {
        await order_model_1.default.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity
            })),
        }, {
            include: [{ model: order_item_model_1.default }]
        });
    }
    async update(entity) {
        let orderModel;
        try {
            orderModel = await order_model_1.default.findOne({ where: { id: entity.id },
                rejectOnEmpty: true,
                include: ["items"] });
        }
        catch (error) {
            throw new Error("Order not found");
        }
        entity.items.forEach(async (item) => {
            await order_item_model_1.default.upsert({
                id: item.id,
                productId: item.productId,
                orderId: entity.id,
                quantity: item.quantity,
                name: item.name,
                price: item.price
            });
        });
        await order_model_1.default.update({
            name: entity.id,
            customerId: entity.customerId,
            total: entity.total()
        }, {
            where: {
                id: entity.id
            },
        });
    }
    async find(id) {
        let orderModel;
        try {
            orderModel = await order_model_1.default.findOne({ where: { id },
                rejectOnEmpty: true,
                include: ["items"] });
        }
        catch (error) {
            throw new Error("Order not found");
        }
        const order = new order_1.Order(orderModel.id, orderModel.customerId, orderModel.items.map((item) => {
            return new order_item_1.OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
        }));
        return order;
    }
    async findAll() {
        const ordersModel = await order_model_1.default.findAll({ include: ["items"] });
        return ordersModel.map((orderModel) => {
            return new order_1.Order(orderModel.id, orderModel.customerId, orderModel.items.map((orderItemModel) => {
                return new order_item_1.OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.price, orderItemModel.productId, orderItemModel.quantity);
            }));
        });
    }
}
exports.default = OrderRepository;
