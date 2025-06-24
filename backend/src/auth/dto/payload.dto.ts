import { IsEmail, IsIn, IsNumber } from 'class-validator';

export class PayloadDto {
  @IsNumber()
  userId: number;
  @IsEmail()
  email: string;
  @IsIn(['Admin', 'User'])
  role: string;
}
