import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './UserModel';

export enum RoleEnum {
    INSTRUCTOR = 'instructor',
    STUDENT = 'student',
    ADMIN = 'admin',
}

@Table({ paranoid: true, timestamps: true })
export default class Role extends Model<Role> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column({
        type: DataType.ENUM(...Object.values(RoleEnum)),
        defaultValue: RoleEnum.STUDENT,
        allowNull: false,
    })
    role!: RoleEnum;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: true,
    })
    description!: string;

    @HasMany(() => User)
    users!: User[];
}
