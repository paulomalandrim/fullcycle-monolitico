import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<Invoice> {

        let invoiceItemsModel = [];
        for (let i = 0; i < invoice.items.length; i++) {
            const item = invoice.items[i];            
            invoiceItemsModel.push(new InvoiceItemModel({
                id: item.id.id,
                name: item.name,
                price: item.price,
            }));
        };
        
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoiceItemsModel,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        }, {
            include: [{model: InvoiceItemModel}]
        });

        const result = await InvoiceModel.findOne({
            where: {id: invoice.id.id},
            include: [{ model:InvoiceItemModel }]
        });

        const resultItems = [];

        for (let i = 0; i < result.items.length; i++) {
            const item = result.items[i];
            resultItems.push(new InvoiceItem({ id: new Id(item.id), name: item.name, price: item.price }));
        }

        const newInvoice = new Invoice({
            id: new Id(result.id),
            name: result.name,
            document: result.document,
            address: new Address(
                    result.street,
                    result.number,
                    result.complement,
                    result.city,
                    result.state,
                    result.zipCode,
            ),
            items: resultItems,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        });
        
        return newInvoice;

    }

    async find(id: string): Promise<Invoice> {
        const result = await InvoiceModel.findOne({
            where: {id: id}, 
            include: [{ model:InvoiceItemModel }]
        })

        if (!result) {
            throw new Error('Invoice not found');
        }

        const items = [];

        for (let i = 0; i < result.items.length; i++) {
            const item = result.items[i];
            items.push(new InvoiceItem({ name: item.name, price: item.price }));
        }
        
        return new Invoice({
            id: new Id(result.id),
            name: result.name,
            document: result.document,
            address: new Address(
                 result.street,
                 result.number,
                 result.complement,
                 result.city,
                 result.state,
                 result.zipCode,
            ),
            items: items,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        });
    }
}