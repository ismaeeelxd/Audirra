import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository){}
    
    async getProfile(id : number) : Promise<String | null>{
        return (await this.userRepository.findById(id)).name;
    }



}
