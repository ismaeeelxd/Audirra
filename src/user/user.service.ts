import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'generated/prisma';
import { validateEmail } from 'src/common-utils/common-utils';

@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository){}
    
    async getProfile(id : string) : Promise<string | null>{
        const user = (await this.userRepository.findById(id))[0];
        return user.name;
    }

    async updateProfile(id : string, name?: string, email?: string): Promise<User> {
        const update = {};
        if (name) {
            update['name'] = name;
        }
        if (email) {
            if(!validateEmail(email)){
                throw new Error('Invalid email format');
            }
            update['email'] = email;
        }
        return await this.userRepository.update(id, update);
    }



}
