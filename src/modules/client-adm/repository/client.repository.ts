import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import AddressModel from "../../@shared/respository/address.model";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";

type propsAddress = {
    id?: Id;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {

        const addressCreated = await AddressModel.create({
            id: client.address.id.id,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipCode: client.address.zipCode,
        });            

        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            addressId: addressCreated.id,
            address: addressCreated,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }

    async find(id: string): Promise<Client> {
        const foundClient = await ClientModel.findOne({where: {id: id}})

        if (!foundClient) {
            throw new Error('Client not found');
        }

        const foundAddress = await AddressModel.findOne({where: {id: foundClient.addressId}});
        const clientAddress = new Address(
            new Id(foundAddress.id),
            foundAddress.street,
            foundAddress.number,
            foundAddress.complement,
            foundAddress.city,
            foundAddress.state,
            foundAddress.zipCode,
        );
       
        return new Client({
            id: new Id(foundClient.id),
            name: foundClient.name,
            email: foundClient.email,
            address: clientAddress,
            createdAt: foundClient.createdAt,
            updatedAt: foundClient.updatedAt,
        });
    }
}