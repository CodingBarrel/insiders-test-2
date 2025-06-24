import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepo: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomsRepo.create(createRoomDto);
    const savedRoom = await this.roomsRepo.save(room);

    console.log('Created room:', savedRoom);

    return savedRoom;
  }

  async findAll(): Promise<Room[]> {
    const rooms = await this.roomsRepo.find();

    console.log(`Fetched all ${rooms.length} rooms:`);

    return rooms;
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomsRepo.findOneBy({ id });

    if (!room) {
      console.log(`Room with id ${id} not found`);
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    console.log('Fetched room:', room);

    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomsRepo.findOneBy({ id });

    if (!room) {
      console.log(`Room with id ${id} not found for update`);
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    const updatedRoom = this.roomsRepo.merge(room, updateRoomDto);
    console.log('Updated room:', updatedRoom);

    return updatedRoom;
  }

  async remove(id: number): Promise<void> {
    const room = await this.roomsRepo.findOneBy({ id });

    if (!room) {
      console.log(`Room with id ${id} not found for deletion`);
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    await this.roomsRepo.remove(room);

    console.log(`Removed room with id ${id}`);
  }
}
