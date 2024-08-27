import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Questions from './QuestionsModel';
import User from './UserModel';

@Table({
    paranoid: true,
    timestamps: true
})
export default class Answers extends Model<Answers> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Questions)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    questionID!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    userID!: number;

    @Column({
        type: DataTypes.TEXT,
        allowNull: true
    })
    submissionText!: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: true
    })
    score!: number;
}
