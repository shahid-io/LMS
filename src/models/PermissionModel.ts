import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
    paranoid: true,
    timestamps: true
})
export default class Permission extends Model<Permission> {
    @PrimaryKey
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataTypes.STRING(100),
        allowNull: false
    })
    name!: string;
}
