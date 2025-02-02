import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { PermissionEnum } from '../types';

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
        type: DataTypes.ENUM(...Object.values(PermissionEnum)),
        allowNull: false,
        // unique: true,
    })
    name!: PermissionEnum;
}
