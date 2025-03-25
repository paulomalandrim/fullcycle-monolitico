import { BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import AddressModel from "../../@shared/respository/address.model";

@Table({ tableName: "client", timestamps: false })
export default class ClientModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare email: string;

    @ForeignKey(() => AddressModel)
    @Column({ allowNull: false })
    declare addressId: string;

    @BelongsTo(() => AddressModel)
    declare address: AddressModel;    

    @Column
    declare createdAt: Date;

    @Column
    declare updatedAt: Date;

}