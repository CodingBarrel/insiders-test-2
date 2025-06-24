import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    console.log(`Finding user ${email}...`);
    const res = this.usersRepo.findOne({ where: { email } });
    console.log(`is user ${email} exists: `, res !== null);
    return res;
  }

  create(userData: Partial<User>): Promise<User> {
    console.log(`Creating user ${JSON.stringify(userData)}`);
    const user = this.usersRepo.create(userData);
    console.log(`Created user ${JSON.stringify(user)}`);
    return this.usersRepo.save(user);
  }
}
