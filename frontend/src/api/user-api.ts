import {baseApi} from "@src/api/base/base-api"
import {UserRegisterDto} from "@src/types/user/user-register.dto";
import {UserLoginResponseDto} from "@src/types/user/user-register-response.dto";
import {UserLoginDto} from "@src/types/user/user-login.dto";
import {UserRegisterResponseDto} from "@src/types/user/user-login-response.dto";

export const userApi = {
    register: async (user: UserRegisterDto): Promise<UserRegisterResponseDto> => {
        const res = await baseApi.post('/auth/register', user)
        return res.data;
    },

    login: async (user: UserLoginDto): Promise<UserLoginResponseDto> => {
        const res = await baseApi.post('/auth/login', user)
        return res.data;
    }
}