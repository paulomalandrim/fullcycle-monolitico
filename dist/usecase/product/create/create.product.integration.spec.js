"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const procuct_model_1 = __importDefault(require("../../../infrastructure/produtct/repository/sequelize/procuct.model"));
const product_repository_1 = __importDefault(require("../../../infrastructure/produtct/repository/sequelize/product.repository"));
const create_product_usecase_1 = __importDefault(require("./create.product.usecase"));
const find_product_usecase_1 = __importDefault(require("../find/find.product.usecase"));
describe("Test create product use case", () => {
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
    it("should create a product", async () => {
        const productRepository = new product_repository_1.default();
        const usecase = new create_product_usecase_1.default(productRepository);
        const newProduct = {
            name: "product",
            price: 100,
        };
        const productCreated = await usecase.execute(newProduct);
        const findUsecase = new find_product_usecase_1.default(productRepository);
        const productFound = await findUsecase.execute({ id: productCreated.id });
        expect(productCreated).toEqual(productFound);
    });
});
