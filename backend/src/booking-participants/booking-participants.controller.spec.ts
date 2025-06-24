import { Test, TestingModule } from '@nestjs/testing';
import { BookingParticipantsController } from './booking-participants.controller';

describe('BookingParticipantsController', () => {
  let controller: BookingParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingParticipantsController],
    }).compile();

    controller = module.get<BookingParticipantsController>(
      BookingParticipantsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
