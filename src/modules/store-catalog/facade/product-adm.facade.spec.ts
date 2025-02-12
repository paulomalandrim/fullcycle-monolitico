import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";

describe("StoreCatalogFacade test", () => {

    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
    
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            description: 'Product 1 description',
            salesPrice: 10,
        });

        
    });

    it("should check stock", async () => {

        const productFacade = ProductAdmFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "product",
            description: "description",
            purchasePrice: 10,
            stock: 10
        };

        await productFacade.addProduct(input);

        const checkStock = await productFacade.checkStock({id: input.id});

        expect(checkStock.id).toBe(input.id);
        expect(checkStock.stock).toBe(input.stock);

    });
})