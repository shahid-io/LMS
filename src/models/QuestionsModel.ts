import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Assessments from './AssessmentsModel';
export enum QuestionType {

    MCQ = 'MCQ',
    TRUE_FALSE = 'True/False'
}

@Table({
    paranoid: true,
    timestamps: true
})
export default class Questions extends Model<Questions> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Assessments)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    assessmentID!: number;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false
    })
    text!: string;

    @Column({
        type: DataTypes.ENUM(...Object.values(QuestionType)),
        allowNull: false
    })
    questionType!: QuestionType;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    points!: number;
}
