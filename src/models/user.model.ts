import { Table, Column, Model, PrimaryKey, AutoIncrement, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { serverConfig } from '../config'
import { DataTypes } from 'sequelize';
@Table({ paranoid: true, timestamps: true })
export default class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: true,
    })
    email!: string;

    @Column({
        type: DataTypes.STRING(100),
        allowNull: true,
    })
    password!: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    })
    status!: number;

    // @BeforeCreate
    // public static async hash(instance: User) {
    //     instance.password = await bcrypt.hash(instance.password, serverConfig.SALT);
    // }

    // @BeforeUpdate
    // static async updatePassword(instance: User) {
    //     if (instance.changed('password')) {
    //         instance.password = await bcrypt.hash(instance.password, serverConfig.SALT);
    //     }
    // }

}
