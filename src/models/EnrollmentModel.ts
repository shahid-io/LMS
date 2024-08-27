import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Course from './CourseModel';
import User from './UserModel';

@Table({
    paranoid: true,
    timestamps: true
})
export default class Enrollment extends Model<Enrollment> {
    @PrimaryKey
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true
    })
    id!: number;

    @ForeignKey(() => Course)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    courseID!: number;

    @BelongsTo(() => Course)
    course!: Course;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    userID!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column({
        type: DataTypes.DATE,
        allowNull: false
    })
    enrollmentDate!: Date;

    @Column({
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    })
    progress!: number;

    @Column({
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'enrolled' // Other examples: 'completed', 'in progress', 'dropped'
    })
    status!: string;
}


