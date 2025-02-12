import Id from "../../../@shared/domain/value-object/id.value-object";
import FindAllProductUsecase from "./find-all-product.usecase";

const product = {
    id: new Id("1"),
    name: 'Product 1',
    description: 'Product 1 description',
    salesPrice: 10,
};

const product2 = {
    id: new Id("2"),
    name: 'Product 2',
    description: 'Product 2 description',
    salesPrice: 20,
};

const MockProductRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
        find: jest.fn(),
    };
};

describe('FindAllProductUsecase', () => {

    it('should find all products', async () => {
        const productRepository = MockProductRepository();

        const findAllProductUsecase = new FindAllProductUsecase(productRepository);
        const products = await findAllProductUsecase.execute();
        expect(productRepository.findAll).toHaveBeenCalled();
        expect(products.length).toBe(2);
        expect(products[0].id).toBe('1');
        expect(products[0].name).toBe('Product 1');
        expect(products[0].description).toBe('Product 1 description');
        expect(products[0].salesPrice).toBe(10);
        expect(products[1].id).toBe('2');
        expect(products[1].name).toBe('Product 2');
        expect(products[1].description).toBe('Product 2 description');
        expect(products[1].salesPrice).toBe(20);
    });

});