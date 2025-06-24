import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsDate()
  startTime: Date;
  @IsDate()
  endTime: Date;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNumber()
  roomId: number;
  @IsNumber()
  ownerId: number;
}
