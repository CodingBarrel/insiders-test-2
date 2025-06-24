import {BookingParticipant} from "@src/types/booking-participant";
import {Room} from "@src/types/room";

export type Booking = {
    id: number;
    startTime: Date;
    endTime: Date;
    description: string;
    isActive: boolean;
    room: Room;
    participants: BookingParticipant[]
}