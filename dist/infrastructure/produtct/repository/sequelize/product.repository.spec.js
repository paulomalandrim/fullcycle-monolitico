"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const procuct_model_1 = __importDefault(require("./procuct.model"));
const product_1 = __importDefault(require("../../../../domain/product/entity/product"));
const product_repository_1 = __importDefault(require("./product.repository"));
describe("Product repository test", () => {
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
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await procuct_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });
    });
    it("should update a product", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await procuct_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });
        product.changeName("Product 2");
        product.changePrice(200);
        await productRepository.update(product);
        const productModel2 = await procuct_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200,
        });
    });
    it("should find a product", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await procuct_model_1.default.findOne({ where: { id: "1" } });
        const productFound = await productRepository.find("1");
        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price,
        });
    });
    it("should find all products", async () => {
        const productRepository = new product_repository_1.default();
        const product1 = new product_1.default("1", "Product 1", 100);
        const product2 = new product_1.default("2", "Product 2", 200);
        const product3 = new product_1.default("3", "Product 3", 300);
        const products = [product1, product2, product3];
        await productRepository.create(product1);
        await productRepository.create(product2);
        await productRepository.create(product3);
        const allProducts = await productRepository.findAll();
        expect(allProducts.length).toBe(3);
        expect(products).toEqual(allProducts);
    });
});
