import { forwardRef, Module } from '@nestjs/common';
import { BookingParticipantsService } from './booking-participants.service';
import { BookingParticipantsController } from './booking-participants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { BookingParticipant } from './booking-participants.entity';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingParticipant]),
    UsersModule,
    BookingParticipantsModule,
    forwardRef(() => BookingsModule),
  ],
  providers: [BookingParticipantsService],
  controllers: [BookingParticipantsController],
  exports: [BookingParticipantsService],
})
export class BookingParticipantsModule {}
