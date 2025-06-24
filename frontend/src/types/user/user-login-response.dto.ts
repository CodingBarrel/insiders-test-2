export type UserLoginResponseDto = {
    access_token: string;
    user: {
        sub: number;
        name: string;
    }
}