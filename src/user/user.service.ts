import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository){}
    
    async getProfile(id : number) : Promise<String | null>{
        return (await this.userRepository.findById(id)).name;
    }

    async updateProfile(id : number, name?: string, email?: string): Promise<void> {
        const update = {};
        if (name) {
            update['name'] = name;
        }
        if (email) {
            update['email'] = email;
        }
        await this.userRepository.update(id, update);
    }



}
