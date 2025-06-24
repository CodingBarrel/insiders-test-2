import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepo: Repository<Booking>,
    private readonly roomsService: RoomsService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const room = await this.roomsService.findOne(createBookingDto.roomId);

    if (!room) {
      console.log(`Room with id ${createBookingDto.roomId} not found`);
      throw new NotFoundException('Room not found');
    }

    const conflict = await this.bookingsRepo
      .createQueryBuilder('booking')
      .where('booking.roomId = :roomId', { roomId: room.id })
      .andWhere(
        'booking.startTime < :endTime AND booking.endTime > :startTime',
        {
          startTime: createBookingDto.startTime,
          endTime: createBookingDto.endTime,
        },
      )
      .getOne();

    if (conflict) {
      console.log('Time conflict detected:', conflict);
      throw new BadRequestException('Time conflict with another booking');
    }

    const booking = this.bookingsRepo.create({
      ...createBookingDto,
      room,
    });

    const saved = await this.bookingsRepo.save(booking);
    console.log('Created booking:', saved);
    return saved;
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingsRepo.find({
      relations: ['room', 'user'],
    });
    console.log('Fetched all bookings:', bookings);
    return bookings;
  }

  async findOneById(id: number): Promise<Booking> {
    const booking = await this.bookingsRepo.findOne({
      where: { id },
      relations: ['room', 'user'],
    });

    if (!booking) {
      console.log(`Booking with id ${id} not found`);
      throw new NotFoundException('Booking not found');
    }

    console.log('Fetched booking:', booking);
    return booking;
  }

  async update(id: number, updateDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingsRepo.findOne({
      where: { id },
      relations: ['room'],
    });

    if (!booking) {
      console.log(`Booking with id ${id} not found for update`);
      throw new NotFoundException('Booking not found');
    }

    if (updateDto.startTime && updateDto.endTime) {
      const conflict = await this.bookingsRepo
        .createQueryBuilder('booking')
        .where('booking.roomId = :roomId', { roomId: booking.room.id })
        .andWhere('booking.id != :id', { id })
        .andWhere(
          'booking.startTime < :endTime AND booking.endTime > :startTime',
          {
            startTime: updateDto.startTime,
            endTime: updateDto.endTime,
          },
        )
        .getOne();

      if (conflict) {
        console.log('Time conflict during update:', conflict);
        throw new BadRequestException('Time conflict with another booking');
      }
    }

    const updated = await this.bookingsRepo.save({
      ...booking,
      ...updateDto,
    });

    console.log('Updated booking:', updated);
    return updated;
  }

  async remove(id: number): Promise<void> {
    const booking = await this.bookingsRepo.findOneBy({ id });

    if (!booking) {
      console.log(`Booking with id ${id} not found for deletion`);
      throw new NotFoundException('Booking not found');
    }

    await this.bookingsRepo.remove(booking);
    console.log(`Removed booking with id ${id}`);
  }
}
