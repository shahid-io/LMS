import User from '../models/UserModel';
import { IRepository } from './IRepository';

export class UserRepository implements IRepository<User> {
    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async findOne(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async create(user: User): Promise<User> {
        return await User.create(user);
    }

    async update(id: number, user: User): Promise<User> {
        const foundUser = await User.findByPk(id);
        if (foundUser) {
            return await foundUser.update(user);
        }
        throw new Error('User not found');
    }

    async delete(id: number): Promise<void> {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
        } else {
            throw new Error('User not found');
        }
    }
}
