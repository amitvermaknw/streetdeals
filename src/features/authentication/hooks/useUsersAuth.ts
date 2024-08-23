import { uid } from "../../../utils/Uid";
// import { updateAdminToken } from "../services/adminAuthService";
import { userAuthValidate, addUserInfo } from "../services/userAuthService";

export const useUsersAuth = () => {

    const isUserValid = async (authToken: string, email: string): Promise<boolean | { error: string }> => {
        try {
            return await userAuthValidate(authToken, email);
        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }

            return false;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addLoggedInUser = async (userDetails: any): Promise<boolean | { error: string }> => {
        try {
            const payload = {
                id: uid(),
                accessToken: userDetails.accessToken,
                displayName: userDetails.displayName,
                email: userDetails.email,
                emailVerified: userDetails.emailVerified,
                isAnonymous: userDetails.isAnonymous,
                metadata: userDetails.metadata,
                phoneNumber: userDetails.phoneNumber,
                photoURL: userDetails.photoURL,
                stsTokenManager: userDetails.stsTokenManager,
                providerId: userDetails.providerId,
                uid: userDetails.uid
            }
            return await addUserInfo(payload);

        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }
            return false;
        }
    }

    // const removeToken = async () => {
    //     await updateAdminToken();
    // }

    return [isUserValid, addLoggedInUser] as const
}
