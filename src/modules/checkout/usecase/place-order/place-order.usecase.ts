import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface{
    
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;

    constructor(
        clientFacade: ClientAdmFacadeInterface,
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogFacadeInterface
    ) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        
        // buscar o client
        const client = await this._clientFacade.find({id: input.clientId});

        if (!client) {
            throw new Error("Client not found");
        }

        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map((product) => this.getProduct(product.productId))
        );

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
        })

        const order = new Order({
            client: myClient,
            products,
        })

        
        
        // caso pagamento seja aprovado -> gerar o invoice

        // mudar o status da minha order para approved

        // retornar o dto

        return {
            id: '',
            invoiceId: '',
            status: '',
            total: 0,
            products: [],
        }

    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.find({id: productId});

        if (!product) {
            throw new Error("Product not found");
        }

        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        };

        return new Product(productProps);
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void>{
        if(input.products.length == 0 ){
            throw new Error("No products selected");
        }

        for(const p of input.products) {
            const product = await this._productFacade.checkStock({id: p.productId});
            console.log("Product " + p.productId + " stock: " + product.stock);
            
            if (product.stock <= 0) {
                throw new Error(`Product ${p.productId} is not avaliable in stock`);
            }
        }
    }
}