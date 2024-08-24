import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';
import User from '../models/user.model';

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
        console.log('UserRepository initialized:', this.userRepository);
    }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }
}
