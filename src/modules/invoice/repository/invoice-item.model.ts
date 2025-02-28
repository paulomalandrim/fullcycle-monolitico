import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import { NonAttribute } from "sequelize";


@Table({ tableName: "invoice_item", timestamps: false })
export default class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare price: number;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    invoiceId: string;
  
    @BelongsTo(() => InvoiceModel)
    invoice?: NonAttribute<InvoiceModel>;

}