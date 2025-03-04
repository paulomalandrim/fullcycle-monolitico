import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: 'Product 1',
    description: 'Product 1 description',
    salesPrice: 10,
});

const MockProductRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe('FindAProductUsecase', () => {

    it('should find a product', async () => {
        const productRepository = MockProductRepository();

        const findProductUseCase = new FindProductUseCase(productRepository);
        
        const product = await findProductUseCase.execute({id: '1'});
        
        expect(productRepository.find).toHaveBeenCalled();
        expect(product.id).toBe('1');
        expect(product.name).toBe('Product 1');
        expect(product.description).toBe('Product 1 description');
        expect(product.salesPrice).toBe(10);
    });

});