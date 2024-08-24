import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    username!: string;

    @Column
    password!: string;
}
