export default StoreCatalogFacadeFactory {
    static create(){
        const storeCatalogRepository = new StoreCatalogRepository();
        const findProductUseCase = new FindProductUseCase(storeCatalogRepository);
        const findAllProductsUseCase = new FindAllProductsUseCase(storeCatalogRepository);
        const storeCatalogFacade = new StoreCatalogFacade({
            findUseCase: findProductUseCase,
            findAllUseCase: findAllProductsUseCase,
        });
        return storeCatalogFacade;
    }
}