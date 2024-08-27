import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Role from './RoleModel';
import Permission from './PermissionModel';
import { DataTypes } from 'sequelize';

@Table({
    paranoid: true,
    timestamps: true
})
export default class RolePermissions extends Model<RolePermissions> {
    @ForeignKey(() => Role)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    roleID!: number;

    @ForeignKey(() => Permission)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    permissionID!: number;
}
