import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { BookingParticipant } from '../../booking-participants/entities/booking-participants.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Room, (room) => room.bookings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  room: Room;

  @OneToMany(() => BookingParticipant, (bp) => bp.booking, { cascade: true })
  participants: BookingParticipant[];
}
