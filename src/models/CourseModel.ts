import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './UserModel'; 
@Table({
    paranoid: true,
    timestamps: true
})
export default class Course extends Model<Course> {
    @PrimaryKey
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true
    })
    id!: number;

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

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    instructorID!: number;

    @BelongsTo(() => User)
    instructor!: User;

    @Column({
        type: DataTypes.DATE,
        allowNull: false
    })
    startDate!: Date;

    @Column({
        type: DataTypes.DATE,
        allowNull: false
    })
    endDate!: Date;
}
