import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "client", timestamps: false })
export default class ClientModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare email: string;

    @Column
    declare address: string;

    @Column
    declare createdAt: Date;

    @Column
    declare updatedAt: Date;

}