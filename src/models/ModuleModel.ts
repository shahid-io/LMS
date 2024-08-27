import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Course from './CourseModel';

@Table({
    paranoid: true,
    timestamps: true
})
export default class Module extends Model<Module> {
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

    @Column({
        type: DataTypes.STRING(255),
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataTypes.TEXT,
        allowNull: true
    })
    description!: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    order!: number;
}
