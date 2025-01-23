"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_model_1 = __importDefault(require("../customer/repository/sequelize/customer.model"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
async function setupDb() {
    exports.sequelize = new sequelize_typescript_1.Sequelize({
        storage: ":memory:",
        dialect: 'mysql',
        logging: false,
    });
    await exports.sequelize.addModels([customer_model_1.default]);
    await exports.sequelize.sync();
}
setupDb();
