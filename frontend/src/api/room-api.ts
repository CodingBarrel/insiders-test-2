import {createApiResource} from "@src/api/base/api-factory";
import {Room} from "@src/types/room";

export const roomApi = {
    ...createApiResource<Room>("/rooms")
}