import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingParticipant } from './entities/booking-participants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UsersService } from '../users/users.service';
import { BookingsService } from '../bookings/bookings.service';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class BookingParticipantsService {
  constructor(
    @InjectRepository(BookingParticipant)
    private bookingParticipantsRepo: Repository<BookingParticipant>,
    private usersService: UsersService,
    private bookingsService: BookingsService,
  ) {}

  async create(
    addParticipantDto: CreateParticipantDto,
  ): Promise<BookingParticipant> {
    const user = await this.usersService.findOneById(addParticipantDto.userId);

    const booking = await this.bookingsService.findOneById(
      addParticipantDto.bookingId,
    );

    const exists = await this.bookingParticipantsRepo.findOneBy({
      user: { id: user.id },
      booking: { id: booking.id },
    });
    if (exists) throw new BadRequestException('User already added to booking');

    const participant = this.bookingParticipantsRepo.create({
      user: user,
      booking: booking,
      role: addParticipantDto.role,
    });
    console.log(
      `Adding new participant [${user.id} to booking: ${booking.id} (role:  ${addParticipantDto.role})]`,
    );

    return this.bookingParticipantsRepo.save(participant);
  }

  async findAll(): Promise<BookingParticipant[]> {
    const participants = await this.bookingParticipantsRepo.find();

    console.log(`Fetched all ${participants.length} participants`);

    return participants;
  }

  async findByBookingId(id: number): Promise<BookingParticipant[]> {
    const participants = await this.bookingParticipantsRepo.findBy({
      booking: { id },
    });
    console.log(
      `Fetched ${participants.length} participants for booking id: ${id}`,
    );
    return participants;
  }

  async update(
    id: number,
    dto: UpdateParticipantDto,
  ): Promise<BookingParticipant> {
    const participant = await this.bookingParticipantsRepo.findOneBy({ id });

    if (!participant) {
      console.log(`Participant with id ${id} not found for update`);
      throw new NotFoundException(`Participant with id ${id} not found`);
    }

    const updatedParticipant = this.bookingParticipantsRepo.merge(
      participant,
      dto,
    );
    console.log('Updated participant:', updatedParticipant);

    return updatedParticipant;
  }

  async remove(id: number): Promise<void> {
    const participant = await this.bookingParticipantsRepo.findOneBy({ id });
    if (!participant) {
      console.log(`Participant with id ${id} not found for deletion`);
      throw new NotFoundException('Participant not found');
    }
    await this.bookingParticipantsRepo.remove(participant);
    console.log(`Removed participant with id ${id}`);
  }
}
