import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";

@Table({ tableName: "invoice", timestamps: false })
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare document: string;

    @Column
    declare street: string;

    @Column
    declare number: string;

    @Column
    declare complement: string;

    @Column
    declare city: string;

    @Column
    declare state: string;

    @Column
    declare zipCode: string;
    
    @HasMany(() => InvoiceItemModel)
    declare items: InvoiceItemModel[];

    @Column
    declare createdAt: Date;

    @Column
    declare updatedAt: Date;

}