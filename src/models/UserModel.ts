import { Table, Column, Model, PrimaryKey, AutoIncrement, BeforeCreate, BeforeUpdate, ForeignKey, BelongsTo } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import serverConfig from '../config/server.config'
import { DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Role from './RoleModel';
dotenv.config()
@Table({ paranoid: true, timestamps: true })
class User extends Model<User> {
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

    @ForeignKey(() => Role)
    @Column
    roleId!: number;

    @BelongsTo(() => Role)
    role!: Role;

    @BeforeCreate
    public static async hash(instance: User): Promise<void> {
        try {
            instance.password = await bcrypt.hash(instance.password, serverConfig.SALT);
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new Error('Error hashing password');
        }
    }

    @BeforeUpdate
    public static async updatePassword(instance: User): Promise<void> {
        if (instance.changed('password')) {
            instance.password = await bcrypt.hash(instance.password, serverConfig.SALT);
        }
    }

}


export default User;