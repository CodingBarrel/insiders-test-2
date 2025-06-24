import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from '../bookings/entities/booking.entity';
import { User } from '../users/user.entity';
import { BookingParticipantsRole } from './booking-participants-role.enum';

@Entity()
export class BookingParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booking, (booking) => booking.participants, {
    onDelete: 'CASCADE',
  })
  booking: Booking;

  @ManyToOne(() => User, (user) => user.bookingParticipants, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'enum', enum: BookingParticipantsRole })
  role: BookingParticipantsRole;
}
