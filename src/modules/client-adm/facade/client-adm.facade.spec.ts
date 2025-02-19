import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/facade.factory";

describe("ClientAdmFacade test", () => {

    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
    
        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {

        const clientFacade = ClientAdmFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "Test",
            email: "aaa@email.com",
            address: "Rua 1",
        };

        await clientFacade.add(input);

        const client = await ClientModel.findOne({where: {id: input.id}});
        expect(client).not.toBeNull();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
        
    });

    it("should find a client", async () => {

        const clientFacade = ClientAdmFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "Test",
            email: "a@gmail.com",
            address: "Rua 1",

        };

        await clientFacade.add(input);

        const clientFound = await clientFacade.find({id: input.id});

        expect(clientFound.id).toBe(input.id);
        expect(clientFound.name).toBe(input.name);
        expect(clientFound.email).toBe(input.email);
        expect(clientFound.address).toBe(input.address);

    });
})