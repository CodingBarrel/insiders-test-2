import {Booking} from '@src/types/booking'
import {BookingParticipantRole} from '@src/types/booking-participant-role'
import {User} from "@src/types/user";

export type BookingParticipant = {
    id: number,
    booking: Booking,
    user: User,
    role: BookingParticipantRole,
}