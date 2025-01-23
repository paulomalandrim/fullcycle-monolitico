"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const procuct_model_1 = __importDefault(require("../../../infrastructure/produtct/repository/sequelize/procuct.model"));
const product_repository_1 = __importDefault(require("../../../infrastructure/produtct/repository/sequelize/product.repository"));
const find_product_usecase_1 = __importDefault(require("./find.product.usecase"));
const product_1 = __importDefault(require("../../../domain/product/entity/product"));
describe("Test find product use case", () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([procuct_model_1.default]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    it("should find a product", async () => {
        const productRepository = new product_repository_1.default();
        const usecase = new find_product_usecase_1.default(productRepository);
        const product = new product_1.default("123", "product", 100);
        await productRepository.create(product);
        const input = {
            id: "123",
        };
        const output = {
            id: "123",
            name: "product",
            price: 100,
        };
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
});
