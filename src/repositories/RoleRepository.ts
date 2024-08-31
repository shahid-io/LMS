import Role from '../models/RoleModel';
import { IRepository } from './IRepository';
import { WhereOptions } from 'sequelize';

export class RoleRepository implements IRepository<Role> {
    async findAll(): Promise<Role[]> {
        return await Role.findAll();
    }

    async findById(id: number): Promise<Role | null> {
        return await Role.findByPk(id);
    }
    async findOne(where?: WhereOptions<Role>): Promise<Role | null> {
        return await Role.findOne({ where });
    }

    async create(payload: Role): Promise<Role> {
        return await Role.create(payload);
    }

    async update(id: number, payload: Role): Promise<Role> {
        const foundRole = await Role.findByPk(id);
        if (foundRole) {
            return await foundRole.update(payload);
        }
        throw new Error('Role not found');
    }

    async delete(id: number): Promise<void> {
        const response = await Role.findByPk(id);
        if (response) {
            await response.destroy();
        } else {
            throw new Error('Role not found');
        }
    }
}