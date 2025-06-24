import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    console.log(`Validating user with email: ${email} password: ${password}`);
    const user: User | null = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(`Validated ${JSON.stringify(user)}`);
      return user;
    }
    throw new UnauthorizedException(
      `Invalid email: ${email} / password: ${password}`,
    );
  }

  sign(user: User) {
    console.log(`Sending login payload [${user.email}]`);
    const payload: JwtPayloadDto = {
      userId: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    console.log(`Registering user ${JSON.stringify(createUserDto)}`);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });
  }
}
