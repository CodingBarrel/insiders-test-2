import {createApiResource} from "@src/api/base/api-factory";
import {Booking} from "@src/types/booking";

export const bookingApi = {
    ...createApiResource<Booking>("/booking")
}