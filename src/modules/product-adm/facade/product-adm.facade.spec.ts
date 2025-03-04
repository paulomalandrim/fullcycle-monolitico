import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {


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

    it("should add a product", async () => {

        const productFacade = ProductAdmFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "product",
            description: "description",
            purchasePrice: 10,
            stock: 10
        };

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({where: {id: input.id}});
        expect(product).not.toBeNull();
        expect(product.id).toBe(input.id);
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
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