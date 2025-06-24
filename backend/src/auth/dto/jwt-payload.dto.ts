import { IsEmail, IsNumber } from 'class-validator';

export class JwtPayloadDto {
  @IsNumber()
  userId: number;
  @IsEmail()
  email: string;
}
