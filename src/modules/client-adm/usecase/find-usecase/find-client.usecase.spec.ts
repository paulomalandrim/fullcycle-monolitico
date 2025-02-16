import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Test",
    email: "aaa@gmail.com",
    address: "Rua 1",
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find : jest.fn().mockReturnValue(Promise.resolve(client)),
    };
}

describe('Find Client Usecase unit test', () => {
    it('should find a client', async () => {
        const repository = MockRepository();
        const usecase = new FindClientUsecase(repository);

        const input = {
            id: "1",
        }
        
        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result).toBeDefined();
        expect(result.id).toEqual(client.id.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
        
    });
});