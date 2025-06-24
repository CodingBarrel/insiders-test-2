import {createApiResource} from "@src/api/base/api-factory";
import {BookingParticipant} from "@src/types/booking-participant";
import {baseApi} from "@src/api/base/base-api";

export const bookingParticipantApi = {
    ...createApiResource<BookingParticipant>("/booking-participants"),
    getByUserId: async (userId: number): Promise<BookingParticipant[]> => {
        const res = await baseApi.get(`/users/${userId}/booking-participants`);
        return res.data;
    }
}