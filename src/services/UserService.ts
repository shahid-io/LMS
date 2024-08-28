import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';
import User from '../models/UserModel';

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findById(id: number | string): Promise<User | null> {
        return await this.userRepository.findById(parseInt(id.toString()));
    }

    async findOne(email: string): Promise<User | null> {
        return await this.userRepository.findOne(email)
    }

    /**
     * Updates a user based on the provided ID and update data.
     * 
     * @param id The ID of the user to update.
     * @param updateData The update data for the user.
     * @returns A tuple containing the count of updated records and an array of the updated records.
     */
    async update(id: number, updateData: Partial<User>): Promise<User[]> {
        const [updateCount, updatedUsers] = await User.update(updateData, {
            where: { id },
            returning: true
        });
        if (updateCount === 0) {
            throw new Error('User not found');
        }
        return updatedUsers;
    }
    async delete(id: number): Promise<void> {
        return await this.userRepository.delete(id);
    }
}
