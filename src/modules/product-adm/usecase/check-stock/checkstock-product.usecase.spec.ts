import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockProductUseCase from "./checkstock-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "product",
    description: "description",
    purchasePrice: 10,
    stock: 10
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
}

describe("CheckStock Product usecase unit test", () => {
    it("should check stock of a product", async () => {
        const productRepository = MockRepository();
        const usecase = new CheckStockProductUseCase(productRepository);
         
        await productRepository.add(product);        

        const result = await usecase.execute({ id: product.id.id });

        expect(productRepository.find).toHaveBeenCalled();
        expect(result).not.toBeNull();
        expect(result.id).toBeDefined();
        expect(result.stock).toBe(product.stock);
    });
})