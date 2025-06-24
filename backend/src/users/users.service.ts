import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
    console.log(`Finding user with id ${id}...`);
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with  id ${id} not found!`);
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    console.log(`Finding user with email ${email}...`);
    const user = await this.usersRepo.findOneBy({ email });
    if (!user)
      throw new NotFoundException(`User with  email ${email} not found!`);
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    console.log(`Creating user ${dto.email}`);
    const user = this.usersRepo.create({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });
    console.log(`Created user ${JSON.stringify(user)}`);
    return await this.usersRepo.save(user);
  }
}
