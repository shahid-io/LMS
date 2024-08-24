import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ paranoid: true, timestamps: true })
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id!: number;

    @Column(DataType.STRING)
    firstName!: string;

    @Column(DataType.STRING)
    lastName!: string;

    @Column(DataType.STRING)
    email!: string;
}
