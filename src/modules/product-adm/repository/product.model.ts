import { AllowNull, Column, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table({
    tableName: 'product',
    timestamps: false,
})

export default class ProductModel extends Model{
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;
    @Column({allowNull: false})
    declare name: string;
    @Column({allowNull: false})
    declare description: string;
    @Column({allowNull: false})
    declare purchasePrice: number;
    @Column({allowNull: false})
    declare stock: number;
    @Column({allowNull: false})
    declare createdAt: Date;
    @Column({allowNull: false})
    declare updatedAt: Date;
}