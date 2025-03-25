import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find : jest.fn(),
    };
}

describe('Add Client Usecase unit test', () => {
    it('should add a client', async () => {
        const repository = MockRepository();
        const usecase = new AddClientUsecase(repository);

        const input = {
            name: 'John Doe',
            email: 'aaa@gmail.com',
            address: new Address(new Id("1"),'Rua 1', '123', 'Casa', 'São Paulo', 'SP', '12345678'),
        }
        
        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
        
    });
});