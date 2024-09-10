export interface UserToken {
    uId: string,
    accessToken: string,
    displayName: string,
    email: string,
    emailVerified: boolean,
    phoneNumber?: string,
    photoURL?: string,
}