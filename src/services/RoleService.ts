
import { RoleRepository } from '../repositories/RoleRepository';
import Role from '../models/RoleModel';
import { WhereOptions } from 'sequelize';

export class RoleService {

    private roleRepository: RoleRepository;

    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async create(role: Role): Promise<Role> {
        return await this.roleRepository.create(role);
    }

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.findAll();
    }

    async findById(id: number | string): Promise<Role | null> {
        return await this.roleRepository.findById(parseInt(id.toString()));
    }

    async findOne(where?: WhereOptions<Role>): Promise<Role | null> {
        return await this.roleRepository.findOne(where)
    }

    async delete(id: number): Promise<void> {
        return await this.roleRepository.delete(id);
    }

    /**
    * Updates a Role based on the provided ID and payload.
    * 
    * @param id The ID of the Role to update.
    * @param payload The update data for the Role.
    * @returns A tuple containing the count of updated records and an array of the updated records.
    */
    async update(id: number, payload: Partial<Role>): Promise<Role[]> {
        const [count, updates] = await Role.update(payload, {
            where: { id },
            returning: true
        });
        if (count === 0) {
            throw new Error('Role not found');
        }
        return updates;
    }
}