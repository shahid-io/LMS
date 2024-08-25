import { Model } from 'sequelize-typescript';

export interface IRepository<T extends Model> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(id: number, entity: T): Promise<T>;
    delete(id: number): Promise<void>;
}


