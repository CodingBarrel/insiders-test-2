import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    console.log(`Validating user with email: ${email} password: ${password}`);
    const user: User | null = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(`Validated ${JSON.stringify(user)}`);
      return user;
    }
    console.log(`Invalid email: ${email} / password: ${password}`);
    return null;
  }

  login(user: User) {
    console.log(`Sending login payload [${user.email}]`);
    const payload: PayloadDto = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    console.log(`Registering user ${JSON.stringify(createUserDto)}`);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }
}
