import { RxDatabase } from 'rxdb';

export interface UserToken {
    uId: string,
    accessToken: string,
    displayName: string,
    email: string,
    emailVerified: boolean,
    phoneNumber?: string,
    photoURL?: string,
}

export interface AuthContextType {
    userInfo: UserToken;
    signIn: () => Promise<boolean>;
    logOut: () => void;
    setUserSchema: () => Promise<RxDatabase | null | undefined>;
}