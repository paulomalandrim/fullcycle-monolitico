import e from "express";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";

const mockDate = new Date(2022, 1, 1);

describe('PlaceOrderUsecase unit test', () => {
    
    describe('ValidateProducts method', () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUseCase();
        
        it("should throw error if no products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: '0',
                products: []
            };

            await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
                new Error('No products selected')
            );
            
        });

        it("should throw an error when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({productId}:{productId: string}) => {
                    return Promise.resolve({
                            productId: productId,
                            stock: 0,
                    })                       
                }),
            };

            //@ts-expect-error - force set productFacade
            placeOrderUsecase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{productId: "1"}]
            };

            await expect (placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not avaliable in stock")
            );

            input = {
                clientId: "0",
                products: [{productId: "1"}, {productId: "2"}]
            };

            await expect (placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not avaliable in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2);


            input = {
                clientId: "0",
                products: [{productId: "1"}, {productId: "2"}, {productId: "3"}]
            };

            await expect (placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not avaliable in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);           

        });
    });

    describe('getProducts method', () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);

        });

        afterAll(() => {
            jest.useRealTimers();
        });
            
        //@ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUseCase();

        it("should throw an error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockReturnValue(null),
            };
            
            //@ts-expect-error - force set catalogFacade
            placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow(
                new Error('Product not found')
            )
        });

        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockReturnValue({
                    id: "0",
                    name: "Product 1",
                    description: "Product 1 description",
                    salesPrice: 100
                }),
            };
            
            //@ts-expect-error - force set catalogFacade
            placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUsecase["getProduct"]("0")).resolves.toEqual(
                new Product({
                    id: new Id("0"),
                    name: "Product 1",
                    description: "Product 1 description",
                    salesPrice: 100,
                })
            );

            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
        });

    });
    
    describe('execute method', () => {
        it("should throw an error if the client doesn't exist", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            };

            //@ts-expect-error - no params in constructor
            const placeOrderUsecase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUsecase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: '123',
                products: []
            };

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
                new Error('Client not found')
            );
             
        });

        it ("should throw an error when products are not valid", async () => {
            
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            };
            
            //@ts-expect-error - no params in constructor
            const placeOrderUsecase = new PlaceOrderUseCase();
            
            const mockValidadeProducts = jest 
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUsecase, "validateProducts")
            //@ts-expect-error - not return ever 
            .mockRejectedValue(new Error("No products selected"));
            
            //@ts-expect-error - force set productFacade
            placeOrderUsecase["_clientFacade"] = mockClientFacade;
            
            const input: PlaceOrderInputDto = {
                clientId: '123',
                products: []
            };

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
                new Error('No products selected')
            );

            expect(mockValidadeProducts).toHaveBeenCalledTimes(1);
            
        });
    });
});