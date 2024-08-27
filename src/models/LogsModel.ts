import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './UserModel';

@Table({
    paranoid: true,
    timestamps: true
})
export default class Logs extends Model<Logs> {
    @PrimaryKey
    @AutoIncrement
    @Column
    logID!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    userID!: number;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: false
    })
    actionType!: string;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false
    })
    details!: string;

    @Column({
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    })
    timestamp!: Date;
}
