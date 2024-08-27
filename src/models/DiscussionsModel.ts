import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Courses from './CourseModel';
import User from './UserModel';

@Table({
    paranoid: true,
    timestamps: true
})
export default class Discussions extends Model<Discussions> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Courses)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    courseID!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    userID!: number;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false
    })
    message!: string;

    @Column({
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    })
    postedAt!: Date;
}
