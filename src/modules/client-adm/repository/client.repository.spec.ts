import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";
import Address from "../../@shared/domain/value-object/address.value-object";
import AddressModel from "../../@shared/respository/address.model";

describe("ClientRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel, AddressModel]);
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
            address: new Address(new Id("1"), "Rua 1", "123", "Casa", "São Paulo", "SP", "12345678"),
            createdAtA: new Date(),
            updatedAt: new Date(),
        };

        const client = new Client(clientProps);

        const clientRepository = new ClientRepository();
        await clientRepository.add(client);

        const clientDb = await ClientModel.findOne({where: {id: clientProps.id.id}})
        const clientAddressDb = await AddressModel.findOne({where: {id: clientDb.addressId}});

        expect(clientDb).not.toBeNull();
        expect(clientProps.id.id).toBe(clientDb.id);
        expect(clientProps.name).toEqual(clientDb.name);
        expect(clientProps.email).toEqual(clientDb.email);
        expect(clientProps.address.city).toEqual(clientAddressDb.city);
        expect(clientProps.address.state).toEqual(clientAddressDb.state);
        expect(clientProps.address.street).toEqual(clientAddressDb.street);
        expect(clientProps.address.number).toEqual(clientAddressDb.number);
        expect(clientProps.address.complement).toEqual(clientAddressDb.complement);
        expect(clientProps.address.zipCode).toEqual(clientAddressDb.zipCode);
        expect(clientDb.createdAt).toEqual(clientDb.createdAt);
        expect(clientDb.updatedAt).toEqual(clientDb.updatedAt);
        
    });

    it("should find a client", async () => {
        
        const clientRepository = new ClientRepository();
       
        const clientProps = {
            id: new Id("1"),
            name: 'Test',
            email: 'aaa@email.com',
            address: new Address(new Id("1"), "Rua 1", "123", "Casa", "São Paulo", "SP", "12345678"),
        };

        await AddressModel.create({
            id: clientProps.address.id.id,
            city: clientProps.address.city,
            state: clientProps.address.state,
            street: clientProps.address.street,
            number: clientProps.address.number,
            complement: clientProps.address.complement,
            zipCode: clientProps.address.zipCode
        });

        await ClientModel.create({
            id: clientProps.id.id,
            name: clientProps.name,
            email: clientProps.email,
            addressId: clientProps.address.id.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const clientDb = await clientRepository.find(clientProps.id.id);

        expect(clientDb).toBeDefined();
        expect(clientProps.id.id).toBe(clientDb.id.id);
        expect(clientProps.name).toEqual(clientDb.name);
        expect(clientProps.email).toEqual(clientDb.email);
        expect(clientProps.address.street).toEqual(clientDb.address.street);
        expect(clientProps.address.number).toEqual(clientDb.address.number);
        expect(clientProps.address.complement).toEqual(clientDb.address.complement);
        expect(clientProps.address.city).toEqual(clientDb.address.city);
        expect(clientProps.address.state).toEqual(clientDb.address.state);
        expect(clientProps.address.zipCode).toEqual(clientDb.address.zipCode);
        
    });
})