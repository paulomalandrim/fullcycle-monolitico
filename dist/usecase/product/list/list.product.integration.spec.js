"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const procuct_model_1 = __importDefault(require("../../../infrastructure/produtct/repository/sequelize/procuct.model"));
const product_repository_1 = __importDefault(require("../../../infrastructure/produtct/repository/sequelize/product.repository"));
const create_product_usecase_1 = __importDefault(require("../create/create.product.usecase"));
const list_customer_usecase_1 = __importDefault(require("./list.customer.usecase"));
describe("Test update product use case", () => {
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
    it("should listing a product", async () => {
        const productRepository = new product_repository_1.default();
        const createUsecase = new create_product_usecase_1.default(productRepository);
        const product1 = {
            name: "product1",
            price: 100,
        };
        const product2 = {
            name: "product2",
            price: 200,
        };
        await createUsecase.execute(product1);
        await createUsecase.execute(product2);
        const listUsecase = new list_customer_usecase_1.default(productRepository);
        const result = await listUsecase.execute({});
        expect(result.products.length).toEqual(2);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);
    });
});
