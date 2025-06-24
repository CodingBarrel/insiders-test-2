import { Injectable } from '@nestjs/common';
import { Auth, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(`Validating user with email: ${email} password: ${password}`);
    const user: User | null = await this.usersService.findByEmail(email);

    if (user && password === user?.password) {
      console.log(`Validated ${JSON.stringify(user)}`);
      return user;
    }
    console.log(`Invalid email: ${email} / password: ${password}`);
    return null;
  }

  login(user: any) {
    console.log(`Sending login payload [${user.email} ${user.role}]`);
    const payload = {
      email: user.email,
      role: user.role,
    };

    return payload;
  }

  async register(userData: any): Promise<User> {
    console.log(`Registering user ${JSON.stringify(userData)}`);
    return this.usersService.create(userData);
  }
}
