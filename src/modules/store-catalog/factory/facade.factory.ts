import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductUsecase from "../usecase/find-all-product/find-all-product.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);
        const findAllProductsUseCase = new FindAllProductUsecase(productRepository);
        const storeCatalogFacade = new StoreCatalogFacade({
            findUseCase: findProductUseCase,
            findAllUseCase: findAllProductsUseCase,
        });
        return storeCatalogFacade;
    }
}