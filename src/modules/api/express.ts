import express, {Express} from 'express';
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from './routes/client.route';
import ProductModel from '../store-catalog/repository/product.model';
import ClientModel from '../client-adm/repository/client.model';
import InvoiceModel from '../invoice/repository/invoice.model';
import AddressModel from '../@shared/respository/address.model';

export const app: Express = express();

app.use(express.json());
//app.use("/products", productRoute);
app.use("/clients", clientRoute);
// app.use("/checkout", productRoute);
// app.use("/invoice/<id>", productRoute);


export let sequelize: Sequelize;

async function setupDb(){
    sequelize = new Sequelize({
        storage: ":memory:",
        dialect: 'sqlite',
        logging: false,
    });
    await sequelize.addModels([ClientModel, AddressModel]);
    await sequelize.sync();
    console.log("Database connected successfully.");
}

setupDb();