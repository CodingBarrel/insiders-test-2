import {Booking} from "@src/types/booking";

export type Room = {
    id: number;
    name: string;
    description: string;
    bookings: Booking[];
}