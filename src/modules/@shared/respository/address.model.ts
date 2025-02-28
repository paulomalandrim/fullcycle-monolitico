import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "address", timestamps: false })
export default class AddressModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

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
    
}