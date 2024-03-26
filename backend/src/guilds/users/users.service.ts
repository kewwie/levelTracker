/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { dataSource } from '../../data/datasource';
import { Member } from '../../data/entities/Member';

@Injectable()
export class UsersService {
    async getUser(guildId: string, userId: string) {
        let membersDb = await dataSource.getRepository(Member);
        let existingMember = await membersDb.findOne({ where: { guildId, userId } });
        
        if (existingMember) {
            return existingMember;
        } else {
            return { message: "User not found" };
        }
    }
}
