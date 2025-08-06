import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository){}
    
    async getProfile(id : number) : Promise<String | null>{
        return (await this.userRepository.findById(id)).name;
    }

    async updateProfile(id : number, name?: string, email?: string): Promise<User> {
        const update = {};
        if (name) {
            update['name'] = name;
        }
        if (email) {
            update['email'] = email;
        }
        return await this.userRepository.update(id, update);
    }



}
