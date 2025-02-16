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
            address: '123 Main St',
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