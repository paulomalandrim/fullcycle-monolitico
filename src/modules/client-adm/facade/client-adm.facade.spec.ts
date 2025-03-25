import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import Address from "../../@shared/domain/value-object/address.value-object";
import AddressModel from "../../@shared/respository/address.model";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("ClientAdmFacade test", () => {

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

        const clientFacade = ClientAdmFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "Test",
            email: "aaa@email.com",
            address: new Address(new Id("1"), "Rua 1", "123", "Casa", "São Paulo", "SP", "12345678"), // value object
            
        };

        await clientFacade.add(input);

        const client = await ClientModel.findOne({where: {id: input.id}});
        const clientAddress = await AddressModel.findOne({where: {id: client.addressId}});
        expect(client).not.toBeNull();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(clientAddress.id).toBe(input.address.id.id);
        expect(clientAddress.city).toBe(input.address.city);
        expect(clientAddress.state).toBe(input.address.state);
        expect(clientAddress.street).toBe(input.address.street);
        expect(clientAddress.number).toBe(input.address.number);
        expect(clientAddress.complement).toBe(input.address.complement);
        expect(clientAddress.zipCode).toBe(input.address.zipCode);
        
    });

    it("should find a client", async () => {

        const clientFacade = ClientAdmFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "Test",
            email: "a@gmail.com",
            address: new Address(new Id(),"Rua 1", "123", "Casa", "São Paulo", "SP", "12345678"),
        };

        await clientFacade.add(input);

        const clientFound = await clientFacade.find({id: input.id});

        expect(clientFound.id).toBe(input.id);
        expect(clientFound.name).toBe(input.name);
        expect(clientFound.email).toBe(input.email);
        expect(clientFound.address.city).toBe(input.address.city);
        expect(clientFound.address.state).toBe(input.address.state);
        expect(clientFound.address.street).toBe(input.address.street);
        expect(clientFound.address.number).toBe(input.address.number);
        expect(clientFound.address.complement).toBe(input.address.complement);
        expect(clientFound.address.zipCode).toBe(input.address.zipCode);

    });
})