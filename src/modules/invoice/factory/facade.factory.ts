import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";


export default class InvoiceFacadeFactory{
    static create(){
        const invoiceRepository = new InvoiceRepository();
        const findInvoiceUseCase = new FindInvoiceUsecase(invoiceRepository);
        const generateInvoiceUseCase = new GenerateInvoiceUsecase(invoiceRepository);
        const invoiceFacade = new InvoiceFacade({
            findUseCase: findInvoiceUseCase,
            addUseCase: generateInvoiceUseCase,
        });
        return invoiceFacade;
    }
}