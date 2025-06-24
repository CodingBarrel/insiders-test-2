import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingParticipantsService } from '../booking-participants/booking-participants.service';
import { BookingParticipantsRole } from '../booking-participants/entities/booking-participants-role.enum';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly bookingParticipantsService: BookingParticipantsService,
  ) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    console.log(
      `Creating booking for ${createBookingDto.roomId} by ${createBookingDto.ownerId}`,
    );
    const booking = await this.bookingsService.create(createBookingDto);
    await this.bookingParticipantsService.create({
      userId: createBookingDto.ownerId,
      bookingId: booking.id,
      role: BookingParticipantsRole.OWNER,
    });
  }

  @Get()
  findAll() {
    console.log('Fetching all bookings');
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('Fetching booking id ' + id);
    return this.bookingsService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    console.log('Updating booking id ' + id);
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('Removing booking id ' + id);
    return this.bookingsService.remove(+id);
  }
}
