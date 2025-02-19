import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {

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
        
        const clientProps = {
            id: new Id("1"),
            name: 'Test',
            email: 'aaa@email.com',
            address: 'Rua 1',
            createdAtA: new Date(),
            updatedAt: new Date(),
        };

        const client = new Client(clientProps);

        const clientRepository = new ClientRepository();
        await clientRepository.add(client);

        const clientDb = await ClientModel.findOne({where: {id: clientProps.id.id}})

        expect(clientDb).not.toBeNull();
        expect(clientProps.id.id).toBe(clientDb.id);
        expect(clientProps.name).toEqual(clientDb.name);
        expect(clientProps.email).toEqual(clientDb.email);
        expect(clientProps.address).toEqual(clientDb.address);
        expect(clientDb.createdAt).toEqual(clientDb.createdAt);
        expect(clientDb.updatedAt).toEqual(clientDb.updatedAt);
        
    });

    it("should find a client", async () => {
        
        const clientRepository = new ClientRepository();
       
        const clientProps = {
            id: new Id("1"),
            name: 'Test',
            email: 'aaa@email.com',
            address: 'Rua 1',
        };

        ClientModel.create({
            id: clientProps.id.id,
            name: clientProps.name,
            email: clientProps.email,
            address: clientProps.address,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const clientDb = await clientRepository.find(clientProps.id.id);

        expect(clientDb).toBeDefined();
        expect(clientProps.id.id).toBe(clientDb.id.id);
        expect(clientProps.name).toEqual(clientDb.name);
        expect(clientProps.email).toEqual(clientDb.email);
        expect(clientProps.address).toEqual(clientDb.address);
        expect(clientDb.createdAt).toEqual(clientDb.createdAt);
        expect(clientDb.updatedAt).toEqual(clientDb.updatedAt);

    });
})