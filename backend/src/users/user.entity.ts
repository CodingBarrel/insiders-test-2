import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookingParticipant } from '../booking-participants/entities/booking-participants.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BookingParticipant, (bp) => bp.user)
  bookingParticipants: BookingParticipant[];
}
