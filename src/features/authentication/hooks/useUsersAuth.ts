import { updateAdminToken, addAdminToken } from "../services/authService";
import { usersAuthValidate } from "../services/userAuthService";

export const useUsersAuth = () => {

    const usersAuth = async (authToken: string): Promise<boolean | { error: string }> => {
        try {
            const result = await usersAuthValidate(authToken);

            if (result) {
                await addAdminToken({
                    token: authToken,
                    status: true,
                    timestamp: new Date().toISOString()
                })
            }
            return result;
        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }

            return false;
        }
    }

    const removeToken = async () => {
        await updateAdminToken();
    }

    return [usersAuth, removeToken] as const
}
