import { Test, TestingModule } from '@nestjs/testing';
import { BookingParticipantsService } from './booking-participants.service';

describe('BookingParticipantsService', () => {
  let service: BookingParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingParticipantsService],
    }).compile();

    service = module.get<BookingParticipantsService>(
      BookingParticipantsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
