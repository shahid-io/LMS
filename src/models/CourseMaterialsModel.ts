import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Modules from './ModuleModel';

export enum FileType {
    PDF = 'PDF',
    VIDEO = 'Video'
}

@Table({
    paranoid: true,
    timestamps: true
})
export default class CourseMaterials extends Model<CourseMaterials> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Modules)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    moduleID!: number;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataTypes.ENUM(...Object.values(FileType)),
        allowNull: false
    })
    fileType!: FileType;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: false
    })
    url!: string;
}
