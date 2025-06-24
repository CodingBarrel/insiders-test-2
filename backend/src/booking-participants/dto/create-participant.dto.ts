import { IsEnum, IsNumber } from 'class-validator';
import { BookingParticipantsRole } from '../entities/booking-participants-role.enum';

export class CreateParticipantDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  bookingId: number;

  @IsEnum(BookingParticipantsRole)
  role: BookingParticipantsRole;
}
